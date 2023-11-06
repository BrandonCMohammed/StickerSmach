import {StyleSheet, Image} from 'react-native';

export default function ImageViewr({placeHolderImageSource})
{
    return(
        <Image source={placeHolderImageSource} style={styles.image} />
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