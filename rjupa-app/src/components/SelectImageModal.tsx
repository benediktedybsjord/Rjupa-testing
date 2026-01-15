import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Platform,
  Modal,
  StatusBar,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

// Later on we should use react-native-vision-camera instead of expo!
// react-native-vision-camera (best in RN — true camera control, tap-to-focus, FPS control, etc.).
// But it requires a dev build + native configuration (not Expo Go), and a bit more setup.

type Props = {
  visible: boolean;
  onClose: () => void;
  onImageSelected: (uri: string) => void;
};

type FocusPoint = { x: number; y: number } | null;

export default function SelectImageModal({
  visible,
  onClose,
  onImageSelected,
}: Props) {
  const cameraRef = useRef<CameraView | null>(null);

  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [focusPoint, setFocusPoint] = useState<FocusPoint>(null);

  // Request permission when modal opens
  useEffect(() => {
    if (!visible) return;
    if (!permission) return;
    if (permission.status === "undetermined" && permission.canAskAgain) {
      requestPermission();
    }
  }, [visible, permission, requestPermission]);

  useEffect(() => {
    if (!focusPoint) return;
    const t = setTimeout(() => setFocusPoint(null), 900);
    return () => clearTimeout(t);
  }, [focusPoint]);

  const pickImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) onImageSelected(result.assets[0].uri);
  };

  const takePhoto = async () => {
    if (isTakingPhoto) return;

    try {
      setIsTakingPhoto(true);

      if (!cameraRef.current) {
        Alert.alert("Camera error", "Camera is not ready yet.");
        return;
      }

      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        skipProcessing: false,
      });

      if (photo?.uri) onImageSelected(photo.uri);
    } catch {
      Alert.alert("Error", "Could not take photo. Please try again.");
    } finally {
      setIsTakingPhoto(false);
    }
  };

  const bottomPad = 50; 

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      statusBarTranslucent
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        {!permission ? (
          <View className="flex-1 items-center justify-center bg-black">
            <ActivityIndicator />
            <Text className="mt-3 text-white/80">Laster kamera…</Text>
          </View>
        ) : !permission.granted ? (
          <View className="flex-1 items-center justify-center bg-black px-6">
            <Text className="text-center text-white text-lg font-semibold">
              Kamera-tilgang kreves
            </Text>
            <Text className="mt-2 text-center text-white/70">
              Gi tilgang for å kunne ta bilde.
            </Text>

            <View className="mt-5 w-full flex-row gap-3">
              <TouchableOpacity
                onPress={requestPermission}
                className="flex-1 items-center justify-center rounded-[14px] bg-sand/90 py-3"
              >
                <Text className="font-bold text-text">Gi tilgang</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClose}
                className="flex-1 items-center justify-center rounded-[14px] border border-white/20 bg-black/30 py-3"
              >
                <Text className="font-bold text-white">Lukk</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            {/* Tap overlay over preview */}
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={(e) => {
                const { locationX, locationY } = e.nativeEvent;
                setFocusPoint({ x: locationX, y: locationY });
                // expo-camera in Expo Go doesn't expose a public focus API — UI indicator only
              }}
            >
              <CameraView
                ref={cameraRef}
                facing="back"
                active={visible}
                enableTorch={torchOn}
                autofocus={Platform.OS === "ios" ? "on" : undefined}
                style={StyleSheet.absoluteFillObject}
              />
            </Pressable>

            {/* Contrast overlay */}
            <View
              style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: "rgba(0,0,0,0.10)" },
              ]}
            />

            {/* Focus ring */}
            {focusPoint && (
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  left: focusPoint.x - 28,
                  top: focusPoint.y - 28,
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  borderWidth: 2,
                  borderColor: "rgba(255,255,255,0.85)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    top: 60,
                    left: -18,
                    width: 92,
                    textAlign: "center",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  Fokuserer…
                </Text>
              </View>
            )}

            {/* Flashlight */}
            <View className="absolute right-4 top-12">
              <TouchableOpacity
                onPress={() => setTorchOn((v) => !v)}
                accessibilityRole="button"
                accessibilityLabel={
                  torchOn ? "Skru av lommelykt" : "Skru på lommelykt"
                }
                className="h-11 w-11 items-center justify-center rounded-full bg-black/45"
              >
                <Feather
                  name={torchOn ? "zap" : "zap-off"}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            {/* Bottom actions — flush to bottom */}
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                className="w-full flex-row gap-2.5 px-4"
                style={{ paddingBottom: bottomPad, paddingTop: 12 }}
              >
                <TouchableOpacity
                  onPress={pickImageFromLibrary}
                  className="flex-1 items-center justify-center rounded-[14px] border border-card-border bg-sand/90 py-3 shadow-lg active:opacity-80"
                >
                  <Text className="text-[15px] font-medium tracking-[0.2px] text-text">
                    Velg
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={takePhoto}
                  disabled={isTakingPhoto}
                  className={`flex-1 items-center justify-center rounded-[14px] border border-card-border bg-sand/90 py-3 shadow-lg active:opacity-80 ${
                    isTakingPhoto ? "opacity-60" : ""
                  }`}
                >
                  <Text className="text-[15px] font-medium tracking-[0.2px] text-text">
                    {isTakingPhoto ? "..." : "Ta bilde"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onClose}
                  className="flex-1 items-center justify-center rounded-[14px] border border-card-border bg-sand/90 py-3 shadow-lg active:opacity-80"
                >
                  <Text className="text-[15px] font-medium tracking-[0.2px] text-text">
                    Avbryt
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "black",
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
});
