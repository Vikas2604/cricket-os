import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const VectorComponent = () => {
  return (
    <View>
      <Svg width={153} height={922} viewBox="0 0 153 922" fill="Player Info">
        <Path
          d="M122.418 1.01758H1.32812V921.204H75.3834V329.267C75.3834 320.384 79.3174 311.957 86.1272 306.252L141.697 259.704C148.507 253.999 152.441 245.572 152.441 236.689V31.04C152.441 14.4591 138.999 1.01758 122.418 1.01758Z"
          fill="#0091A1"
          stroke="#0091A1"
          strokeWidth={1}
        />
      </Svg>
      <Text>1</Text>
    </View>
  )
}

export default VectorComponent

const styles = StyleSheet.create({

})