import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";

class EditNotes extends Component {
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
      </View>
    );
  }
}

export default EditNotes;
