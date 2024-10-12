import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import HomeFolder from '../components/HomeFolder';
import AddButton from '../components/AddButton';
import {storage} from '../../index';
import AppModal from '../components/AppModal';

let userObject;
const NotesScreen = ({navigation}) => {
  useMemo(() => {
    if (storage.getAllKeys().includes('folders')) {
      userObject = JSON.parse(storage.getString('folders'));
    } else {
      userObject = {folder1: ''};
    }
  }, []);

  const [folderNames, setFolderNames] = useState(userObject);
  const [isOpen, setIsOpen] = useState(false);
  const [newFolderInput, setNewFolderInput] = useState('');

  useEffect(() => {
    storage.set('folders', JSON.stringify(folderNames));
  }, [folderNames]);

  const handleDeleteFolder = key => {
    delete folderNames[key];
    setFolderNames({...folderNames});
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={Object.keys(folderNames)}
        renderItem={({item, index}) => {
          return (
            <HomeFolder
              onPress={() => {
                navigation.navigate('NoteFolder', {folder: folderNames[item]});
              }}
              onDelete={() => {
                handleDeleteFolder(item);
              }}
              folderName={folderNames[item]}
              onChangeText={text => {
                setFolderNames(() => {
                  folderNames[item] = text;
                  return {...folderNames};
                });
              }}
            />
          );
        }}
      />

      {/*Object.keys(userObject).map((key, index) => {
        return (
          <HomeFolder
            key={Object.keys(userObject)[index]}
            folderName={userObject[key]}
            onChangeText={text => {
              setFolderNames(() => {
                userObject[key] = text;
                return {...userObject};
              });
            }}
          />
        );
      })*/}
      <AddButton
        onPress={() => {
          /* setFolderNames(state => {
            return {
              ...state,
              [`folder${Object.keys(userObject).length + 1}`]: '',
            };
          }); */
          setIsOpen(true);
        }}
        buttonStyle={styles.addButtonStyle}
      />
      <AppModal
        onPress={() => {
          setNewFolderInput('');
          setIsOpen(false);
        }}
        onRequestClose={() => {
          setNewFolderInput('');
          setIsOpen(false);
        }}
        isOpen={isOpen}>
        <View style={styles.modalCardStyle}>
          <View style={{paddingHorizontal: 10}}>
            <TextInput
              value={newFolderInput}
              onChangeText={setNewFolderInput}
              style={styles.input}
              placeholder="Type Folder Name"
            />
          </View>
          <Pressable
            onPress={() => {
              setFolderNames(state => {
                console.log(state);
                return {
                  ...state,
                  [`folder${
                    parseInt(Object.keys(folderNames)?.slice(-1)[0]?.slice(6)) +
                      1 || 1
                  }`]: newFolderInput,
                };
              });
              setIsOpen(false);
              setNewFolderInput('');
            }}
            style={({pressed}) => {
              return pressed
                ? [styles.buttonContainer, styles.pressed]
                : styles.buttonContainer;
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Add</Text>
          </Pressable>
        </View>
      </AppModal>
    </View>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  modalCardStyle: {
    width: '80%',
    height: '30%',
    borderRadius: 20,
    elevation: 5,
    backgroundColor: '#aaa',
    justifyContent: 'center',
  },
  addButtonStyle: {
    flex: 1,
    zIndex: 1,
    position: 'absolute',
    right: '8%',
    bottom: '15%',
  },
  input: {
    borderColor: '#8b8b8bff',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    height: '15%',
    backgroundColor: '#6464649c',
    borderRadius: 15,
    marginTop: 55,
  },
  pressed: {opacity: 0.9},
});
