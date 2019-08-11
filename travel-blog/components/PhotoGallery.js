import React from 'react'

import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import * as ImagePicker from "expo-image-picker"
import * as Permissions from 'expo-permissions'
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignItems: "center",
   justifyContent: "center",
   marginLeft: 10
  },
  image: {
    borderWidth: 4,
    borderColor: '#d6d7da',
    height: 200,
    width: 340
  },
});

export default class PhotoGallery extends React.Component {
  constructor(props){
    super(props)
  }

  // componentDidMount() {
  //   fetch("https://travel-back-end.herokuapp.com/images")
  //   .then(r => r.json())
  //   .then(data => this.setState({
  //     images: data
  //   }))
  // }

  displayImages = (images) => {
    return images.map((image, idx) => {
      return <Image key={idx} style={styles.image} source={{uri: image.uri}}/>
    })
  }

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const image = await ImagePicker.launchImageLibraryAsync({ aspect: 1, allowsEditing: true });
    let all = this.props.images
    all.push(image)
    this.props.setImages(all)
  }

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const image = await ImagePicker.launchCameraAsync({ aspect: 1, allowsEditing: true });
    let all = this.props.images
    all.push(image)
    this.props.setImages(all) 
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View>
          
            <Button 
            onPress={this.selectPicture} 
            title={"Add to Gallery"}
            buttonStyle={{borderRadius: 20, marginLeft: 60, marginRight: 60, marginBottom: 5}} 
            />

            <Button 
            onPress={this.takePicture} 
            buttonStyle={{borderRadius: 20, marginLeft: 60, marginRight: 60, marginBottom: 5}} 
            title={"Take a Photo"}
            />
        </View>
          
          <ScrollView horizontal>
            {this.displayImages(this.props.images)}
          </ScrollView>
          
        
      </View>
    )
  }
}