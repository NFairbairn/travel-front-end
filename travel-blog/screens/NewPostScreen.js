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
            content: "",
            images: []
        }
    }

    setImages = (images) => {
        this.setState({images})
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
                location_id: 1,
                images: this.state.images
            })
        })
        .then(r => r.json())
        .then(this.setState({
            title: "",
            preview: "",
            content: "",
            images: []
        }))
        .then(this.props.navigation.navigate("Feed"))
    }
 
    render() {
        return (
            <ScrollView>
                <TextInput 
                    style={{
                        height: 40, 
                        width: '90%', 
                        alignSelf: "center", 
                        borderColor: 'gray', 
                        borderWidth: 1, 
                        marginBottom: 20,
                        marginTop: 30,
                        borderRadius: 5
                    }}
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
                    placeholder={"  Title"}
                />

                <TextInput 
                    style={{
                        height: 200, 
                        width: '90%', 
                        alignSelf: "center",
                        borderColor: 'gray', 
                        borderWidth: 1, 
                        marginBottom: 20,
                        borderRadius: 5
                    }}
                    onChangeText={(content) => this.setState({content})}
                    value={this.state.content}
                    multiline={true}
                    numberOfLines={100}
                    placeholder={"  Tell me about it..."}
                />
                
                <PhotoGallery setImages={this.setImages} images={this.state.images}/>
                
                <Button 
                    title="Submit" 
                    onPress={this.handlePress} 
                    buttonStyle={{borderRadius: 20, marginLeft: 60, marginRight: 60}} 
                    style={{marginTop: 30}}
                />
                
            </ScrollView>
        )
    }

}

NewPostScreen.navigationOptions = {
    title: "Write A New Post",
  };