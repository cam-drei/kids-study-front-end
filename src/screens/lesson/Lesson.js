import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "./styles";
import HoverableView from "../../compoments/HoverableView";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { supabase } from "../../supabaseClient";

export default function Lesson() {
  const [subjectNames, setSubjectNames] = useState([]);
  const [lessonNames, setLessontNames] = useState([]);

  let navigate = useNavigate();
  const goToCourseScreen = () => {
    navigate("/");
  };

  const displayVideo = () => {
    window.open('https://photos.google.com/share/AF1QipPGtp7gLHmZY8O2JkSfosjMttVzoKX0C1hXcJpg7xc8GEsvQcM9_83jQpD-OSEs4w/photo/AF1QipNRJ7Iuecr7XlNwSoudG74JLBxN_b0oqaXmv-9t?key=TFB0VVBuVkh2ak9ybXdCUWlfOGU0MFhTVVZscWRn', '_blank');
  }

  const getSubjectNames = async () => {
    const { data, error } = await supabase
      .from('subjects')
      .select('name')

    if(error) {
      throw new Error(error.message)
    }
    if(!data) {
      throw new Error("Course not found")
    }
    setSubjectNames(data);
  }
  
  useEffect(() => {
    getSubjectNames();
  }, []);

  const getLessonNames = async () => {
    const { data, error } = await supabase
      .from('lessons')
      .select('name')

    if(error) {
      throw new Error(error.message)
    }
    if(!data) {
      throw new Error("Course not found")
    }
    setLessontNames(data);
  }

  useEffect(() => {
    getLessonNames();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{'Course Name'}</Text>
      <AiFillHome
        onClick={goToCourseScreen}
        style={{fontSize: 25, color: '#547618', position: 'absolute', paddingTop: 28, paddingLeft: 10}}
      />
      
      <View>
        {lessonNames.map((value, index) => (
          <View key={index}>
            <HoverableView onHover={{ backgroundColor: '#F8F6E9' }}>
              <Text style={styles.lessonName}>{value.name}</Text>
              <View style={styles.lessonGroup}>
                <ScrollView horizontal={true}>
                {subjectNames.map((value, index) => (
                  <View key={index}>
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
                            <Text style={styles.subjectName}>{value.name}</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    </HoverableView>
                  </View>
                  ))}

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
          </View>
        ))}
      </View>
    </View>
  )
}