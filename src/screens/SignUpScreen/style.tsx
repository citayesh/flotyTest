import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    paddingTop:80,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    fontSize: 16,
    color: '#333333',
  },
  phoneDisplay: {
    fontSize: 15,
    color: '#555555',
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
  linkContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    color: 'gray',
    fontWeight: '600',
    fontSize: 15,
  },
});