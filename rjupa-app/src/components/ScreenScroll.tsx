import React from "react";
import { ScrollView, RefreshControl, ScrollViewProps } from "react-native";
import { theme } from "../constants/theme";

type Props = ScrollViewProps & {
  refreshing: boolean;
  onRefresh: () => void;
};

export function ScreenScroll({ refreshing, onRefresh, children, ...rest }: Props) {
  return (
    <ScrollView
      {...rest}
      style={[{ flex: 1, backgroundColor: theme.colors.bg }, rest.style]}
      contentContainerStyle={[{ padding: 16 }, rest.contentContainerStyle]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {children}
    </ScrollView>
  );
}
