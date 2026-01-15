import React, { useCallback, useState } from "react";
import { View, Text, Image } from "react-native";
import { theme } from "../../src/constants/theme";
import { ScreenScroll } from "../../src/components/ScreenScroll";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // TODO (G1):
      // - Re-read latest analyses from SQLite / AsyncStorage
      // - Recalculate derived metrics if needed
      // - Update "last updated" state
      await new Promise((resolve) => setTimeout(resolve, 400));
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <ScreenScroll refreshing={refreshing} onRefresh={onRefresh}>
      {/* NativeWind layout + Style */}
      <View
        style={{
          borderWidth: 1,
          borderColor: theme.colors.cardBorder,
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: theme.colors.bg,
        }}
      >
        {/* Logo / hero */}
        <View
          style={{
            height: 180,
            backgroundColor: theme.colors.sand,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
          }}
        >
          <Image
            source={require("../../src/assets/logo/Rjupa-Testing.png")}
            style={{
              width: 300,
              height: 100,
              resizeMode: "contain",
            }}
            accessibilityRole="image"
            accessibilityLabel="Rjupa-testing logo"
          />
        </View>

        {/* Subtle divider */}
        <View
          style={{
            height: 1,
            backgroundColor: theme.colors.cardBorder,
          }}
        />

        {/* Content */}
        <View style={{ paddingHorizontal: 14, paddingVertical: 12 }}>
          {/* Title */}
          <Text
            style={{
              fontFamily: theme.fonts.heading || theme.fonts.headingFallback,
              fontSize: 18,
              color: theme.colors.text,
            }}
          >
            Rjúpa-testing
          </Text>

          {/* Subtitle */}
          <Text
            style={{
              marginTop: 4,
              fontFamily: theme.fonts.body || theme.fonts.bodyFallback,
              color: theme.colors.muted,
            }}
          >
            Presis analyse av skuddbilder for hagleskyttere
          </Text>

          {/* Tag / chip */}
          <View
            style={{
              alignSelf: "flex-start",
              marginTop: 10,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: theme.colors.cardBorder,
              backgroundColor: theme.colors.bg,
            }}
          >
            <Text
              style={{
                fontFamily: theme.fonts.body || theme.fonts.bodyFallback,
                color: theme.colors.muted,
                fontSize: 12,
              }}
            >
              Offline • Lokal analyse • G1
            </Text>
          </View>

          {/* Body / welcome text */}
          <Text
            style={{
              marginTop: 10,
              fontFamily: theme.fonts.body || theme.fonts.bodyFallback,
              color: theme.colors.muted,
              lineHeight: 20,
            }}
          >
            Velkommen til Rjúpa-Testing. Her kan du ta bilde av skuddbilder, analysere
            fordeling og få innsikt som hjelper deg å forbedre presisjon og
            utstyrstilpasning.
          </Text>

          {/* Optional CTA row (UI only) */}
          <View
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTopWidth: 1,
              borderTopColor: theme.colors.cardBorder,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: theme.fonts.body || theme.fonts.bodyFallback,
                color: theme.colors.muted,
                fontSize: 13,
              }}
            >
              Klar for ny analyse?
            </Text>

            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
                backgroundColor: theme.colors.sand,
              }}
            >
              <Text
                style={{
                  fontFamily: theme.fonts.body || theme.fonts.bodyFallback,
                  color: theme.colors.text,
                  fontSize: 13,
                }}
              >
                Ny analyse
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScreenScroll>
  );
}
