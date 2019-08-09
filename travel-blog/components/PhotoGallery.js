import React from 'react'

import {
  StyleSheet,
  View,
  Image,
  Button
} from 'react-native'

import * as ImagePicker from "expo-image-picker"
import * as Permissions from 'expo-permissions'
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignItems: "center",
   justifyContent: "center"
  },
  image: {
    borderWidth: 4,
    borderColor: '#d6d7da',
    height: 300,
    width: 300
  },
});

function getPhotos() {
  
}

export default class PhotoGallery extends React.Component {
  constructor(){
    super()
    this.state = {
      images: []
    }
  }

  componentDidMount() {
    fetch("https://travel-back-end.herokuapp.com/images")
    .then(r => r.json())
    .then(data => this.setState({
      images: data
    }))
  }

  displayImages = (images) => {
    return images.map((image, idx) => {
      return <Image key={idx} style={styles.image} source={{uri: image.uri}}/>
    })
  }

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const image = await ImagePicker.launchImageLibraryAsync({ aspect: 1, allowsEditing: true });
    let all = this.state.images
    all.push(image)
    this.setState({
      images: all
    })
  }

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const image = await ImagePicker.launchCameraAsync({ aspect: 1, allowsEditing: true });
    let all = this.state.images
    all.push(image)
    this.setState({
      images: all
    })
    
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          {this.displayImages(this.state.images)}
        </ScrollView>
        <View>
          <Button onPress={this.selectPicture} title={"Gallery"}>
          </Button>
          <Button onPress={this.takePicture} title={"Take a Photo"}>
          </Button>
        </View>
      </View>
    )
  }
}