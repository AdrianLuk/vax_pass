import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { IImageContext, ImageProvider } from './context/ImageContext';
import * as ImagePicker from 'expo-image-picker';
import { StorageKeys } from './constants/Storage';
import { clearAllData, getData, storeData } from './hooks/asyncStorage';
const { VAX_PASS, ID_CARD } = StorageKeys;

export default function App() {
  const [vaxImage, setVaxImage] = useState<string | undefined | null>(null);
  const [idImage, setIdImage] = useState<string | undefined | null>(null);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const pickVaxImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setVaxImage(result.uri);
      storeData(VAX_PASS, result.uri);
    }
  };
  const pickIdImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setIdImage(result.uri);
      storeData(ID_CARD, result.uri);
    }
  };

  const clearAllImages = () => {
    clearAllData();
    setVaxImage(null);
    setIdImage(null);
  };

  const imageContext: IImageContext = {
    vaxImage,
    idImage,
    pickIdImage,
    pickVaxImage,
    clearAllImages,
  };

  useEffect(() => {
    const getStorageData = async () => {
      const vaxPass = await getData(VAX_PASS);
      const idCard = await getData(ID_CARD);
      setVaxImage(vaxPass);
      setIdImage(idCard);
    };
    getStorageData();
  }, [vaxImage, idImage]);
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ImageProvider value={imageContext}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ImageProvider>
      </SafeAreaProvider>
    );
  }
}
