import React from 'react'

import {
  StyleSheet,
  View,
  Image,
  Button
} from 'react-native'

import * as ImagePicker from "expo-image-picker"
import * as Permissions from 'expo-permissions'

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

export default class PhotoGallery extends React.Component {
  constructor(){
    super()
    this.state = {
      image: null
    }
  }

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({ aspect: 1, allowsEditing: true });
    this.setState({
      image: uri
    })
    console.log(this.state.image)
  }

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({ allowsEditing: false });
    this.setState({
      image: uri
    })
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Image 
          style={styles.image}
          source={{uri: this.state.image}}
        />
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