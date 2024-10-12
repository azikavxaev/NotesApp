import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import AddButton from '../components/AddButton';
import AppModal from '../components/AppModal';

const NoteFolderScreen = ({route}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const folderName = route.params.folder;
  return (
    <View style={{flex: 1}}>
      <AddButton
        buttonStyle={styles.addButtonStyle}
        onPress={() => {
          setIsOpen(true);
        }}
      />
      <AppModal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}>
        <View
          style={{
            justifyContent: 'flex-start',
            paddingTop: StatusBar.currentHeight,
            height: '100%',
            width: '100%',
            backgroundColor: '#8393826d',
          }}>
          <TextInput
            placeholder="Title"
            onChangeText={setTitle}
            style={{flex: 1, fontSize: 30, fontWeight: 'bold', marginTop: 20}}
          />
          <TextInput
            style={{
              flex: 20,
              paddingtop: 5,
              borderColor: 'black',
              borderWidth: 1,
              textAlignVertical: 'top',
              fontSize: 20,
            }}
            onChangeText={setNote}
            multiline={true}
            placeholder="Note"
          />
        </View>
      </AppModal>
    </View>
  );
};

export default NoteFolderScreen;

const styles = StyleSheet.create({
  addButtonStyle: {
    flex: 1,
    zIndex: 1,
    position: 'absolute',
    right: '8%',
    bottom: '15%',
  },
});
