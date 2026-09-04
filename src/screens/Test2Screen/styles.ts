// src/pages/Test2/styles.ts
import { StyleSheet } from 'react-native';

export const AVATAR_SIZE = 100;
export const SECONDARY_CIRCLE_SIZE = 65; 
export const GAP = 120;
export const DISTANCE = AVATAR_SIZE + GAP;

export const BLUR_PADDING = 30;
export const CANVAS_WIDTH = AVATAR_SIZE + DISTANCE + BLUR_PADDING * 2;
export const CANVAS_HEIGHT = AVATAR_SIZE + BLUR_PADDING * 2;

export const styles = StyleSheet.create({
  screen: { 
  flex: 1,
  backgroundColor: '#E6E6E6',
  justifyContent: 'center',
  alignItems: 'center'
    },
  gridOverlay: {
     opacity: 0.05 
  },
  row: {
     flexDirection: 'row',
     gap: GAP,
     zIndex: 10 },
  itemWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: AVATAR_SIZE,
    width: AVATAR_SIZE
  },
  skiaCanvas: {
    position: 'absolute',
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    top: -BLUR_PADDING,
    zIndex: 1,
  },
  mainAvatarContainer: {
    width: AVATAR_SIZE,
     height: AVATAR_SIZE,
     borderRadius: AVATAR_SIZE / 2,
    alignItems: 'center',
     justifyContent: 'center',
     zIndex: 4,
     elevation: 4,
     backgroundColor: 'transparent'
  },
  floatingIconWrapper: {
    position: 'absolute',
     width: SECONDARY_CIRCLE_SIZE,
     height: SECONDARY_CIRCLE_SIZE,
     borderRadius: SECONDARY_CIRCLE_SIZE / 2,
     justifyContent: 'center',
     alignItems: 'center',
     zIndex: 3,
     elevation: 3
  },
  hiddenContent: {
     flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6 
  },
  innerDot: {
     width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: '#FFFFFF'
  },
  badgeContainer: {
    position: 'absolute',
     top: AVATAR_SIZE + 8,
     backgroundColor: '#111111',
     flexDirection: 'row',
     alignItems: 'center',
     paddingVertical: 4,
     paddingLeft: 12,
     paddingRight: 4,
     borderRadius: 30,
     zIndex: 5 
  },
  badgeBaseText: {
     color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
      marginRight: 6 
  },
  badgeChangeWrapper: {
     paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 20
  },
  badgeChangeText: {
     fontSize: 12,
      fontWeight: '700'
  },

});