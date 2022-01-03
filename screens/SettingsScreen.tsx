import { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';
import { StorageKeys } from '../constants/Storage';
import { clearAllData, getData, storeData } from '../hooks/asyncStorage';
import ImageContext from '../context/ImageContext';

const { VAX_PASS, ID_CARD } = StorageKeys;

export default function SettingsScreen() {
  const imageContext = useContext(ImageContext);
  // const { vaxImage, pickVaxImage, idImage, pickIdImage } = imageContext;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Images</Text>
        {imageContext?.clearAllImages && (
          <Button title='Clear All' onPress={imageContext.clearAllImages} />
        )}
        <Text style={styles.title}>Vaccine Certificate</Text>
        {imageContext?.vaxImage && (
          <Image source={{ uri: imageContext.vaxImage }} style={styles.image} />
        )}
        {imageContext?.pickVaxImage && (
          <Button title='Choose Vaccine Certificate Image' onPress={imageContext.pickVaxImage} />
        )}
        {imageContext?.idImage && (
          <Image source={{ uri: imageContext.idImage }} style={styles.image} />
        )}
        {imageContext?.pickIdImage && (
          <Button title='Choose Id Card Image' onPress={imageContext.pickIdImage} />
        )}
        {/* <EditScreenInfo path='/screens/ModalScreen.tsx' /> */}
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
