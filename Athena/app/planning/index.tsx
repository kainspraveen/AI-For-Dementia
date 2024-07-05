
import React, { View, 
    Text, 
    SafeAreaView, 
    Animated, 
    Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from "react";


export default function Planning() {
    const animationProgress = useRef(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(animationProgress.current, {
          toValue: 1,
          duration: 10,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      }, []);
    

    return (
    // <SafeAreaView>
        <View 
            style = {{
                alignItems: 'center'
            }}
        >
            <LottieView
            style={{height:'100%', width:'100%'}}
            source={require('@/assets/animations/loading-animation.json')}
            // progress={animationProgress.current}
            autoPlay
            loop
            speed={0.5}
            />
            <Text
                // style = {{
                //     fontSize:'20px',
                //     margin: 'auto'
                //     }}
            >Loading....</Text>

        </View>
    // </SafeAreaView>
    )

    }