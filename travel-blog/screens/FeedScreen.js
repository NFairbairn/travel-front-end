import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Image,
  RefreshControl
} from 'react-native';

import { Text,Tile, SearchBar, Button, Card, Divider } from 'react-native-elements'

// import { MonoText } from '../components/StyledText';

export default class FeedScreen extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        posts: [],
        search: "",
        post: {},
        visible: false,
        refreshing: true
      }
    }

    updateSearch = (search) => {
      let downcase = search.toLowerCase()
      this.setState({search: downcase})
      this.filterPosts(this.state.search)
    }


    componentDidMount() {
      fetch("https://travel-back-end.herokuapp.com/posts")
      .then(r => r.json())
      .then(data => this.setState({
        posts: data
      }))
    }

    filterPosts = (search) => {
      if (search.length !== 1 ) {
      let downcase = search.toLowerCase()
      let filterSearch = this.state.posts.filter((post) => post.title.toLowerCase().includes(downcase))
      this.setState({posts: filterSearch})
      } else {
        this._onRefresh()
      }
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
        return <Image key={idx} style={{height: 400, width: 400}} source={{uri: image.uri}} />
      })
    } else {
      return <Text>Nope</Text>
    }
    }

  // search bar component TODO figure out how to conditionally render this when you click the
  // search icon in the header

  //   

  _onRefresh = () => {
    fetch("https://travel-back-end.herokuapp.com/posts")
      .then(r => r.json())
      .then(data => this.setState({posts: data}))
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
    .then(data => this.setState({posts: data}))
    .then(this.setState({visible: false}))
  }

  render() {

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder={"search"}
        onChangeText={this.updateSearch}
        value={this.state.search}
        lightTheme
      />
      <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={this._onRefresh}/>}>
        {this.renderPosts(this.state.posts)}
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

          <Button 
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
          />
        
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
