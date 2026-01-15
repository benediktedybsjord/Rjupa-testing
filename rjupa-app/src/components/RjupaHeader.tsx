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
      className="bg-sand px-4 py-[10px] min-h-[56px] flex-row items-center justify-between border-b border-border-subtle"
      style={{ paddingTop: topPad }}
    >
      {/* Logo */}
      <View className="flex-row items-center ml-[-45px]">
        <Image
          source={require("../assets/logo/Rjupa-Testing.png")}
          className="w-[140px] h-[40px]"
          style={{ resizeMode: "contain" }}
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
        className="p-2 rounded-[12px]"
        style={({ pressed }) =>
          pressed
            ? {
                shadowColor: "#000",
                shadowOpacity: 0.18,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: 4,
                transform: [{ scale: 1.06 }],

                backgroundColor: theme.colors.bg,
                opacity: 0.95,
              }
            : undefined
        }
      >
        <Feather name="menu" size={22} color={theme.colors.icon} />
      </Pressable>
    </View>
  );
}
