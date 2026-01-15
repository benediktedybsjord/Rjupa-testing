import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../src/constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.sand,
          borderTopColor: theme.colors.cardBorder,
          borderTopWidth: 1,
          height: 64,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.muted,

        tabBarLabelStyle: {
          fontFamily: theme.fonts.body || theme.fonts.bodyFallback,
          fontSize: 12,
        },

        tabBarItemStyle: {
          borderRadius: 14,
          marginHorizontal: 6,
        },

        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="home"
              size={size}
              color={focused ? theme.colors.text : color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="plus-circle"
              size={size + 4}
              color={focused ? theme.colors.text : color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="user"
              size={size}
              color={focused ? theme.colors.text : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
