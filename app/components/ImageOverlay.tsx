import React from "react";
import { Modal, StyleSheet, View, Pressable, Dimensions } from "react-native";
import { ZoomableImage } from "./ZoomableImage";
import { Ionicons } from "@expo/vector-icons";

interface ImageOverlayProps {
  isVisible: boolean;
  imageUrl: string;
  onClose: () => void;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;

export const ImageOverlay: React.FC<ImageOverlayProps> = ({
  isVisible,
  imageUrl,
  onClose,
}) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color="white" />
        </Pressable>
        <ZoomableImage url={imageUrl} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 0,
    zIndex: 1,
    padding: 0,
  },
});
