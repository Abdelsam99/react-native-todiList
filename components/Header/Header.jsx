import { View, Text, Image } from "react-native";
import React from "react";
import { s } from "./Header.style";
import headerLogo from "../../assets/logo.png";
export default function Header() {
  return (
    <>
      <Image style={s.img} source={headerLogo} resizeMode="contain" />
      <Text style={s.subtitle}>Liste des tâches à faire</Text>
    </>
  );
}
