import React from "react";
import { View, Text, TextInput, TextInputProps, StyleSheet } from "react-native";
import {
  Canvas,
  Path,
  BlurMask,
  Group,
  Skia,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  useAnimatedProps,
  interpolateColor,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

import { styles } from "./styles";

//Icons ../../components/icons/Readme.md 
import WeightUpIcon from '../../components/icons/WeightUpIcon';
import WeightDownIcon from "../../components/icons/WeightDownIcon";


const MIN_Y = 67;
const MAX_Y = 272;
const TOTAL_RANGE = MAX_Y - MIN_Y; 
const MAX_WEIGHT = 30;
const PX_PER_LB = TOTAL_RANGE / MAX_WEIGHT; 

const Y_30_LBS = MIN_Y;                                      
const Y_19_LBS = MIN_Y + (MAX_WEIGHT - 19) * PX_PER_LB;      
const Y_18_LBS = MIN_Y + (MAX_WEIGHT - 18) * PX_PER_LB;      
const Y_10_LBS = MIN_Y + (MAX_WEIGHT - 10) * PX_PER_LB;      
const Y_0_LBS  = MAX_Y;                                      
const Y_MINUS_5_LBS = MIN_Y + (MAX_WEIGHT - (-5)) * PX_PER_LB; 

const INPUT_RANGE = [Y_30_LBS, Y_19_LBS, Y_18_LBS, Y_10_LBS, Y_0_LBS, Y_MINUS_5_LBS];

const COLORS_LIGHT = [
  "rgba(255, 51, 0, 0.29)",   
  "rgba(255, 140, 0, 0.29)",  
  "rgba(255, 195, 0, 0.29)",  
  "rgba(255, 230, 0, 0.29)",  
  "rgba(239, 255, 0, 0.29)",  
  "rgba(239, 255, 0, 0.29)"   
];

const COLORS_MID = [
  "rgb(255, 51, 0)",          
  "rgb(255, 140, 0)",         
  "rgb(255, 195, 0)",         
  "rgb(255, 230, 0)",         
  "rgb(239, 255, 0)",         
  "rgb(239, 255, 0)"          
];

const COLORS_CORE = [
  "rgb(255, 100, 50)",        
  "rgb(255, 170, 70)",        
  "rgb(255, 210, 50)",        
  "rgb(255, 240, 80)",        
  "rgb(233, 245, 137)",       
  "rgb(233, 245, 137)"        
];

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function Test3() {
  const knobCy = useSharedValue<number>(149); 
  const startY = useSharedValue<number>(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startY.value = knobCy.value;
    })
    .onUpdate((e) => {
      const clampedY = Math.max(MIN_Y, Math.min(MAX_Y, startY.value + e.translationY));
      knobCy.value = clampedY;
    })
    .onEnd(() => {
      const currentLb = Math.round(MAX_WEIGHT - ((knobCy.value - MIN_Y) / TOTAL_RANGE) * MAX_WEIGHT);
      const snapY = MIN_Y + (MAX_WEIGHT - currentLb) * PX_PER_LB;
      knobCy.value = withSpring(snapY, { damping: 14, stiffness: 120 });
    });

  const fullLine = useDerivedValue(() => {
    const cy = knobCy.value;
    const p = Skia.Path.Make();
    p.moveTo(185, 26);
    p.lineTo(185, cy - 36);
    p.cubicTo(185, cy - 29, 184, cy - 23, 180, cy - 18);
    p.cubicTo(175, cy - 12, 170, cy - 9, 170, cy);
    p.cubicTo(170, cy + 9, 175, cy + 14, 180, cy + 20);
    p.cubicTo(184, cy + 25, 185, cy + 31, 185, cy + 39);
    p.lineTo(185, 320); 
    return p;
  });

  const curveGlow = useDerivedValue(() => {
    const cy = knobCy.value;
    const p = Skia.Path.Make();
    p.moveTo(185, cy - 36);
    p.cubicTo(185, cy - 29, 184, cy - 23, 180, cy - 18);
    p.cubicTo(175, cy - 12, 170, cy - 9, 170, cy);
    p.cubicTo(170, cy + 9, 175, cy + 14, 180, cy + 20);
    p.cubicTo(184, cy + 25, 185, cy + 31, 185, cy + 39);
    return p;
  });

  const activeColorLight = useDerivedValue(() => interpolateColor(knobCy.value, INPUT_RANGE, COLORS_LIGHT));
  const activeColorMid = useDerivedValue(() => interpolateColor(knobCy.value, INPUT_RANGE, COLORS_MID));
  const activeColorCore = useDerivedValue(() => interpolateColor(knobCy.value, INPUT_RANGE, COLORS_CORE));

  const lineGradientColors = useDerivedValue(() => {
    return ["#777477", activeColorMid.value, "#777477"];
  });
  
  const lineGradientPositions = useDerivedValue(() => {
    const lineLength = 320 - 26;
    const currentPos = (knobCy.value - 26) / lineLength;
    return [0, currentPos, 1];
  });

  const animatedKnobStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: knobCy.value - 149 }],
    shadowColor: activeColorMid.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: activeColorMid.value,
  }));

  const animatedTextProps = useAnimatedProps<TextInputProps>(() => {
    let lbs = Math.round(MAX_WEIGHT - ((knobCy.value - MIN_Y) / TOTAL_RANGE) * MAX_WEIGHT);
    lbs = Math.max(0, lbs);
    return {
      text: `${lbs}`,
      defaultValue: `${lbs}`,
    } as unknown as TextInputProps; 
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.screen}>
        <View style={styles.container}>
          
          <Canvas style={StyleSheet.absoluteFill}>
            <Group transform={[{ translateX: -20 }]}>
              <Path path={curveGlow} style="stroke" strokeWidth={10} color={activeColorLight}>
                <BlurMask blur={10} style="normal" />
              </Path>
            </Group>
            
            <Group transform={[{ translateX: -10 }]}>
              <Path path={curveGlow} style="stroke" strokeWidth={5} color={activeColorMid}>
                <BlurMask blur={10} style="normal" />
              </Path>
            </Group>

            <Group transform={[{ translateX: -4 }]}>
              <Path path={curveGlow} style="stroke" strokeWidth={4} color={activeColorCore}>
                <BlurMask blur={6} style="normal" />
              </Path>
            </Group>

            <Path path={fullLine} style="stroke" strokeWidth={1.4}>
              <LinearGradient 
                start={vec(185, 26)} 
                end={vec(185, 320)} 
                colors={lineGradientColors} 
                positions={lineGradientPositions} 
              />
            </Path>
          </Canvas>

          <Text style={[styles.num, { top: 58 }]}>30</Text>
          <Text style={[styles.num, { top: 99 }]}>24</Text>
          <Text style={[styles.num, { top: 140 }]}>18</Text>
          <Text style={[styles.num, { top: 181 }]}>12</Text>
          <Text style={[styles.num, { top: 222 }]}>6</Text>
          <Text style={[styles.num, { top: 263 }]}>0</Text>

          <Text style={styles.lbs}>lbs</Text>
          
          <AnimatedTextInput 
            editable={false} 
            animatedProps={animatedTextProps} 
            style={[styles.value, animatedTextStyle]} 
          />

          <Animated.View style={[styles.knobBase, animatedKnobStyle]}>
            <View style={styles.knobInner}>
              <WeightUpIcon width={12} height={12} color="#898789" />
              <WeightDownIcon width={12} height={12} color="#898789" />
            </View>
          </Animated.View>

        </View>
      </View>
    </GestureDetector>
  );
}