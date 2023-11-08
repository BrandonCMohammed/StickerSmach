import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {useState} from 'react';

import ImageViewr from './components/ImageViewr';
import Button from './components/Button';
import CircleBUtton from './components/CircleButton';
import IconButton from './components/IconButton';

import * as ImagePicker from 'expo-image-picker';

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);


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
  const onAddSticker = () => {};
  const onSaveImageAsync = () => {};

  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      <ImageViewr 
        placeHolderImageSource={PlaceholderImage} 
        selectedImage={selectedImage}
      />
    </View>

    {showAppOptions ? (
      <View>
        <View>
        </View>
        <IconButton icon="refresh" label="Reset" onPress={onReset}/>
        <CircleBUtton onPress={onAddSticker}/>
        <IconButton icon="save-atl" label="Save" onPress={onSaveImageAsync}/>
      </View>


      ) : (
        <View style={styles.footerContainer}>
          <Button label="Choose a photo" theme="primary" onPress={pickImageAsync}/>
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
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
  }
});
