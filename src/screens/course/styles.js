import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  header: {
    color: 'red',
    fontSize: 30,
    marginTop: 20,
  },
  courseName: {
    fontSize: 30,
    color: '#83b925',
    alignSelf: 'center',
    marginTop: 10,
  },
  image: {
    height: 120,
    width: 200,
    marginTop: 30,
  },
  course: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'transparent',
  }
});

export default styles;
