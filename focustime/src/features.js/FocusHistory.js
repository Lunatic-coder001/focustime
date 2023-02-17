import React from 'react';
import {View ,Text,StyleSheet,FlatList} from 'react-native';
import {colors} from '../utils/colors'
import {fontSizes ,spacing} from '../utils/sizes'



export const FocusHistory=({history})=>{
if(!history || !history.length) return  <Text style={styles.title}>  we have not  focused on anything yet: </Text>;
const renderItem =({item}) =>
<Text style={styles.item}>- {item}</Text>
return(
  
  <View style={styles.container}>
    <Text style={styles.title}> Things we have focused on: </Text>
    <FlatList data={history} renderItem={renderItem}/>
  </View>
);
};

// Flex one, so that takes up the full space.And then now we can see, hey, now I can actually scroll it when we didn't give this Flex one, it was only filling in the space it required, which doesn't allow us to scroll.

const styles=StyleSheet.create({
  container:{
    padding:spacing.md,
    flex:1,
  },
  item:{
    fontSize:fontSizes.md,
    color:colors.white,
    paddingTop:spacing.md,

  },
  title:{
    color:colors.white,
    fontSize:fontSizes.lg,
    fontWeight:'bold',
    
  },
})
