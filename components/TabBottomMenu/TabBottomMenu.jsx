import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { s } from "./TabBottomMenu.style";
export default function TabBottomMenu({ selectedTabName, click, todoLists }) {
  const countStatus = todoLists.reduce(
    (acc, todo) => {
      todo.isCompleted ? acc.done++ : acc.inProgress++;
      return acc;
    },
    { all: todoLists.length, inProgress: 0, done: 0 }
  );

  const getTextStyle = (tabName) => {
    return {
      fontWeight: "bold",
      padding: 20,
      color: tabName === selectedTabName ? "#2F76E5" : "black",
    };
  };
  return (
    <View style={s.container}>
      <TouchableOpacity onPress={() => click("all")}>
        <Text style={getTextStyle("all")}>All ({countStatus.all}) </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => click("inProgress")}>
        <Text style={getTextStyle("inProgress")}>In progess ({countStatus.inProgress})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => click("done")}>
        <Text style={getTextStyle("done")}>Done ({countStatus.done})</Text>
      </TouchableOpacity>
    </View>
  );
}
