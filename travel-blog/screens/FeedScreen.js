import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Image,
  RefreshControl
} from 'react-native';

import posed from 'react-native-pose'

import { Text,Tile, SearchBar, Button, Divider, Icon } from 'react-native-elements'


export default class FeedScreen extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        posts: [],
        search: "",
        post: {},
        visible: false,
        refreshing: true,
        filteredPosts: [],
        pinnedPosts: []
      }
    }

    updateSearch = (search) => {
      let downcase = search.toLowerCase()
      this.setState({search: downcase})
      this.filterPosts(search)
    }


    componentDidMount() {
      fetch("https://travel-back-end.herokuapp.com/posts")
      .then(r => r.json())
      .then(data => this.setState({
        posts: data,
        filteredPosts: data
      }))
    }

    filterPosts = (search) => {
      let downcase = search.toLowerCase()
      let filtered = this.state.posts.filter((post) => post.title.toLowerCase().includes(downcase))

      this.setState({filteredPosts: filtered})
    }

    handlePress = (post) => {
      this.setState({
        post: post,
        visible: true
      })
    }

    renderPosts = (posts) => {
      return posts.map((post, idx) => {
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

    

    renderImages = (post) => {
      if (post.title) {
      return post.images.map((image, idx) => {
        return <Image key={idx} style={{height: 600, width: 380}} source={{uri: image.uri}} />
      })
    } else {
      return <Text>Nope</Text>
    }
    }


  _onRefresh = () => {
    fetch("https://travel-back-end.herokuapp.com/posts")
      .then(r => r.json())
      .then(data => this.setState({filteredPosts: data}))
  }

  handleDelete = (post) => {
    fetch(`https://travel-back-end.herokuapp.com/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        "Accepts": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(r => r.json())
    .then(data => this.setState({filteredPosts: data}))
    .then(this.setState({visible: false}))
  }

  // createPin = (post) => {
  //   fetch(`https://travel-back-end.herokuapp.com/pins`, {
  //     method: "POST",
  //     headers: {
  //       "Accepts": "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       post_id: post.id,
  //     })
  //   })
  //   .then(r => r.json())
  //   .then(pin => {
  //     let pinned = this.state.pinnedPosts
  //     pinned.push(pin)
  //     this.setState({pinnedPosts: pinned})
  //     console.log(this.state.pinnedPosts)
  //   })
  // }

  // displayPin = (post) => {
  //   if (post.pin) {
  //     return <Text>has a pin</Text>
  //   } else {
  //     return <Text>doesnt have a pin</Text>
  //   }
  // }

  render() {

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder={"search"}
        onChangeText={this.updateSearch}
        value={this.state.search}
        containerStyle={{backgroundColor: "white", borderColor: "white", borderBottomWidth: 0, borderTopWidth: 0}}
        inputContainerStyle={{backgroundColor: "white", marginLeft: 0, marginRight: 0}}
        onClear={() => this._onRefresh()}
      />
      <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={this._onRefresh}/>}>
        {this.renderPosts(this.state.filteredPosts)}
      </ScrollView>

      <Modal 
        visible={this.state.visible}
        presentationStyle={"overFullScreen"}
      >
        <ScrollView>

          <ScrollView horizontal>
            {this.renderImages(this.state.post)}
          </ScrollView>
          
          <Text h4 style={{marginLeft: 18, marginRight: 20, marginTop: 20}}>{this.state.post.title}</Text>

          <Divider style={{backgroundColor: "black", width: 320, marginLeft: 20, marginRight: 20, marginTop: 20}}/>

          <ScrollView>
            <Text style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>{this.state.post.content}</Text>
          
          </ScrollView>

          {/* <Button 
            title={"Close"} 
            onPress={() => this.setState({visible: false})}
            buttonStyle={{borderRadius: 20, marginLeft: 60, marginRight: 60}}
            style={{marginTop: 20}}
          />

          <Button 
            title={"Delete"}
            onPress={() => this.handleDelete(this.state.post)}
            buttonStyle={{borderRadius: 20, marginLeft: 60, marginRight: 60}}
            style={{marginTop: 20, marginBottom: 60}}
            type="outline"
          /> */}

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-around", position: "fixed", marginBottom: 40, marginTop: 40}}>
      
          <Icon 
            name={"trashcan"}
            type={"octicon"}
            onPress={() => this.handleDelete(this.state.post)}
            size={30}
            />
            
            <Icon 
            name={"pin"}
            type={"octicon"}
            onPress={() => console.log("pin me blazer")}
            size={30}
            />
            
            <Icon 
            name={"x"}
            type={"octicon"}
            onPress={() => this.setState({visible: false})}
            size={30}
            />  

           

          </View>
        
        </ScrollView>
      </Modal>
    </View>
  ); 
  }
}

FeedScreen.navigationOptions = {
  title: "WNDR",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  }
});
