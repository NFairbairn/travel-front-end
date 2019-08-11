import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { Header, Text, Card, Image, Tile, SearchBar } from 'react-native-elements'

// import { MonoText } from '../components/StyledText';

export default class FeedScreen extends React.Component {

    constructor() {
      super()
      this.state = {
        posts: [],
        search: ""
      }
    }

    updateSearch = (search) => {
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

    renderPosts = (posts) => {
      return posts.map((post, idx) => {
        // console.log(post.images[0].uri)
        return <View key={idx} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Tile 
            imageSrc={{uri: post.images[0].uri}}
            title={post.title}
            featured
            contentContainerStyle={{ height: 70 }}
            caption={post.content}
            activeOpacity={1}
          />
        </View>
      })
    }

  // search bar component TODO figure out how to conditionally render this when you click the
  // search icon in the header

  //   

  render() {

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder={"search"}
        onChangeText={this.updateSearch}
        value={this.state.search}
        lightTheme
      />
      <ScrollView>
        {this.renderPosts(this.state.posts)}
      </ScrollView>
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
