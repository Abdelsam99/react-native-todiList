import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { s } from './BottomAddTodo.style'

export default function BottomAddTodo({click}) {
  return (
    <TouchableOpacity onPress={click} style={s.btn}>
      <Text style={s.txt}>+ New todo</Text>
    </TouchableOpacity>
  )
}