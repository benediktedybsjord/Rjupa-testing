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
      className="flex-row items-center px-4 py-3 mx-[10px] mt-[10px] rounded-card"
      style={{
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: active ? theme.colors.sand : "transparent",
      }}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
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
      contentContainerStyle={{
        paddingTop: 0,
        flexGrow: 1,
        backgroundColor: theme.colors.bg, // fallback
      }}
    >
      <View
        className="items-center justify-center"
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 22,
          paddingBottom: 18,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.cardBorder,
        }}
      >
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
            marginTop: 4,
            fontFamily: theme.fonts.body || theme.fonts.bodyFallback,
            color: theme.colors.muted,
          }}
        >
          Meny
        </Text>
      </View>

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

      <View
        className="mt-auto items-center justify-center py-4"
        style={{
          marginTop: "auto",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 16,
        }}
      >
        <Text
          style={{
            fontFamily: theme.fonts.body || theme.fonts.bodyFallback,
            color: theme.colors.muted,
          }}
        >
          © Rjúpa
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}
