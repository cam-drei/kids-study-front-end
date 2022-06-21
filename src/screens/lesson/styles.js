import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  header: {
    color: "#FF0000",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    alignSelf: "center",
  },
  lessonName: {
    fontSize: 30,
    alignSelf: "left",
    marginTop: 10,
    marginLeft: 10,
  },
  lessonGroup: {
    width: "98%",
    height: 170,
    borderColor: "#83b925",
    borderWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 50,
    width: 80,
  },
  subjectGroup: {
    width: 150,
    height: 150,
    borderColor: "#83b925",
    borderWidth: 1,
    alignItems: "center",
    margin: 5,
  },
  subjectDiscription: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  subjectName: {
    fontSize: 15,
    width: 140,
    position: "absolute",
    top: 2,
  },
  subjectBottomButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 20,
    margin: 1,
  },
  doneButton: {
    backgroundColor: "#FF9900",
    flex: 1,
  },
  showDocButton: {
    backgroundColor: "#83b925",
    flex: 2,
  },
  subjectBottomButtonText: {
    color: "#FFFFFF",
  },
  subjectBottomButtonGroup: {
    flexDirection: "row",
    width: 146,
    bottom: 1,
    position: "absolute",
  },
});

export default styles;
