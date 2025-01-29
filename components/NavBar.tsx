import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';


const NavBar = () => {



    return (
        <View style={styles.nav}>
            <Icon
                name="bars"
                color="#000000"
                size={30}
            >  </Icon>
            <Text style={styles.text}>
                CLIENT LOGO
            </Text>
            <Icon
                name="setting"
                color="#000000"
                size={30}
            >  </Icon>
        </View>
    )
}

export default NavBar;

const styles = StyleSheet.create({
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#0000001A',
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        alignItems: 'center',
        height: 80,
        paddingLeft: 24,
        paddingRight: 24,
    },
    text: {
        color: '#00A2B4',
        fontWeight: 600,
        gap: 20,
        fontSize: 35,
    }

});
