import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Constants from 'expo-constants';
import { colors } from './src/utils/colors';
import { Focus } from './src/features.js/Focus';
import { Timer } from './src/features.js/Timer';
import {FocusHistory} from './src/features.js/FocusHistory'

// or any pure javascript modules available in npm
/*for testing purposes, we don't always want to see the screen.So what we'll do over here is we'll fill in a test subject for now so that we know that we'll always be here*/
export default function App() {
  const[history,setHistory]=useState([])
  const [currentSubject, setCurrentSubject] = useState();
  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <>
        <Focus addSubject={setCurrentSubject} />
        <FocusHistory history={history} />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={(subject) => {
            setHistory([...history,subject])
          }}
          clearSubject={() => setCurrentSubject(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.darkBlue,
  },
});

/*So Flex one is basically saying, hey, I'm going to fill the whole screen.*/
/* we've been able to take our focus feature, pick the subject that we input into the text input box.Pass it up to the app so that the app can be reactive
 to us adding a subject and then swap out the view for something else.*/

/*a git repositories kind of like a box, and you're

going to say like in this box, we're going to keep our code and we're going to keep revisions of our

code.

So every time we change something, we're going to put a new folder and we're going to see the folder

for today is here, the folder for an hour like when I last did.

It is here.

The folder for tomorrow is here.

We're going to organize our code in in this git repository.*/