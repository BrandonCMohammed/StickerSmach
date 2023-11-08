import {StyleSheet, Image} from 'react-native';

export default function ImageViewr({placeHolderImageSource, selectedImage})
{
    const imageSource = selectedImage ? {uri: selectedImage} : placeHolderImageSource;
    return(
        <Image source={imageSource} style={styles.image} />
    );
}

const styles=StyleSheet.create(
    {
        image: 
        {
            width: 320,
            height: 400,
            borderRadius: 18,
        }
    }
)