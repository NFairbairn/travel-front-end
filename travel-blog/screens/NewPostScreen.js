import React from 'react'

import { TextInput, View, Text, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'

import PhotoGallery from '../components/PhotoGallery'


export default class NewPostScreen extends React.Component {

    constructor(){
        super()
        this.state = {
            title: "",
            preview: "",
            content: ""
        }
    }

    handlePress = () => {
        fetch(`http://localhost:3000/posts`, {
            method: "POST",
            headers: {
                "Accepts": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: this.state.title,
                preview: this.state.preview,
                content: this.state.content,
                blog_id: 1,
                location_id: 1
            })
        })
        .then(r => r.json())
        .then(data => console.log(data))
    }
 
    render() {
        return (
            <ScrollView>

                <Text>{"Title:"}</Text>
                <TextInput 
                style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 5}}
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
                />

                <Text>{"Preview:"}</Text>
                <TextInput 
                style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 5}}
                onChangeText={(preview) => this.setState({preview})}
                value={this.state.preview}
                />


                <Text>{"Content:"}</Text>
                <TextInput 
                style={{height: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 3}}
                onChangeText={(content) => this.setState({content})}
                value={this.state.content}
                multiline={true}
                numberOfLines={100}

                />
                
                <PhotoGallery />
                
                <Button title="Submit" onPress={this.handlePress} style={{marginTop: 30}}/>
                
            </ScrollView>
        )
    }

}

NewPostScreen.navigationOptions = {
    title: "Write A New Post",
  };