import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "./styles";
import HoverableView from "../../compoments/HoverableView";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { supabase } from "../../supabaseClient";

export default function Lesson(props) {
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
      .select('*, lessons!inner(*)')

    if(error) {
      throw new Error(error.message)
    }
    if(!data) {
      throw new Error("Subjects not found")
    }
    setSubjectNames(data);
  }
  
  useEffect(() => {
    getSubjectNames();
  }, []);

  const getLessonNames = async () => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*, courses!inner(*)')
      .filter('courses.id', 'in', `(${props.courseId})`)

    if(error) {
      throw new Error(error.message)
    }
    if(!data) {
      throw new Error("Lessons not found")
    }
    setLessontNames(data);
  }

  useEffect(() => {
    getLessonNames();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{props.courseName}</Text>
      <AiFillHome
        onClick={goToCourseScreen}
        style={{fontSize: 25, color: '#547618', position: 'absolute', paddingTop: 28, paddingLeft: 10}}
      />
      
      <View>
        {lessonNames.map((lesson, index) => (
          <View key={index}>
            <HoverableView onHover={{ backgroundColor: '#F8F6E9' }}>
              <Text style={styles.lessonName}>{lesson.name}</Text>
              <View style={styles.lessonGroup}>
                <ScrollView horizontal={true}>
                  {subjectNames.map((subject, index) => (
                    <View key={index}>
                      {lesson.id === subject.lesson_id ?
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
                              {subject.done === true ? displayDoneButton() : null}
                              <TouchableOpacity>
                                <Text style={styles.subjectName}>{subject.name}</Text>
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity>
                        </HoverableView>
                      : null}
                    </View>
                  ))}
                </ScrollView>
              </View>
            </HoverableView>
          </View>
        ))}
      </View>
    </View>
  )

  function displayDoneButton () {
    return (
      <View>
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    )
  }
}