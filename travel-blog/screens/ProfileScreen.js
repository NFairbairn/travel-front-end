import React from 'react';

import { View, ImageBackground, ScrollView, RefreshControl, Modal, Image } from 'react-native'

import { Avatar, Tile, Text, Button, Divider, Icon } from 'react-native-elements'
// import { ScrollView } from 'react-native-gesture-handler';
// import { ExpoConfigView } from '@expo/samples';

export default class ProfileScreen extends React.Component {

  constructor() {
    super()
    this.state = {
      posts: [],
      blog: "",
      visible: false,
      refreshing: true,
      post: {}
    }
  }

  componentDidMount() {
    fetch("https://travel-back-end.herokuapp.com/posts")
    .then(r => r.json())
    .then(data => this.setState({
      posts: data
    }))
  }

  filterPosts = (posts) => {
    let filtered = posts.filter((post) => post.blog_id === 1)
    return filtered.map((post, idx) => {
      return <View key={idx} style={{ flex: 1, flexDirection: 'row'}}>
                <Tile 
                  imageSrc={{uri: post.images[0].uri}}
                  title={post.title}
                  featured
                  contentContainerStyle={{ height: 70 }}
                  caption={post.preview}
                  activeOpacity={1}
                  onPress={() => this.handlePress(post)}
                />
             </View>
    })
  }

  _onRefresh = () => {
    fetch("https://travel-back-end.herokuapp.com/posts")
      .then(r => r.json())
      .then(data => this.setState({posts: data}))
  }

  handlePress = (post) => {
    this.setState({
      post: post,
      visible: true
    })
  }

  renderPosts = (posts) => {
    return posts.map((post, idx) => {
      return <Tile 
          imageSrc={{uri: post.images[0].uri}}
          title={post.title}
          featured
          contentContainerStyle={{ height: 70 }}
          caption={post.preview}
          activeOpacity={1}
          onPress={() => this.handlePress(post)}
        />
      
    })
  }

  renderImages = (post) => {
    if (post.title) {
    return post.images.map((image, idx) => {
      return <Image key={idx} style={{height: 400, width: 400}} source={{uri: image.uri}} />
    })
  } else {
    return <Text>Nope</Text>
  }
  }



  render() {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={this._onRefresh}/>}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Avatar 
          rounded
          icon={{name: 'user', type: 'font-awesome'}}
          size="xlarge"
          containerStyle={{marginTop: 10, marginLeft: 6}}
          />

        <Text h4 style={{marginTop: 70, marginLeft: 10}}>Noah Fairbairn</Text>
      </View>

      <Divider style={{backgroundColor: "black", width: 320, marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 20}}/>


      <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={this._onRefresh}/>}>
        {this.filterPosts(this.state.posts)}
      </ScrollView>

      <Modal 
      visible={this.state.visible}
      presentationStyle={"overFullScreen"}
      >
        <View>

          <ScrollView horizontal>
            {this.renderImages(this.state.post)}
          </ScrollView>
          
          <Text h4 style={{marginLeft: 18, marginRight: 20, marginTop: 20}}>{this.state.post.title}</Text>

          <Divider style={{backgroundColor: "black", width: 320, marginLeft: 20, marginRight: 20, marginTop: 20}}/>

          <ScrollView>
            <Text style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>{this.state.post.content}</Text>
          
          </ScrollView>

          <Button 
            title={"Close"} 
            onPress={() => this.setState({visible: false})}
            buttonStyle={{borderRadius: 20, marginLeft: 60, marginRight: 60}}
            style={{marginTop: 30}}
          />

        
        </View>
      </Modal>
         
        
        
      </ScrollView>
    )
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};
