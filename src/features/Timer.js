import React, {useState} from 'react';
import {View, Text, StyleSheet, Vibration} from 'react-native'
import {ProgressBar} from 'react-native-paper'
import { useKeepAwake } from 'expo-keep-awake';
import {Countdown} from '../components/CountDown'
import {RoundedButton} from '../components/RoundedButton'
import {spacing} from "../utils/sizes"
import {colors} from "../utils/colors"
import {Timing} from './Timing'

const PATTERN = [
  1000,
  1000,
  1000,
  1000,
  1000,
]

export const Timer = ({focusSubject, clearSubject, onTimerEnd}) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN)
    setIsStarted(false)
    setProgress(1)
    reset()
    onTimerEnd(focusSubject)
  }
  return (
  <View style={styles.container}>
    <View style={styles.countdown}>
      <Countdown minutes={minutes} isPaused={!isStarted} onProgress={setProgress} onEnd={onEnd} />
    <View style={{ paddingTop: spacing.xxl }}>
      <Text style={styles.title}>Focusing on:</Text>
      <Text style={styles.task}>{focusSubject}</Text>
    </View>
    </View>
    <View style={{paddingTop: spacing.sm}}>
      <ProgressBar color={colors.progressBar} style={{height: spacing.sm}} progress={progress} />
    </View>
    <View style={styles.timingWrapper}>
    <Timing onChangeTime={setMinutes} />
    </View>
    <View style={styles.buttonWrapper}>
      {!isStarted && <RoundedButton title='Start' onPress={() => setIsStarted(true)}/>}
      {isStarted && <RoundedButton title='Pause' onPress={() => setIsStarted(false)}/>}
    </View>
    <View style={styles.clearSubjectWrapper}>
      <RoundedButton size={60} title="Back" onPress={clearSubject} />
    </View>
  </View>
)
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  }
})