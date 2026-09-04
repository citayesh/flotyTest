import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: { 
    padding: 24, 
    backgroundColor: '#ffffff', 
    borderRadius: 12, 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 15
  },
  cardText: { 
    fontSize: 18, 
    fontWeight: '600', 
    textAlign: 'center',
    color: '#333'
  }
});