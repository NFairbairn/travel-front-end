import React from 'react'

import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import * as ImagePicker from "expo-image-picker"
import * as Permissions from 'expo-permissions'
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignItems: "center",
   justifyContent: "center",
   marginLeft: 10
  },
  image: {
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 4,
    height: 200,
    width: 340
  },
});

export default class PhotoGallery extends React.Component {
  constructor(props){
    super(props)
  }

  displayImages = (images) => {
    return images.map((image, idx) => {
      return <Image key={idx} style={styles.image} source={{uri: image.uri}}/>
    })
  }

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const image = await ImagePicker.launchImageLibraryAsync({ aspect: 1, allowsEditing: true });
    let all = this.props.images
    if (image.uri) {
      all.push(image)
      this.props.setImages(all)
    }
  }

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const image = await ImagePicker.launchCameraAsync({ aspect: 1, allowsEditing: true });
    let all = this.props.images
    if (image.uri) {
      all.push(image)
      this.props.setImages(all) 
    }
  }

  render() {
    return (
      <View>
        
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-around", position: "fixed", marginBottom: 40, marginTop: 10}}>
            <Icon 
            onPress={this.selectPicture} 
            name={"image"}
            type={"ion-icon"}
            size={50}
            />
            
            <Icon 
            onPress={this.takePicture} 
            name={"device-camera"}
            type={"octicon"}
            size={45}
            />
        </View>
          
          <ScrollView horizontal style={{marginLeft: 20}}>
            {this.displayImages(this.props.images)}
          </ScrollView>
          
        
      </View>
    )
  }
}