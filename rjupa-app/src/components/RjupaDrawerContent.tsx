import React from "react";
import { View, Text, Pressable } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { theme } from "../constants/theme";

function Item({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      className={`flex-row items-center gap-3 px-4 py-3 mx-[10px] mt-[10px] rounded-card ${
        active ? "bg-sand" : "bg-transparent"
      }`}
    >
      <Feather name={icon} size={18} color={theme.colors.icon} />
      <Text
        className="text-[15px]"
        style={{
          fontSize: 15,
          fontFamily: theme.fonts.body || theme.fonts.bodyFallback,
          color: theme.colors.text,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function RjupaDrawerContent(props: DrawerContentComponentProps) {
  const { state, navigation } = props;
  const currentRoute = state.routeNames[state.index];

  return (
    <DrawerContentScrollView
      {...props}
      className="bg-bg"
      contentContainerStyle={{ flexGrow: 1, paddingTop: 0 }}
    >
      <View className="flex-1">
        {/* Header */}
        <View className="relative items-center justify-center pt-[22px] pb-[18px] border-b border-border-subtle">
          {/*  Close button */}
          <Pressable
            onPress={() => navigation.closeDrawer()}
            accessibilityRole="button"
            accessibilityLabel="Lukk meny"
            hitSlop={12}
            className="absolute left-4 top-[30px] p-2 rounded-[12px]"
            style={({ pressed }) =>
              pressed
                ? { backgroundColor: theme.colors.bg, opacity: 0.9 }
                : undefined
            }
          >
            <Feather name="x" size={24} color={theme.colors.icon} />
          </Pressable>

          <Text
            className="text-[18px]"
            style={{
              fontSize: 18,
              fontFamily: theme.fonts.heading || theme.fonts.headingFallback,
              color: theme.colors.text,
            }}
          >
            Rjúpa
          </Text>

          <Text
            className="mt-1"
            style={{
              fontFamily: theme.fonts.body || theme.fonts.bodyFallback,
              color: theme.colors.muted,
            }}
          >
            Meny
          </Text>
        </View>

        {/* Items */}
        <Item
          label="Hjem"
          icon="home"
          active={currentRoute === "(tabs)"}
          onPress={() => navigation.navigate("(tabs)")}
        />
        <Item
          label="Kjøp"
          icon="shopping-bag"
          active={currentRoute === "purchase"}
          onPress={() => navigation.navigate("purchase")}
        />
        <Item
          label="Innstillinger"
          icon="settings"
          active={currentRoute === "settings"}
          onPress={() => navigation.navigate("settings")}
        />

        {/* Footer */}
        <View className="mt-auto items-center justify-center py-4">
          <Text
            style={{
              fontFamily: theme.fonts.body || theme.fonts.bodyFallback,
              color: theme.colors.muted,
            }}
          >
            © Rjúpa
          </Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
