import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
/*of course, every time it counts down, we need to report progress.So the function or the component that's going to use this needs a callback to know, Hey, where am I at in my countdown cycle? And that's what our progress is for.On end is a function that will be passed in by the parent to tell the countdown what to do when it ends.And that's about it.*/
//You know, every time we count down, we're setting the amount of milliseconds to track towards zero.and go to onProgress
//14 ..So minutes is used over here to calculate an internal state of milliseconds, and when the timer ends,milliseconds is at zero, we're not resetting it.And that's the problem.
export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(null);
const reset=() =>{
    setMillis(minutesToMillis(minutes))
}
 /*Every time we call Countdown, we want to ensure that the time passed in or the time being manipulated is the time that was previously given to millisecds.
So we do this callback function and then we're ensured that this value is the previous value.*/
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd(reset);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };
  /*Whatever we return at the end is what is going to be set whenever we return at any point in the function actually is what's going to be set in milliseconds.So we get the previous time and then we say if time is zero, hey, you know, at the end the timer and return zero.But if it isn't, take the amount of milliseconds, take a second off of them and return that.And that's how you see a countdown here each second.*/

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  /*And then when we come into our function, our first use effect use effect has this property where if you don't give it any properties, that's going to be the equivalent of mounting the component.But we're passing, this is paused.Which is a property on the countdown timer.Now this is going to be evaluated, the very first time pass gets a value, which is either true or false.So if it is paused, we're going to clear the interval from interval.current.So we're tracking the actual return value of the interval we've set.If it was given a value, if it wasn't, then we won't do it for safety reasons because we're not going to clear null.It's only if interval was actually set over here previously.OK, so looking at that, well, let's say we come in and we're not past, then we're going to set interval to set interval and we're going to call the countdown function every second.If we remove this from the screen, we're going to clear the interval completely and that's for the safety of memory.*/
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
/* difference between use ref and you state is that you use state will cause a re render and use ref will not also similarly use state exposure to variables in an array syntax.One is the holder of the actual value and the other is the center.A ref only returns you one object in which you can set it to whatever variable you want in, if that variable changes, if something happens to it.It won't really cause a rerender to happen on the screen.So when we use React, use ref, we're using it to track the value of set interval so that we can clearit in case you know, we want to pause the timer or in case our component is removed from the screen.*/
