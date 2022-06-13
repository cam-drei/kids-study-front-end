import React, {useState} from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal } from "react-native";
import styles from "./style";
import HoverableView from "../../compoments/HoverableView";

export default function Lesson() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lessons</Text>
      <View>
        <HoverableView onHover={{ backgroundColor: '#F8F6E9' }}>
          <Text style={styles.lessonName}>Lesson 1</Text>
          <View style={styles.lessonGroup}>
            <ScrollView horizontal={true}>
              <HoverableView onHover={{ backgroundColor: '#EAF8E9' }}>
                <TouchableOpacity
                  style={styles.subjectGroup}
                  onPress={() => setIsVisible(true)}>
                  <Image
                    style={styles.image}
                    source={'image/penguin.jpeg'}
                  />
                  <View style={styles.subjectDiscription}>
                    <TouchableOpacity style={styles.doneButton}>
                      <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.subjectName}>Reading</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                <Modal
                  onRequestClose={() => setIsVisible(false)}
                  visible={isVisible}
                  animationType={"slide"}
                >
                  <View style={styles.modalView}>
                    <iframe width="350" height="300" 
                      title="reading"
                      src="https://www.youtube.com/embed/e_04ZrNroTo">
                    </iframe>
                    <Text style={styles.subjectName}>Reading</Text>
                    <TouchableOpacity style={styles.doneButton} onPress={() => setIsVisible(false)}>
                      <Text style={styles.doneText}>Close Video</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </HoverableView>
              
              <HoverableView onHover={{ backgroundColor: '#EAF8E9' }}>
                <TouchableOpacity
                  style={styles.subjectGroup}
                  onPress={() => alert('Pressed!')}>
                  <Image
                    style={styles.image}
                    source={'image/penguin.jpeg'}
                  />
                  <View style={styles.subjectDiscription}>
                    {/* <TouchableOpacity style={styles.doneButton}>
                      <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity>
                      <Text style={styles.subjectName}>Reading</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </HoverableView>

              <HoverableView onHover={{ backgroundColor: '#EAF8E9' }}>
                <TouchableOpacity
                  style={styles.subjectGroup}
                  onPress={() => alert('Pressed!')}>
                  <Image
                    style={styles.image}
                    source={'image/penguin.jpeg'}
                  />
                  <View style={styles.subjectDiscription}>
                    {/* <TouchableOpacity style={styles.doneButton}>
                      <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity>
                      <Text style={styles.subjectName}>Reading</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </HoverableView>
            </ScrollView>
          </View>
        </HoverableView>

        <HoverableView onHover={{ backgroundColor: '#F8F6E9' }}>
          <View>
            <Text style={styles.lessonName}>Lesson 2</Text>
            <View style={styles.lessonGroup}>
              <ScrollView horizontal={true}>
                <HoverableView onHover={{ backgroundColor: '#EAF8E9' }}>
                  <TouchableOpacity
                    style={styles.subjectGroup}
                    onPress={() => alert('Pressed!')}>
                    <Image
                      style={styles.image}
                      source={'image/penguin.jpeg'}
                    />
                    <View style={styles.subjectDiscription}>
                      {/* <TouchableOpacity style={styles.doneButton}>
                        <Text style={styles.doneText}>Done</Text>
                      </TouchableOpacity> */}
                      <TouchableOpacity>
                        <Text style={styles.subjectName}>Reading</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </HoverableView>
              </ScrollView>
            </View>
          </View>
        </HoverableView>

        <HoverableView onHover={{ backgroundColor: '#F8F6E9' }}>
          <View>
            <Text style={styles.lessonName}>Lesson 2</Text>
            <View style={styles.lessonGroup}>
              <ScrollView horizontal={true}>
                <HoverableView onHover={{ backgroundColor: '#EAF8E9' }}>
                  <TouchableOpacity
                    style={styles.subjectGroup}
                    onPress={() => alert('Pressed!')}>
                    <Image
                      style={styles.image}
                      source={'image/penguin.jpeg'}
                    />
                    <View style={styles.subjectDiscription}>
                      {/* <TouchableOpacity style={styles.doneButton}>
                        <Text style={styles.doneText}>Done</Text>
                      </TouchableOpacity> */}
                      <TouchableOpacity>
                        <Text style={styles.subjectName}>Reading</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </HoverableView>
              </ScrollView>
            </View>
          </View>
        </HoverableView>

        <HoverableView onHover={{ backgroundColor: '#F8F6E9' }}>
          <View>
            <Text style={styles.lessonName}>Lesson 2</Text>
            <View style={styles.lessonGroup}>
              <ScrollView horizontal={true}>
                <HoverableView onHover={{ backgroundColor: '#EAF8E9' }}>
                  <TouchableOpacity
                    style={styles.subjectGroup}
                    onPress={() => alert('Pressed!')}>
                    <Image
                      style={styles.image}
                      source={'image/penguin.jpeg'}
                    />
                    <View style={styles.subjectDiscription}>
                      {/* <TouchableOpacity style={styles.doneButton}>
                        <Text style={styles.doneText}>Done</Text>
                      </TouchableOpacity> */}
                      <TouchableOpacity>
                        <Text style={styles.subjectName}>Reading</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </HoverableView>
              </ScrollView>
            </View>
          </View>
        </HoverableView>
      </View>
    </View>
  )
}