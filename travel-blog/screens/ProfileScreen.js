import React from 'react';

import { View, ImageBackground, ScrollView } from 'react-native'

import { Avatar, Tile, Text, Button } from 'react-native-elements'
// import { ScrollView } from 'react-native-gesture-handler';
// import { ExpoConfigView } from '@expo/samples';

export default class ProfileScreen extends React.Component {

  constructor() {
    super()
    this.state = {
      posts: [],
      blog: ""
    }
  }

  componentDidMount() {
    fetch("https://travel-back-end.herokuapp.com/posts")
    .then(r => r.json())
    .then(data => this.setState({
      posts: data
    }))
  }

  handlePress = () => {
    console.log()
  }

  filterPosts = (posts) => {
    let filtered = posts.filter((post) => post.blog_id === 1)
    return filtered.map((post, idx) => {
      return <Tile 
      key={idx}
      imageSrc={{uri: post.images[0].uri}}
      title={post.title}
      featured
      contentContainerStyle={{ height: 70 }}
      caption={post.content}
      activeOpacity={1}
    />
    })
  }




  render() {
    return (
      <ScrollView>
      <View style={{height: 300, width: undefined}}>
        <ImageBackground source={{uri: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Mount_Rainier_from_west.jpg"}} style={{width: '100%', height: '100%'}}>
        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-start'}}>
          <Avatar 
            rounded
            source={{uri: "https://image.shutterstock.com/image-vector/blank-avatar-photo-place-holder-260nw-1095249842.jpg"}}
            size="xlarge"
            />
          </View>
        </ImageBackground>
      </View>

        <Text h1 style={{alignSelf: "center"}}>
          {"My Posts"}
        </Text>
        {this.filterPosts(this.state.posts)}
        
      </ScrollView>
    )
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};
