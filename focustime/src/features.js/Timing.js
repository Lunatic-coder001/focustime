import React from 'react';
import {View,StyleSheet} from 'react-native' 
import {RoundedButton} from '../components/RoundedButton'

export const Timing=({onChangeTime})=>{

return (
  <>
   <View style={styles.timingButton}>
      <RoundedButton size={75} title="10" onPress={()=> onChangeTime(10)}/>
    </View>
    <View style={styles.timingButton}>
      <RoundedButton size={75} title="15" onPress={()=> onChangeTime(15)}/>
    </View>
    <View style={styles.timingButton}>
      <RoundedButton size={75} title="20" onPress={()=> onChangeTime(20)}/>
    </View>
  </>
)
}

const styles=StyleSheet.create({
  timingButton:{
  flex:1,
  alignItems:'center',  
  }
})

//  I need to add more timing buttons.So what I can do over here is I can use something called a fragment in React, which allows me to define multiple elements without needing to define them inside the same view.
