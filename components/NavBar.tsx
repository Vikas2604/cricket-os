import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const NavBar = () => {
    return (
        <View style={styles.nav}>
            <Icon
                name="bars"
                color="#000000"
                size={42}
            />
            
            <View style={styles.titleContainer}>
                <Image 
                    source={require('../assets/images/icon.png')} // Replace with the actual path or URL to your logo
                    style={styles.logo}
                />
                <Text style={styles.text}>
                    STRAIGHT DRIVE
                </Text>
            </View>

            <Icon
                name="setting"
                color="#000000"
                size={42}
            />
        </View>
    );
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
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10, // Add a gap between the logo and the text
    },
    logo: {
        width: 40, // Set the logo width
        height: 40, // Set the logo height
        resizeMode: 'contain', // Maintain aspect ratio
    },
    text: {
        color: '#00A2B4',
        fontWeight: '600',
        fontSize: 35,
    }
});
