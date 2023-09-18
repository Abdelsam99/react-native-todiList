import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Alert, ScrollView, Text, View } from "react-native";
import { s } from "./App.style";
import Header from "./components/Header/Header";
import CardTodo from "./components/CardTodo/CardTodo";
import { useEffect, useState } from "react";
import TabBottomMenu from "./components/TabBottomMenu/TabBottomMenu";
import BottomAddTodo from "./components/BottomAddTodo/BottomAddTodo";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isUpdateTodo = false;
let isFirstLoad = true;
export default function App() {
  const [selectedTab, setSelectedTabName] = useState("all");
  const [todoList, setTodoList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

//   const [isFirstLoad, setIsFirstLoad] = useState(true);
  useEffect(() => {
    getTodoList();
  }, []);
  useEffect(() => {
    if (isUpdateTodo) {
      isUpdateTodo = false;
    } else {
      if (!isFirstLoad) {
        saveTodoList();
      } else {
        isFirstLoad = false
      }
    }
  }, [todoList]);
  //Filtrer pour chaque onglet la liste de todo.
  const getfilterTodoList = () => {
    switch (selectedTab) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted);
      default:
        return todoList.filter((todo) => todo.isCompleted);
    }
  };
  //Modifier todo
  const updateTodo = (todo) => {
    const listTodoUpdate = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    const indexToUpdate = todoList.findIndex(
      (todo) => todo.id === listTodoUpdate.id
    );
    const updateTodList = [...todoList];
    updateTodList[indexToUpdate] = listTodoUpdate;
    setTodoList(updateTodList);
    // console.log(todo);
  };

  //Pour supprimer les todos
  const deletedTodo = (todoDeleted) => {
    Alert.alert("Suppression", "Supprimer cette tâche", [
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((todo) => todo.id !== todoDeleted.id));
        //   console.log(todoDeleted);
        },
      },
      {
        text: "Annuler",
        style: "cancel",
      },
    ]);
  };
  const showDialog = () => {
    setVisible(true);
  };
  const addTodo = () => {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setVisible(false);
  };
  //sauvegarder dans mon téléphone
  const saveTodoList = async () => {
      console.log("Save");
    try {
      await AsyncStorage.setItem("@todolist", JSON.stringify(todoList));
    } catch (err) {
      // saving error
      alert("Error" + err);
    }
  };
  //récupérer les données depuis mon téléphone
  const getTodoList = async () => {
      console.log("Get");
    try {
      isUpdateTodo = true;
      const jsonValue = await AsyncStorage.getItem("@todolist");
      return jsonValue != null ? setTodoList(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
      alert("Error" + err);
    }
  };
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView>
              {getfilterTodoList().map((todo) => (
                <View key={todo.id} style={s.cardItem}>
                  <CardTodo
                    clickLong={deletedTodo}
                    click={updateTodo}
                    todo={todo}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
          <BottomAddTodo click={showDialog} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabBottomMenu
          todoLists={todoList}
          click={setSelectedTabName}
          selectedTabName={selectedTab}
        />
      </View>
      <Dialog.Container
        visible={visible}
        onBackdropPress={() => setVisible(false)}
      >
        <Dialog.Title>Créer une tâche</Dialog.Title>
        <Dialog.Description>
          Donner le nom de votre novelle tâche
        </Dialog.Description>
        <Dialog.Input onChangeText={setInputValue} />
        <Dialog.Button
          disabled={inputValue.trim().length === 0}
          label="Ajouter"
          onPress={addTodo}
        />
      </Dialog.Container>
    </>
  );
}
