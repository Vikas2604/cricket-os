import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GoBack = () => {
    const styles = StyleSheet.create({
        btn:{
            borderRadius:96,
            opacity:20,
            width:298,
            height:84,
            backgroundColor:'#00000040',
            fontSize:32,
            color:'#FFFFFF',
            fontWeight:500,
            borderStyle:'solid',
        },
        arrow:{
            padding:10,
        }
    })
    
  return (
    <div>
    <button style={styles.btn}>
        <span style={styles.arrow}>
        <svg width="43" height="30" viewBox="0 0 43 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.19646 17.1429L18 27L15 30L3.43323e-05 15L15 0L18.0536 3L8.19646 12.8571H23.5715V17.1429H8.19646ZM27.8572 17.1429H34.2857V12.8571H27.8572V17.1429ZM42.8572 17.1429H38.5715V12.8571H42.8572V17.1429Z" fill="white"/>
        </svg>
        </span>
        Go Back</button>
    </div>
  )
}

export default GoBack
