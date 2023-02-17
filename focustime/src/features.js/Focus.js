import React ,{useState} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import {colors} from '../utils/colors';
import {TextInput} from 'react-native-paper';
import { RoundedButton} from '../components/RoundedButton'; 
import {spacing} from '../utils/sizes'

// let us create a functional component that has a view that has a style of styles, that container, which is a flex 1.So it's going to take up the entire space.setSubject (val)=>setSubject(val)
export const Focus = ({addSubject}) =>{
  const [subject , setSubject]=useState(null);
  return(
  <View style={styles.conatainer}>
    <View style={styles.inputContainer}>
      <TextInput style={styles.textInput} onChangeText={setSubject} label="What would you like to focus on?"/>
      <View>
        <RoundedButton style={styles.button} title ="+" size={50} onPress={()=> addSubject(subject)} />
      </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  conatainer:{
    
  },
  button:{
    justifyContent:'center'
  },
  textInput:{
    flex:1,
    marginRight:10,
  },
  inputContainer:{
    flexDirection:'row',
    padding:spacing.lg,
    justifyContent:'top',
  },
});
/*This is  the use of hook a hook allows us to store values during the component lifecycle,so as long as the component is mounted*/