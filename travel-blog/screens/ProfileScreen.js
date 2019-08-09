import React from 'react';

import { View, ImageBackground, ScrollView } from 'react-native'

import { Avatar, Tile, Text } from 'react-native-elements'
// import { ScrollView } from 'react-native-gesture-handler';
// import { ExpoConfigView } from '@expo/samples';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <ScrollView>
      <View style={{height: 200, width: undefined}}>
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
          {"My Blogs"}
        </Text>

        <Tile 
          title={"San Fran"} 
          featured 
          imageSrc={{uri: "https://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/SanFrancisco_0.jpg"}} 
          caption={"This is my blog about San Fran."}
          activeOpacity={1}
          />

        <Tile 
          title={"New York"}  
          featured 
          imageSrc={{uri: "https://www.gannett-cdn.com/media/2018/12/15/USATODAY/usatsports/MotleyFool-TMOT-657f0436-21e9af86.jpg"}}
          caption={"This is my blog about New York."}
          activeOpacity={1}
          />

        <Tile 
          title={"Denver"} 
          featured 
          imageSrc={{uri: "https://prod-marketing-greenhouse.global.ssl.fastly.net/blog-assets/denver.jpg?mtime=20180926010150"}} 
          caption={"This is my blog about Denver."}
          activeOpacity={1}
          />
      </ScrollView>
    )
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};
