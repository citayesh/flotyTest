import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withTiming,
  withSpring,
  withSequence,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Canvas, Circle, Group, Paint, Blur, ColorMatrix } from '@shopify/react-native-skia';

import { 
  styles, 
  AVATAR_SIZE, 
  SECONDARY_CIRCLE_SIZE, 
  DISTANCE, 
  BLUR_PADDING, 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT 
} from './styles';

//Icons ../../components/icons/Readme.md 
import ArrowRightIcon from '../../components/icons/ArrowRightIcon';
import ArrowLeftIcon from '../../components/icons/ArrowLeftIcon';


interface AvatarItemProps {
  imageUri: string;
  balance: number;
  direction: 'left' | 'right';
  isLightBadge?: boolean;
  isActive: boolean;
  isOtherActive: boolean;
  receivedAmount: number;
  onTransferComplete: (amount: number) => void;
}

function AvatarItem({
  imageUri,
  balance,
  direction,
  isLightBadge,
  isActive,
  isOtherActive,
  receivedAmount,
  onTransferComplete,
}: AvatarItemProps) {
  const isExpandingRight = direction === 'right';
  
  const isPressed = useSharedValue(false);
  const dragX = useSharedValue(0);
  const startX = useSharedValue(0);
  const transferAmountSV = useSharedValue(0);
  const impactX = useSharedValue(0);

  const [liveCount, setLiveCount] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCounter = () => {
    if (balance <= 0) return;

    transferAmountSV.value = -1;
    setLiveCount(-1);
    
    intervalRef.current = setInterval(() => {
      setLiveCount((prev) => {
        const current = prev === null ? -1 : prev;
        const next = current - 1;
        const limit = Math.max(-60, -balance);
        
        if (next <= limit) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          transferAmountSV.value = limit;
          return limit;
        }
        
        transferAmountSV.value = next;
        return next;
      });
    }, 30);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopCounter();
  }, []);

  useEffect(() => {
    const target = isExpandingRight ? DISTANCE : -DISTANCE;
    if (isActive) {
      dragX.value = withTiming(target, { duration: 350 });
    } else {
      dragX.value = 0; 
    }
  }, [isActive]);

  useEffect(() => {
    if (isOtherActive) {
      const bumpDistance = isExpandingRight ? -12 : 12;
      impactX.value = withSequence(
        withTiming(bumpDistance, { duration: 30 }),
        withSpring(0, { damping: 14, stiffness: 200 })
      );
    }
  }, [isOtherActive, isExpandingRight]);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      if (balance > 0 && !isActive && !isOtherActive) {
        isPressed.value = true;
        runOnJS(startCounter)();
      }
    })
    .onStart(() => {
      if (!isPressed.value) return;
      startX.value = dragX.value;
    })
    .onUpdate((e) => {
      if (!isPressed.value) return;
      const current = startX.value + e.translationX;
      if (isExpandingRight) {
        dragX.value = Math.max(0, Math.min(current, DISTANCE));
      } else {
        dragX.value = Math.min(0, Math.max(current, -DISTANCE));
      }
    })
    .onEnd((e) => {
      if (!isPressed.value) return;
      const target = isExpandingRight ? DISTANCE : -DISTANCE;
      const threshold = DISTANCE * 0.3;

      let shouldMove = false;
      if (isExpandingRight) {
        shouldMove = dragX.value > threshold || e.velocityX > 200;
      } else {
        shouldMove = dragX.value < -threshold || e.velocityX < -200;
      }

      if (shouldMove && transferAmountSV.value < 0) {
        dragX.value = withTiming(target, { duration: 250 });
        runOnJS(onTransferComplete)(Math.abs(transferAmountSV.value));
      } else {
        dragX.value = withTiming(0, { duration: 250 });
      }
    })
    .onFinalize(() => {
      isPressed.value = false;
      runOnJS(stopCounter)();
    });

  const skiaMainCx = isExpandingRight 
    ? BLUR_PADDING + AVATAR_SIZE / 2 
    : CANVAS_WIDTH - BLUR_PADDING - AVATAR_SIZE / 2;
  const skiaCy = CANVAS_HEIGHT / 2;
  
  const skiaAnimatedMainCx = useDerivedValue(() => skiaMainCx + impactX.value);
  const skiaAnimatedSecondaryCx = useDerivedValue(() => skiaAnimatedMainCx.value + dragX.value);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: impactX.value }]
  }));

  const animatedImageStyle = useAnimatedStyle(() => {
    const showInner = isPressed.value || isActive || isOtherActive;
    const size = withTiming(showInner ? 85 : AVATAR_SIZE, { duration: 200 });
    return {
      width: size,
      height: size,
      borderRadius: 9999,
    };
  });

  const animatedBadgeStyle = useAnimatedStyle(() => {
    const showBadge = isOtherActive || (isPressed.value && !isActive);
    return {
      opacity: withTiming(showBadge ? 1 : 0, { duration: 200 }),
      transform: [{ translateY: withTiming(showBadge ? 0 : -10, { duration: 200 }) }]
    };
  });

  const animatedIconWrapperStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: dragX.value }]
  }));

  const animatedContentStyle = useAnimatedStyle(() => {
    const progress = Math.abs(dragX.value) / (DISTANCE * 0.5);
    return {
      opacity: interpolate(progress, [0.2, 0.8], [0, 1], Extrapolation.CLAMP),
      transform: [{ scale: interpolate(progress, [0.2, 0.8], [0.5, 1], Extrapolation.CLAMP) }]
    };
  });

  let badgeDisplay = '';
  if (isOtherActive) badgeDisplay = `+${receivedAmount}`; 
  else if (liveCount !== null) badgeDisplay = `${liveCount}`; 

  return (
    <View style={styles.itemWrapper}>
      <Canvas 
        style={[
          styles.skiaCanvas,
          isExpandingRight ? { left: -BLUR_PADDING } : { right: -BLUR_PADDING }
        ]}
        pointerEvents="none"
      >
        <Group layer={
          <Paint>
            <Blur blur={12} />
            <ColorMatrix
              matrix={[
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 30, -12, 
              ]}
            />
          </Paint>
        }>
          <Circle cx={skiaAnimatedMainCx} cy={skiaCy} r={AVATAR_SIZE / 2} color="black" />
          <Circle cx={skiaAnimatedSecondaryCx} cy={skiaCy} r={SECONDARY_CIRCLE_SIZE / 2} color="black" />
        </Group>
      </Canvas>

      <Animated.View style={[styles.badgeContainer, animatedBadgeStyle]}>
        <Text style={styles.badgeBaseText}>${balance}</Text>
        <View style={[styles.badgeChangeWrapper, { backgroundColor: isLightBadge ? '#FFFFFF' : '#333333' }]}>
          <Text style={[styles.badgeChangeText, { color: isLightBadge ? '#000000' : '#FFFFFF' }]}>
            {badgeDisplay}
          </Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.floatingIconWrapper, animatedIconWrapperStyle]} pointerEvents="none">
        <Animated.View 
          style={[
            styles.hiddenContent, 
            animatedContentStyle,
            isExpandingRight ? { paddingLeft: 8 } : { paddingRight: 8 }
          ]}
        >
          {isExpandingRight ? (
            <><View style={styles.innerDot} /><ArrowRightIcon width={16} height={16} color="#FFF" /></>
          ) : (
            <><ArrowLeftIcon width={16} height={16} color="#FFF" /><View style={styles.innerDot} /></>
          )}
        </Animated.View>
      </Animated.View>

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.mainAvatarContainer, animatedContainerStyle]}>
          <Animated.Image
            source={{ uri: imageUri }}
            style={animatedImageStyle}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export default function Test2() {
  const [activeSide, setActiveSide] = useState<'left' | 'right' | null>(null);
  const [leftBalance, setLeftBalance] = useState(200);
  const [rightBalance, setRightBalance] = useState(200);
  const [transferAmount, setTransferAmount] = useState(0);

  useEffect(() => {
    if (activeSide !== null) {
      const timer = setTimeout(() => {
        setActiveSide(null);
        setTransferAmount(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeSide]);

  const handleTransfer = (source: 'left' | 'right', amount: number) => {
    setTransferAmount(amount);
    setActiveSide(source);

    if (source === 'left') {
      setLeftBalance((prev) => prev - amount);
      setRightBalance((prev) => prev + amount);
    } else {
      setRightBalance((prev) => prev - amount);
      setLeftBalance((prev) => prev + amount);
    }
  };

  return (
    <GestureHandlerRootView style={styles.screen}>
      <View style={styles.gridOverlay} pointerEvents="none" />
      <View style={styles.row}>
        <AvatarItem
          imageUri="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
          balance={leftBalance}
          direction="right"
          isActive={activeSide === 'left'}
          isOtherActive={activeSide === 'right'}
          receivedAmount={transferAmount}
          onTransferComplete={(amount) => handleTransfer('left', amount)}
        />
        <AvatarItem
          imageUri="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
          balance={rightBalance}
          direction="left"
          isLightBadge={true}
          isActive={activeSide === 'right'}
          isOtherActive={activeSide === 'left'}
          receivedAmount={transferAmount}
          onTransferComplete={(amount) => handleTransfer('right', amount)}
        />
      </View>
    </GestureHandlerRootView>
  );
}