import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { initDatabase, insertImage, deleteAllImages } from './Database';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import SquareButtonWithIcon from './SquareButton';
import ImageSquareButton  from './ImageSquareButton';
export default function Home() {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    initDatabase();
  }, []);

  useEffect(() => {
    if (image != null) {
      uploadImage()
    }
  }, [image]);


  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    imageUri = image
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
        insertImage(imageUri, response.data.tag)
      } else {
        console.log('Erreur lors de l envoi de l image');
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const pickImageFromCameraRoll = async () => {
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
    <View style={styles.scrollcontainer}>
       <ScrollView styles={styles.scrollViewContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Bienvenue dans MaGardeRobe</Text>
            <Text style={styles.text}>Ajouter</Text>
            <View style={styles.row}>
              <ImageSquareButton onPress={pickImage} imageName={"camera"}/>
              <ImageSquareButton onPress={pickImageFromCameraRoll} imageName={"gallerie"}/>
            </View>
            <Text style={styles.text}>Consulter</Text>
            <View style={styles.row}>
              <SquareButtonWithIcon onPress={() => navigation.navigate("Image", { category:0 })} imageName={"tshirt"}/>
              <SquareButtonWithIcon onPress={() => navigation.navigate("Image", { category:1 })} imageName={"trouser"}/>
            </View>
            <View style={styles.row}>
              <SquareButtonWithIcon onPress={() => navigation.navigate("Image", { category:2 })} imageName={"pullover"}/>
              <SquareButtonWithIcon onPress={() => navigation.navigate("Image", { category:3 })} imageName={"dress"}/>
            </View>
            <View style={styles.row}>
              <SquareButtonWithIcon onPress={() => navigation.navigate("Image", { category:4 })} imageName={"coat"}/>
              <SquareButtonWithIcon onPress={() => navigation.navigate("Image", { category:5 })} imageName={"sandal"}/>
            </View>
            <View style={styles.row}>
              <SquareButtonWithIcon onPress={() => navigation.navigate("Image", { category:6 })} imageName={"shirt"}/>
              <SquareButtonWithIcon onPress={() => navigation.navigate("Image", { category:7 })} imageName={"sneaker"}/>
            </View>
            <View style={styles.row}>
              <SquareButtonWithIcon onPress={() => navigation.navigate("Image", { category:8 })} imageName={"bag"}/>
              <SquareButtonWithIcon onPress={() => navigation.navigate("Image", { category:9 })} imageName={"ankeboot"}/>
            </View>
            <TouchableOpacity onPress={deleteAllImages} style={styles.buttonContainer}>
              <View style={styles.iconContainer}>
                <Text style={{fontWeight: 'bold'}}>Supprimer toutes les images</Text>
              </View>
            </TouchableOpacity>
            {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title="Take a picture" onPress={pickImage} />
            <Button title="Pick an image from camera roll" onPress={pickImageFromCameraRoll} />
            <Button title="Send picture" onPress={ () =>uploadImage()} /> */}
          </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    backgroundColor: '#c5b391',
  },
  scrollcontainer: {
    flex: 1,
    backgroundColor: '#c5b391',
  },
  scrollViewContainer: {
    backgroundColor: '#c5b391',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  title: {
    width: "100%",
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    width: "100%",
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: 200,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
