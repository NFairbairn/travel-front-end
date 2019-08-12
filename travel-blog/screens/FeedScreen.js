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

import { Text,Tile, SearchBar, Button, Card } from 'react-native-elements'

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
      this.filterPosts(search)
    }


    componentDidMount() {
      fetch("https://travel-back-end.herokuapp.com/posts")
      .then(r => r.json())
      .then(data => this.setState({
        posts: data
      }))
    }

    filterPosts = (search) => {
      let downcase = search.toLowerCase()
      let filterSearch = this.state.posts.filter((post) => post.title.includes(downcase))
      this.setState({posts: filterSearch})
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
            caption={post.content}
            activeOpacity={1}
            onPress={() => this.handlePress(post)}
          />
        </View>
      })
    }

    

    renderImages = (post) => {
      if (post.title) {
      return post.images.map((image, idx) => {
        return <Image key={idx} style={{height: 300, width: 300}} source={{uri: image.uri}} />
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
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center'}}>
          
          <Card 
            title={this.state.post.title}
            style={{width: 300, height: 500}}
          >
            <Text>{this.state.post.content}</Text>

            
          </Card>

          <ScrollView horizontal>
            {this.renderImages(this.state.post)}
          </ScrollView>

          <Button title={"Close"} onPress={() => this.setState({visible: false})}></Button>
        </View>
      </Modal>
    </View>
  ); 
  }
}

FeedScreen.navigationOptions = {
  title: "WNDR",
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
