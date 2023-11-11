import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const imageMapping = {
    tshirt: require('./assets/tshirtIcon.png'),
    trouser: require('./assets/trouserIcon.png'),
    pullover: require('./assets/pulloverIcon.png'),
    dress: require('./assets/dressIcon.png'),
    coat: require('./assets/coatIcon.png'),
    sandal: require('./assets/sandalIcon.png'),
    shirt: require('./assets/shirtIcon.png'),
    sneaker: require('./assets/sneakerIcon.png'),
    bag: require('./assets/bagIcon.png'),
    ankeboot: require('./assets/ankleBootIcon.png'),
  };
  
const SquareButtonWithIcon = ({ onPress, imageName }) => {
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
      backgroundColor: '#F5F5DC',
      justifyContent: 'center',
      alignItems: 'center',
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

export default SquareButtonWithIcon
