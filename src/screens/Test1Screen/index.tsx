import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, ImageSourcePropType } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
  useDerivedValue,
  SharedValue,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { styles } from './styles';

//Icons ../../components/icons/Readme.md 
import EarthIcon from '../../components/icons/EarthIcon';
import LightningIcon from '../../components/icons/LightningIcon';
import MenuBackgroundShape from '../../components/icons/MenuBackgroundShape';
import ResizeIcon from '../../components/icons/ResizeIcon';
import FolderIcon from '../../components/icons/FolderIcon';
import DownloadIcon from '../../components/icons/DownloadIcon';


const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const CENTER_IMAGES: ImageSourcePropType[] = [
  require('../../assets/images/1.jpeg'),
  require('../../assets/images/2.jpeg'),
  require('../../assets/images/3.jpeg'),
  require('../../assets/images/4.jpeg'),
  require('../../assets/images/5.jpeg'),
];

interface CircularImageItemProps {
  source: ImageSourcePropType;
  index: number;
  expandedIndex: SharedValue<number | null>;
}

const CircularImageItem: React.FC<CircularImageItemProps> = ({ source, index, expandedIndex }) => {
  const progress = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(SCREEN_HEIGHT); 

  useEffect(() => {
    translateY.value = withDelay(
      index * 150,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) })
    );
  }, [index, translateY]);

  const circleGesture = Gesture.Tap()
    .onBegin(() => {
      expandedIndex.value = index;
    })
    .onFinalize(() => {
      if (expandedIndex.value === index) {
        expandedIndex.value = null;
      }
    });

  useDerivedValue(() => {
    const isExpanded = expandedIndex.value === index;
    progress.value = withTiming(isExpanded ? 1 : 0, { duration: 150, easing: Easing.linear });
  });

  const animatedStyle = useAnimatedStyle(() => {
    const currentSize = 110 + progress.value * 80;
    return {
      width: currentSize,
      height: currentSize,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={circleGesture}>
      <Animated.View style={[styles.circularImageWrapper, animatedStyle]}>
        <Image source={source} style={styles.imageCover} resizeMode="cover" />
      </Animated.View>
    </GestureDetector>
  );
};

export default function Test1() {
  const expandedIndex = useSharedValue<number | null>(null);
  const spinVal = useSharedValue<number>(0);
  const pillProgress = useSharedValue<number>(0);
  const contentScale = useSharedValue<number>(0);
  const edgeMenuTranslateX = useSharedValue<number>(100); 
  const edgeMenuIconScale = useSharedValue<number>(0); 

  useEffect(() => {
    spinVal.value = 0;
    spinVal.value = withRepeat(
      withTiming(180, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    pillProgress.value = withDelay(300, withTiming(1, { duration: 900, easing: Easing.out(Easing.exp) }));
    contentScale.value = withDelay(450, withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) }));
    edgeMenuTranslateX.value = withDelay(300, withTiming(0, { duration: 900, easing: Easing.out(Easing.exp) }));
    edgeMenuIconScale.value = withDelay(450, withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) }));
  }, []);

  const animatedEarthStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 4000 }, { rotateY: `${spinVal.value}deg` }],
  }));

  const animatedPillStyle = useAnimatedStyle(() => {
    const currentHeight = pillProgress.value * 165;
    const currentTop = 102.5 - (currentHeight / 2);
    return { height: currentHeight, top: currentTop };
  });

  const animatedPillContentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: contentScale.value }],
  }));

  const animatedRightEdgeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: edgeMenuTranslateX.value }],
  }));

  const animatedEdgeIconsStyle = useAnimatedStyle(() => ({
    transform: [{ scale: edgeMenuIconScale.value }],
  }));

  return (
      <View style={styles.container}>
        <View style={styles.gridOverlay} pointerEvents="none" />
        <View style={styles.leftColumn}>
          <Text style={styles.leftAlignText}>MONDAY{'\n'}01{'\n'}MAY</Text>
          
          <View style={styles.earthIconContainer}>
            <View style={styles.staticEarthLayer}>
              <EarthIcon width={40} height={40}/>
            </View>
            {/*its beter to use lottie for that but i dnt want to add another library
            */}
            <Animated.View style={[styles.animatedEarthLayer, animatedEarthStyle]}>
              <EarthIcon width={40} height={40}/>
            </Animated.View>
          </View>
          
          <Text style={styles.timeText}>9:PM</Text>
          <Text style={styles.leftAlignText}>PROJECT{'\n'}ASSIGNM{'\n'}ENT</Text>
        </View>

        <View style={styles.centerColumn}>
          {CENTER_IMAGES.map((uri, index) => (
            <CircularImageItem key={index} source={uri} index={index} expandedIndex={expandedIndex} />
          ))}
        </View>

        <Animated.View style={[styles.rightTopPill, animatedPillStyle]}>
          <Animated.View style={[styles.pillAvatarContainer, animatedPillContentStyle]}>
            <Image 
              source={require('../../assets/images/avatar.jpeg')}
              style={styles.pillAvatar} 
            />
          </Animated.View>

          <View style={styles.pillTextContainer} pointerEvents="none">
            <Text style={styles.pillName}>HI JACK</Text>
          </View>
          
          <Animated.View style={[styles.whiteCircleContainer, animatedPillContentStyle]}>
            <View style={styles.blackCircle}>
              <LightningIcon width={12} height={12} fill="#FFF" />
            </View>
          </Animated.View>
        </Animated.View>

        <Animated.View style={[styles.rightEdgeMenu, animatedRightEdgeStyle]}>
          <View>
            <MenuBackgroundShape />
          </View>

          <Animated.View style={[styles.menuIconsContainer, animatedEdgeIconsStyle]}>
            <ResizeIcon width={16} height={16} stroke="#FFF" />
            <FolderIcon width={18} height={18} stroke="#FFF" />
            <DownloadIcon width={18} height={18} stroke="#FFF" />
          </Animated.View>
        </Animated.View>

        <View style={styles.bottomBar}>
          <View style={styles.hamburger}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </View>
          <Text style={styles.exploreText}>EXPLORE</Text>
          <View style={styles.scrubber}>
            <View style={styles.scrubberLine} />
            <View style={styles.scrubberHandle} />
          </View>
          <Text style={styles.exploreText}>50 &gt;</Text>
        </View>
      </View>
  );
}