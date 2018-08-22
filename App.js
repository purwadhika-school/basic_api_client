import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import axios from "axios";
import AddNotes from "./src/AddNotes";
import EditNotes from "./src/EditNotes";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataNotes: [],
      pageNeedsTobeRender: "",
      id_notes: 0
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const url = "http://172.104.50.9:3000/api/Notes";
    axios
      .get(url)
      .then(res => {
        this.setState({ dataNotes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderItemList = notesData => {
    console.log(notesData);
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({
            pageNeedsTobeRender: "edit_notes",
            id_notes: notesData.item.id
          })
        }
      >
        <View
          style={{
            borderColor: "black",
            borderRadius: 3,
            borderWidth: 1,
            padding: 5
          }}
        >
          <Text style={{ fontSize: 20 }}>{notesData.item.title}</Text>
          <Text style={{ fontSize: 15 }}>{notesData.item.content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  handleBackToDefaultPage = () => {
    this.setState({ pageNeedsTobeRender: "" });
  };

  render() {
    if (this.state.pageNeedsTobeRender === "") {
      return (
        <View style={{ flex: 1 }}>
          {this.state.dataNotes.length > 0 ? (
            <FlatList
              data={this.state.dataNotes}
              renderItem={this.renderItemList}
              keyExtractor={(item, id) => item.index}
            />
          ) : (
            <ActivityIndicator
              style={{ marginTop: 35 }}
              size="small"
              animating
            />
          )}
          <TouchableOpacity
            onPress={() => this.setState({ pageNeedsTobeRender: "add_notes" })}
            style={{ width: "90%", backgroundColor: "blue" }}
          >
            <Text style={{ color: "white", margin: 10, textAlign: "center" }}>
              Add Notes
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.pageNeedsTobeRender === "add_notes") {
      return (
        <AddNotes
          name="yogie"
          handleBackToDefaultPage={this.handleBackToDefaultPage}
        />
      );
    } else if (this.state.pageNeedsTobeRender === "edit_notes") {
      return (
        <EditNotes
          id={this.state.id_notes}
          handleBackToDefaultPage={this.handleBackToDefaultPage}
        />
      );
    }

    return null;
  }
}
