import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import axios from "axios";

class EditNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      titleFromUser: "",
      contentFromUser: ''
    };
  }

  componentDidMount() {
    this.getNotesForTextInput();
  }

  deleteNote = () => {
    const id_notes = this.props.id;
    const url = `http://172.104.50.9:3000/api/Notes/${id_notes}`; // template string
    axios
      .delete(url)
      .then(res => {
        this.props.handleBackToDefaultPage();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getNotesForTextInput = () => {
    const id_notes = this.props.id;
    const url = `http://172.104.50.9:3000/api/Notes/${id_notes}`; // template string
    axios
      .get(url)
      .then(response => {
        const { title, content } = response.data;
        this.setState({ title, content });
      })
      .catch(error => {
        console.log(error);
      });
  };

  validateDataInputFromUser = () => {
    const { titleFromUser, contentFromUser } = this.state
    if (titleFromUser === "" || contentFromUser === ""){
      Alert.alert('Warning!', 'Fields can not be empty!')
    } else {
      this.updateNotesfromUser()
    }
  }

  updateNotesfromUser = () => {

  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.deleteNote()}
          style={{ backgroundColor: "red", width: "90%" }}
        >
          <Text style={{ margin: 5, textAlign: "center" }}>
            Delete This Note!
          </Text>
        </TouchableOpacity>
        <View style={{ borderColor: "grey", borderWidth: 1, marginTop: 35 }} />
        <Text>Edit notes</Text>
        <Text>{this.props.id}</Text>
        <TextInput
          onChangeText={txt => this.setState({ titleFromUser: txt })}
          placeholder={this.state.title}
          style={{ backgroundColor: "grey", width: "80%", marginBottom: 10 }}
        />
        <TextInput
          onChangeText={txt => this.setState({ contentFromUser: txt })}
          placeholder={this.state.content}
          style={{ backgroundColor: "grey", width: "80%", marginBottom: 10 }}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.props.handleBackToDefaultPage()}
            style={{ backgroundColor: "green", width: "40%", marginRight: 10 }}
          >
            <Text>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.validateDataInputFromUser()}
            style={{ backgroundColor: "green", width: "40%" }}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default EditNotes;

// 1. Back button navigate to default page === ok
// 2. data dari server dataroh di textinput === ok
// 3. Submit -> request put to api server 
// 4. One or many fields can not be empty
