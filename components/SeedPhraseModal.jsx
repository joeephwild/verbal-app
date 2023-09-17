import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Modal } from "react-native";

const SeedPhraseModal = ({ closeModal, isAuthenticated, seedPhrase }) => {
  console.log(seedPhrase)
  return (
    <Modal
      visible={isAuthenticated}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal} // This allows the user to close the modal by pressing the back button
    >
      <View style={styles.modalContainer}>
        {/* Blur Background */}
        <View style={styles.blurBackground}>
          {/* Your modal content */}
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seed Phrase</Text>
            <View style={styles.seedPhraseContainer}>
              {seedPhrase.map((item, index) => (
                <Text key={index} style={styles.seedPhraseItem}>
                  {item}
                </Text>
              ))}
            </View>
            {/* Close button */}
            <Pressable onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // ... (your existing styles)
  closeButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  blurBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    width: 342,
    padding: 24,
    backgroundColor: "#13161B",
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  seedPhraseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  seedPhraseItem: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  currentTime: {
    marginTop: 16,
    color: "#fff",
    fontSize: 16,
  },
});

export default SeedPhraseModal;
