import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const imageMapping = {
    camera: require('./assets/cameraIcon.png'),
    gallerie: require('./assets/gallerieIcon.png'),
  };
  
const ImageSquareButton = ({ onPress, imageName }) => {
    const imagePath = imageMapping[imageName];
    return (
      <TouchableOpacity onPress={onPress} style={ButtonStyles.buttonContainer}>
        <View style={ButtonStyles.iconContainer}>
          <Image source={imagePath} style={ButtonStyles.image} />
        </View>
      </TouchableOpacity>
    );
  };
  
  const ButtonStyles = StyleSheet.create({
    buttonContainer: {
      width: 150,
      height: 150,
      borderRadius: 15,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 2,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 70,
      height: 70,
      resizeMode: 'contain',
    },
  });

export default ImageSquareButton
