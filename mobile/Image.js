// ImageListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { getImagesByCategory } from './Database';
import { useNavigation } from '@react-navigation/native';

const ImageListScreen = ({ route }) => {
  const { category } = route.params;
  const [images, setImages] = useState([]);
  const navigation = useNavigation()

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const result = await getImagesByCategory(category);
      setImages(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des images :', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Images de la catégorie {category}</Text>
      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    padding: 16,
    backgroundColor: '#c5b391',
  },
  header: {
    width: "100%",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  imageContainer: {
    margin: 5,
    borderRadius: 10,
    borderWidth: 3,  // Largeur de la bordure
    borderColor: 'black',  // Couleur de la bordure
  },
  
  image: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default ImageListScreen;
