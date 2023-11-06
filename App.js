import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import ImageViewr from './components/ImageViewr';
import Button from './components/Button';

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      <ImageViewr placeHolderImageSource={PlaceholderImage} />
    </View>
    <View style={styles.footerContainer}>
      <Button label="Choose a photo" theme="primary"/>
      <Button label="Use this photo" />
    </View>
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
