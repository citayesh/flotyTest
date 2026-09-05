import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20, 
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  card: { 
    padding: 24, 
    backgroundColor: '#ffffff', 
    borderRadius: 12, 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 15,
  },
  cardText: { 
    fontSize: 18, 
    fontWeight: '600', 
    textAlign: 'center',
    color: '#333'
  },
  logout:{
    position:'absolute',
    bottom:60,
    width:'100%',
    right:22,
    padding:20,
  }
});