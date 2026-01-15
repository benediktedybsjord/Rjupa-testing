import React from "react";
import { View, Pressable, Platform, StatusBar, Image } from "react-native";
import type { DrawerHeaderProps } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../constants/theme";

export default function RjupaHeader({ navigation }: DrawerHeaderProps) {
  const insets = useSafeAreaInsets();
  const androidTop =
    Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0;
  const topPad = Math.max(insets.top, androidTop);

  return (
    <View
      style={{
        paddingTop: topPad,
        backgroundColor: theme.colors.sand,
        paddingHorizontal: 16,
        minHeight: 56,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.cardBorder,
      }}
    >
      {/* Logo */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: -45, 
        }}
      >
        <Image
          source={require("../assets/logo/Rjupa-Testing.png")}
          style={{
            width: 140,
            height: 40,
            resizeMode: "contain",
          }}
          accessibilityRole="image"
          accessibilityLabel="Rjúpa logo"
        />
      </View>

      {/* Menu button */}
      <Pressable
        onPress={() => navigation.toggleDrawer()}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Åpne meny"
        style={({ pressed }) => [
          { padding: 8, borderRadius: 12 },
          pressed && {
            backgroundColor: theme.colors.bg,
            opacity: 0.9,
          },
        ]}
      >
        <Feather name="menu" size={22} color={theme.colors.icon} />
      </Pressable>
    </View>
  );
}
