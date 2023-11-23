import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import {useState, useRef} from 'react';
import {GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import {captureRef} from 'react-native-view-shot';
import domtoimage from 'dom-to-image';

import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import CircleBUtton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';

import * as ImagePicker from 'expo-image-picker';
import EmojiSticker from './components/EmojiSticker';

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [status, requestPremission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  if(status === null)
  {
    requestPremission();
  }


  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(
      {
        allowsEditing: true,
        quality:1,
      }
    )
    if(!result.canceled)
    {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true);
    }else
    {
      alert('You did not select any image.')
    }

  }

  const onReset = () => {};
  const onAddSticker = () => {setIsModalVisible(true)};
  const onSaveImageAsync = async () => 
  {
    if(Platform.OS === 'web')
    {
      try
      {
        const localUri = await captureRef(imageRef, {height:440, quality: 1});
  
        await MediaLibrary.saveToLibraryAsync(localUri);
        if(localUri)
        {
          alert("Saved");
        }
      }
      catch(e)
      {
        console.log(e);
      }
    }
    else
    {
      try
      {
        const dataUri = await domtoimage.toJpeg(imageRef.current, {quality: 0.25, width: 320, height: 440});

        let link = document.createElement('a');
        link.download = 'sticker-smach.jpeg';
        link.href = dataUri;
        link.click
      }
      catch (e)
      {
        console.log(e)
      }
    }

  };

  const onModalClose = () => {setIsModalVisible(false)};

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer 
            placeHolderImageSource={PlaceholderImage} 
            selectedImage={selectedImage}
          />
          {pickedEmoji !== null? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
        </View>
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset}/>
            <CircleBUtton onPress={onAddSticker}/>
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
          </View>
        </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button label="Choose a photo" theme="primary" onPress={pickImageAsync}/>
            <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
          </View>
        )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>  

      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: 
  {
    flex : 1,
    paddingTop: 50,
  },
  footerContainer:
  {
    flex:1/3,
    alignItems:'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
