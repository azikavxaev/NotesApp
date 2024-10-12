import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

const height = Dimensions.get('screen').height;

const AppModal = ({onPress, onRequestClose, isOpen, children, ...rest}) => {
  return (
    <Modal
      onRequestClose={onRequestClose}
      statusBarTranslucent
      transparent
      visible={isOpen}
      animationType="fade"
      {...rest}>
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  modalContainer: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
