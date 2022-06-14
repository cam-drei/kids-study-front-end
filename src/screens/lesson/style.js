import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  header: {
    color: 'red',
    fontSize: 30,
    marginTop: 20,
    alignSelf: 'center',
  },
  lessonName: {
    fontSize: 30,
    alignSelf: 'left',
    marginTop: 10,
    marginLeft: 10,
    color: '#83b925'
  },
  lessonGroup: {
    width: '98%',
    height: 170,
    borderColor: '#83b925',
    borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 80,
    width: 80,
  },
  subjectGroup: {
    width: 150,
    height: 150,
    borderColor: '#83b925',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  subjectDiscription: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  subjectName: {
    fontSize: 15,
    padding: 5,
  },
  doneButton: {
    alignItems: "center",
    backgroundColor: "#D6D6D6",
    padding: 10,
    borderRadius: 5,
  },
  doneText: {
    color: '#808080',
  },
});

export default styles;
