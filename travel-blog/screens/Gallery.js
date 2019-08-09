import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PhotoGallery from '../components/PhotoGallery'
// import { ExpoLinksView } from '@expo/samples';

export default function GalleryScreen() {
  return (
    <ScrollView style={styles.container}>
      <PhotoGallery />
    </ScrollView>
  );
}

GalleryScreen.navigationOptions = {
  title: 'Gallery',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
