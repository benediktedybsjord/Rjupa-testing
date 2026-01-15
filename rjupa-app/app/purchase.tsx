import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useAnalysis } from "../src/context/AnalysisContext";

export default function Purchases() {
  // midlertidig: henter analyser fra context (samme saldo i hele appen)
  const { analysisBalance, addAnalyses } = useAnalysis();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Kjøp analyser</Text>

      {/* Balance */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Tilgjengelige analyser</Text>
        <Text style={styles.balanceValue}>{analysisBalance}</Text>
      </View>

      {/* Explanation */}
      <Text style={styles.explanation}>
        Én analyse trekkes først etter at en test er fullført og godkjent.
        Visning av tidligere analyser er alltid gratis.
      </Text>

      {/* Packs */}
      <View style={styles.packsContainer}>
        <View style={styles.packCard}>
          <View style={styles.packLeft}>
            <Text style={styles.packTitle}>10 analyser</Text>
            <Text style={styles.packMeta}>199 kr</Text>
            <Text style={styles.packMetaSmall}>≈ 19,9 kr per analyse</Text>
          </View>

          <Pressable
            style={styles.buyButton}
            onPress={() => addAnalyses(10)} // TEMP: local only (no real payment yet)
          >
            <Text style={styles.buyButtonText}>Kjøp</Text>
          </Pressable>
        </View>

        <View style={styles.packCard}>
          <View style={styles.packLeft}>
            <Text style={styles.packTitle}>20 analyser</Text>
            <Text style={styles.packMeta}>349 kr</Text>
            <Text style={styles.packMetaSmall}>≈ 17,5 kr per analyse</Text>
          </View>

          <Pressable
            style={styles.buyButton}
            onPress={() => addAnalyses(20)} // TEMP: local only (no real payment yet)
          >
            <Text style={styles.buyButtonText}>Kjøp</Text>
          </Pressable>
        </View>

        <View style={styles.packCard}>
          <View style={styles.packLeft}>
            <Text style={styles.packTitle}>50 analyser</Text>
            <Text style={styles.packMeta}>749 kr</Text>
            <Text style={styles.packMetaSmall}>≈ 15,0 kr per analyse</Text>
          </View>

          <Pressable
            style={styles.buyButton}
            onPress={() => addAnalyses(50)} // TEMP: local only (no real payment yet)
          >
            <Text style={styles.buyButtonText}>Kjøp</Text>
          </Pressable>
        </View>
      </View>

      {/* Footer note */}
      <Text style={styles.footerNote}>
        {/* midlertidig melding */}
        Kun demovisning. Betaling og backend-integrasjon legges til senere.
      </Text>
    </ScrollView>
  );
}

//***STYLING ENDRES SENERE***//
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 14,
  },

  balanceCard: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  balanceLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 6,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: "800",
  },

  explanation: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 18,
  },

  packsContainer: {
    gap: 12,
  },
  packCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
  },
  packLeft: {
    flex: 1,
    paddingRight: 12,
    gap: 4,
  },
  packTitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  packMeta: {
    fontSize: 16,
    fontWeight: "700",
  },
  packMetaSmall: {
    fontSize: 12,
    opacity: 0.65,
  },

  buyButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#000",
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "800",
  },

  footerNote: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 12,
    opacity: 0.55,
  },
});
