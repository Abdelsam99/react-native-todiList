import { StyleSheet } from "react-native"

export const s = StyleSheet.create({
    card:{
        backgroundColor: "white",
        flexDirection: 'row',
        height: 100,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 13,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        elevation: 7,
    },
    txt:{
        fontSize: 25
    },
    img:{
        height: 25,
        width: 25
    }
})