import React,{useState} from 'react';
import {View,StyleSheet,Text,Vibration} from 'react-native';
import {useKeepAwake} from 'expo-keep-awake';
import {ProgressBar} from 'react-native-paper';
import {Countdown} from '../components/Countdown';
import {RoundedButton} from '../components/RoundedButton'
import {spacing} from '../utils/sizes';
import {colors} from '../utils/colors';
import {Timing} from './Timing';


 const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ];

 

//isPused () chages{} is true so return is done
//Now how do we know that this progress is the correct progress?Well, let's go look at our countdown component and let's go look if we remember correctly.You know, every time we count down, we're setting the amount of milliseconds to//
/* for onProgress We could probably just give set progress to our progress because remember, progress is the equivalent of a function that takes the value and then sets the value right.
So like values set progress value is the same thing as giving set progress directly to onprogress.onProgress={(progress)=>{ setProgress(progress)}}*/
export const Timer = ({focusSubject,clearSubject,onTimerEnd})=>{
  useKeepAwake();
  const[isStarted,setIsStarted] =useState(false);
  const[progress ,setProgress]= useState(1);
  const[minutes , setMinutes]= useState(0.1);//0.1=6 seconds

   const onEnd=(reset) =>{
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  }
  return(
  <View style={styles.conatiner}>
    <View style={styles.countDown}>
      <Countdown isPaused={!isStarted} onProgress={setProgress} onEnd={onEnd} />
      <View style={{paddingTop:spacing.xxl}}>
      <Text style={styles.title}> Focusing on:</Text>
      <Text style={styles.task}>{focusSubject}</Text>

    </View>
    </View>
    <View>
      <View style={{paddingTop:spacing.sm}}>
        <ProgressBar 
        progress={progress}
        color={colors.progressBar} style={{height:spacing.sm}}/>
      </View>
    </View>
    <View style={styles.buttonWrapper}>
      <Timing onChangeTime={setMinutes}/>   
    </View>
    <View style={styles.buttonWrapper}>
    {!isStarted && (<RoundedButton title="start" onPress={()=> setIsStarted(true)}/>)}
    {isStarted && (<RoundedButton title="pause" onPress={()=> setIsStarted(false)}/>)}
      
    </View>
    <View style={styles.clearSubjectWrapper}>
      <RoundedButton size={50} title="-" onPress={()=>{clearSubject}}/>
    </View>
  </View>
)}

const styles= StyleSheet.create({
  conatiner:{
    flex:1,
    
  },
  countDown:{
    flex:0.5,////1 was stretching it all over the screen
    alignItems:'center',
    justifyContent:'center'
  },
  timingWrapper:{
    flex:0.1,// they're overlapping each other.Why is that the case?Well, over here we need to actually give it Flex Direction Row so that it renders in a row. thimk not happended
    paddingTop:spacing.xxl,
    flexDirection:'row',
  },
  buttonWrapper:{
    flex:0.3,
    flexDirection:'row',
    padding:15,
    justifyContent:'center',
    alignItems:'center',
  },
  clearSubjectWrapper:{
    flexDirection:'row',
    justifyContent:'center',
  },
  title:{
    color:colors.white,
    fontWeight:'bold',
    textAlign:'center',
  },
  task:{
    color:colors.white,
    textAlign:'center',

  },
})