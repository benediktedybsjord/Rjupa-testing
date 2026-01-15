import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

type Props = {
  onClose: () => void;
  onImageSelected: (uri: string) => void;
};

export default function SelectImageModal({ onClose, onImageSelected }: Props) {
  const cameraRef = useRef<CameraView | null>(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);

  const pickImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
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
        skipProcessing: true,
      });

      if (photo?.uri) {
        onImageSelected(photo.uri);
      }
    } catch {
      Alert.alert("Error", "Could not take photo. Please try again.");
    } finally {
      setIsTakingPhoto(false);
    }
  };

  return (
    <View className="flex-1">
      <CameraView ref={cameraRef} className="flex-1" facing="back" />

      <View className="absolute bottom-16 flex-row w-full px-4 gap-[10px]">
        <TouchableOpacity
          className="flex-1 items-center py-3 rounded-card"
          style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
          onPress={pickImageFromLibrary}
        >
          <Text className="text-[16px] font-bold">Choose</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 items-center py-3 rounded-card"
          style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
          onPress={takePhoto}
        >
          <Text className="text-[16px] font-bold">
            {isTakingPhoto ? "..." : "Take Picture"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 items-center py-3 rounded-card"
          style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
          onPress={onClose}
        >
          <Text className="text-[16px] font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
