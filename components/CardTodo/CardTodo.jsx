import { View, Text, TouchableOpacity, Image } from 'react-native'
import check from '../../assets/check.png'
import { s } from './CardTodo.style'

export default function CardTodo({todo, click,clickLong}) {
  return (
    <TouchableOpacity onLongPress={()=>clickLong(todo)} onPress={()=> click(todo)} style={s.card}>
      <Text style={[s.txt, todo.isCompleted && { textDecorationLine: "line-through"}]}>{todo.title}</Text>
      { todo.isCompleted && <Image style={s.img} source={check}/>}
    </TouchableOpacity>
  )
}