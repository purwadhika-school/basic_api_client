import React, { Component } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import axios from "axios";

class AddNotes extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "" };
  }

  handleAddNotes = () => {
    const { title, content } = this.state;
    const url = "http://172.104.50.9:3000/api/Notes";

    if (title === "" || content === "") {
      Alert.alert("Warning!", "This field can not be empty!");
    } else {
      const data = { title, content };
      axios
        .post(url, data)
        .then(res => {
          if (res.status === 200) {
            this.props.handleBackToDefaultPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    console.log(this.props);
    return (
      <View>
        <Text>Add Notes baru {this.props.name}</Text>
        <TextInput
          onChangeText={dataTxt => this.setState({ title: dataTxt })}
          placeholder="Input Title"
          style={{ backgroundColor: "yellow", margin: 10 }}
        />
        <TextInput
          onChangeText={dataTxt => this.setState({ content: dataTxt })}
          placeholder="Input Content"
          style={{ backgroundColor: "yellow", margin: 10 }}
        />
        <TouchableOpacity
          onPress={() => this.props.handleBackToDefaultPage()}
          style={{ width: "90%", backgroundColor: "blue" }}
        >
          <Text style={{ margin: 10, textAlign: "center", color: "white" }}>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.handleAddNotes()}
          style={{ width: "90%", backgroundColor: "green" }}
        >
          <Text style={{ margin: 10, textAlign: "center", color: "white" }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddNotes;
