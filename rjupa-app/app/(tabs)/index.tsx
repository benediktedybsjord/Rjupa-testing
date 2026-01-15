import React, { useCallback, useMemo, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { ScreenScroll } from "../../src/components/ScreenScroll";

const LOGO = require("../../src/assets/logo/Rjupa-Testing.png");

function StatusChip({ text }: { text: string }) {
  return (
    <View className="self-start rounded-full border border-card-border bg-bg px-2.5 py-1.5">
      <Text className="font-body text-xs text-muted">{text}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      // TODO: Replace with real refresh logic (e.g. read from local store: available analyses, history).
      await new Promise((resolve) => setTimeout(resolve, 400));
    } finally {
      setRefreshing(false);
    }
  }, [refreshing]);

  // TODO: Connect “available analyses” from local storage later.
  const availableAnalyses = useMemo(() => 0, []);
  const canStartNewAnalysis = availableAnalyses > 0;

  const handleNewAnalysis = useCallback(() => {
    // Adjust route to match the actual flow (metadata → camera).
    router.push("/create");
  }, []);

  const handlePurchase = useCallback(() => {
    router.push("/purchase");
  }, []);

  return (
    <ScreenScroll refreshing={refreshing} onRefresh={onRefresh}>
      <View
        className="overflow-hidden rounded-card border border-card-border bg-bg"
        accessibilityRole="summary"
        accessibilityLabel="Hjem"
      >
        {/* Logo / hero */}
        <View className="h-[180px] items-center justify-center bg-sand px-4">
          <Image
            source={LOGO}
            className="h-[75px] w-[130px]"
            resizeMode="contain"
            accessibilityRole="image"
            accessibilityLabel="Rjúpa-testing logo"
          />
        </View>

        {/* Divider */}
        <View className="h-px bg-card-border" />

        {/* Content */}
        <View className="px-[14px] py-3">
          <Text className="font-heading text-[18px] text-text">
            Rjúpa-testing
          </Text>

          <Text className="mt-1 font-body text-muted">
            Presis analyse av skuddbilder for hagleskyttere
          </Text>

          <View className="mt-2.5 flex-row flex-wrap gap-2">
            <StatusChip text="Offline" />
            <StatusChip text="Lokal analyse" />
            <StatusChip text="G1" />
          </View>

          <Text className="mt-2.5 font-body leading-5 text-muted">
            Ta bilde av skiva, la appen telle haglhull og beregne nøkkeltall
            (trangboring, kjerne og fordeling). Resultatene lagres lokalt og kan
            sammenlignes i historikken.
          </Text>

          {/* Availability */}
          <View className="mt-3 rounded-card border border-card-border bg-sand px-3 py-2">
            <Text className="font-body text-[13px] text-text">
              Tilgjengelige analyser:{" "}
              <Text className="font-heading text-[13px] text-text">
                {availableAnalyses}
              </Text>
            </Text>
            <Text className="mt-0.5 font-body text-[12px] text-muted">
              {canStartNewAnalysis
                ? "Du kan starte en ny analyse nå."
                : "Kjøp analyser for å starte ny test."}
            </Text>
          </View>

          {/* Actions */}
          <View className="mt-3.5 flex-row items-center justify-between border-t border-card-border pt-3">
            <Text className="font-body text-[13px] text-muted">
              Klar for ny analyse?
            </Text>

            <View className="flex-row gap-2">
              {!canStartNewAnalysis && (
                <Pressable
                  onPress={handlePurchase}
                  className="rounded-card border border-card-border bg-bg px-3 py-2"
                  accessibilityRole="button"
                  accessibilityLabel="Kjøp analyser"
                  hitSlop={10}
                >
                  <Text className="font-body text-[13px] text-text">Kjøp</Text>
                </Pressable>
              )}

              <Pressable
                onPress={handleNewAnalysis}
                disabled={!canStartNewAnalysis}
                className={[
                  "rounded-card px-3 py-2",
                  canStartNewAnalysis ? "bg-sand" : "bg-card-border",
                ].join(" ")}
                accessibilityRole="button"
                accessibilityLabel="Ny analyse"
                accessibilityHint={
                  canStartNewAnalysis
                    ? "Starter en ny analyse"
                    : "Kjøp analyser for å starte"
                }
                accessibilityState={{ disabled: !canStartNewAnalysis }}
                hitSlop={10}
              >
                <Text
                  className={[
                    "font-body text-[13px]",
                    canStartNewAnalysis ? "text-text" : "text-muted",
                  ].join(" ")}
                >
                  Ny analyse
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScreenScroll>
  );
}
