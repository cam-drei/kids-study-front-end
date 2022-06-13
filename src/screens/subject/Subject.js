import React, {useState} from "react";
import { View, Text, Modal, Button} from "react-native";
import styles from "./style";

export default function Subject() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>

      <Button onPress={() => setIsVisible(true)} title={`Show Modal`} />
      <Modal
        onRequestClose={() => setIsVisible(false)}
        visible={isVisible}
      >
        <View style={styles.container}>
          <iframe width="350" height="300" 
            title="reading"
            src="https://www.youtube.com/embed/e_04ZrNroTo">
          </iframe>
          <Text>Reading</Text>
          <Button onPress={() => setIsVisible(false)} title={'Close Modal'} />
        </View>
      </Modal>
    </View>
  )
}