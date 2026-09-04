import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  screen: {
    flex: 1,
     backgroundColor: "#191719",
     justifyContent: "center",
     alignItems: "center" 
    },
  container: {
    width: 400,
     height: 320,
     position: "relative" 
    },
  num: {
    position: "absolute",
     left: 139,
     width: 25,
     color: "#3B393B",
     fontSize: 12,
     textAlign: "right",
     includeFontPadding: false 
    },
  lbs: {
    position: "absolute",
     left: 137,
     top: 285,
     color: "#AAA7AA",
     fontSize: 14 
    },
  value: {
    position: "absolute",
     left: 231,
     top: 118,
     fontSize: 57,
     fontWeight: "300",
     letterSpacing: -2,
     includeFontPadding: false 
    },
  knobBase: {
    position: "absolute",
    left: 175,
    top: 121,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(239,255,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    },
  knobInner: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    },
  arrowIcon: {
    color: "#898789",
     fontSize: 12,
     lineHeight: 14 
    },

});