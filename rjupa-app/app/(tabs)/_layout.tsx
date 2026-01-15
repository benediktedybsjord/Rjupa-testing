import React from "react";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../src/constants/theme";

function TabIcon({
  children,
  focused,
}: {
  children: React.ReactNode;
  focused: boolean;
}) {
  return (
    <View
      className="items-center justify-center"
      style={
        focused
          ? {
              // iOS shadow
              shadowColor: "#000",
              shadowOpacity: 0.18,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              // Android shadow
              elevation: 4,
              // Subtle scale
              transform: [{ scale: 1.06 }],
            }
          : undefined
      }
    >
      {children}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarBackground: () => (
          <View className="flex-1 bg-sand border-t border-border-subtle" />
        ),

        tabBarStyle: {
          height: 64,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 0,
          backgroundColor: "transparent",
        },

        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.muted,

        tabBarLabel: ({ children, color }) => (
          <Text
            className="text-[12px]"
            style={{
              color,
              fontFamily: theme.fonts.body || theme.fonts.bodyFallback,
            }}
          >
            {children}
          </Text>
        ),

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
            <TabIcon focused={focused}>
              <Feather
                name="home"
                size={size}
                color={focused ? theme.colors.text : color}
              />
            </TabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused}>
              <Feather
                name="plus-circle"
                size={size + 4}
                color={focused ? theme.colors.text : color}
              />
            </TabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon focused={focused}>
              <Feather
                name="user"
                size={size}
                color={focused ? theme.colors.text : color}
              />
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}
