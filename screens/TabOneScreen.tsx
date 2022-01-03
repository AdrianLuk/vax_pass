import { useContext } from 'react';
import { Image, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ImageContext from '../context/ImageContext';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const imageContext = useContext(ImageContext);
  return (
    <View style={styles.container}>
      {imageContext?.vaxImage ? (
        <Image source={{ uri: imageContext.vaxImage }} style={styles.image} resizeMode='contain' />
      ) : (
        <Text style={styles.title}>Please select an Image</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
