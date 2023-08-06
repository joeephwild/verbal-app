import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { PlusCircleIcon } from "react-native-heroicons/solid";
import React, { useState, useMemo, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Portal, PortalHost } from "@gorhom/portal";

const BottomSheets = () => {
  const bottomSheetModalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }
  const snapPoints = ["25%", "48%", "75%"];

  return (
    <>
      <TouchableNativeFeedback onPress={handlePresentModal}>
        <PlusCircleIcon size={45} color="#FF7700" />
      </TouchableNativeFeedback>
      <Portal>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 50 }}
            onDismiss={() => setIsOpen(false)}
          ></BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
      <PortalHost name="custom_host" /> 
    </>
  );
};

export default BottomSheets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 50,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: "500",
  },
});
