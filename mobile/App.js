import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function App() {
  const [ip, setip] = useState("10.0.2.2")
  const [image, setImage] = useState(null);



  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async (imageUri) => {
    const url = 'http://192.168.0.11:5000/upload';
    const imageUriParts = imageUri.split('.');
    const fileType = imageUriParts[imageUriParts.length - 1];
  
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: `image.${fileType}`,
      type: `image/${fileType}`,
    });
  
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        console.log(response.data);
        // Traitez la réponse ici
      } else {
        console.log('Erreur lors de l envoi de l image');
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const pickImageFromCameraRoll = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to MaGardeRobe</Text>
      <TextInput
        onChangeText={setip}
        value={ip}
      />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Take a picture" onPress={pickImage} />
      <Button title="Pick an image from camera roll" onPress={pickImageFromCameraRoll} />
      <Button title="Send picture" onPress={ () =>uploadImage(image)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
