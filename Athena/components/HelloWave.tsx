import { StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import LottieView from 'lottie-react-native';
export function HelloWave() {
  const rotationAnimation = useSharedValue(0);

  rotationAnimation.value = withRepeat(
    withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
    4 // Run the animation 4 times
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={styles.text}>👋</ThemedText>
      {/* <View style={{ 
                      flex: 1, 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent:'center'
                    }}
        >
        <LottieView
        source={require('@/assets/animations/loading-animation.json')}
        // autoPlay
        // loop
        // speed={0.5}
        />
        <Text>Hello</Text>

      </View> */}
      
    </Animated.View>
    
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
