import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "./style";
import HoverableView from "../../compoments/HoverableView";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

export default function Lesson() {
  let navigate = useNavigate();
  const goToCourseScreen = () => {
    navigate("/");
  };

  const displayVideo = () => {
    window.open('https://photos.google.com/share/AF1QipPGtp7gLHmZY8O2JkSfosjMttVzoKX0C1hXcJpg7xc8GEsvQcM9_83jQpD-OSEs4w/photo/AF1QipNRJ7Iuecr7XlNwSoudG74JLBxN_b0oqaXmv-9t?key=TFB0VVBuVkh2ak9ybXdCUWlfOGU0MFhTVVZscWRn', '_blank');
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{'Course Name'}</Text>
      <AiFillHome 
        onClick={goToCourseScreen}
        style={{fontSize: 25, color: '#547618', position: 'absolute', paddingTop: 28, paddingLeft: 10}}
      />
      
      <View>
        <HoverableView onHover={{ backgroundColor: '#F8F6E9' }}>
          <Text style={styles.lessonName}>Lesson 1</Text>
          <View style={styles.lessonGroup}>
            <ScrollView horizontal={true}>
              <HoverableView onHover={{ backgroundColor: '#EAF8E9' }}>
                <TouchableOpacity
                  style={styles.subjectGroup}
                  onPress={displayVideo}
                  >
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