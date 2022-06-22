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

  const onShowContent = (urlContent) => {
    window.open(`${urlContent}`, '_blank');
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
  }, []);

  return (
    <View style={styles.container}>
      {renderHeader(props.courseName)}
      <View>
        {lessonNames.map((lesson, index) => (
          <View key={index}>
            <HoverableView onHover={{ backgroundColor: '#F8F6E9' }}>
              {renderLessonTitleGroup(lesson.name)}
              {renderLessonContent(lesson.id)}
            </HoverableView>
          </View>
        ))}
      </View>
    </View>
  );

  function renderHeader (courseName) {
    return (
      <View>
        <Text style={styles.header}>{courseName}</Text>
        <AiFillHome
          onClick={goToCourseScreen}
          style={{fontSize: 25, color: '#547618', position: 'absolute', paddingTop: 28, paddingLeft: 10}}
        />
      </View>
    )
  };

  function renderLessonTitleGroup (lessonName) {
    return (
      <View>
        <Text style={styles.lessonName}>{lessonName}</Text>

        <View style={styles.lessonButtonGroup}>
          <HoverableView onHover={{ backgroundColor: '#D6D6D6' }}>
            <TouchableOpacity
              style={[styles.lessonSubButton, styles.lessonDoneButton]}
            >
                <Text>Click for Done</Text>
            </TouchableOpacity>
          </HoverableView>

          <HoverableView onHover={{ backgroundColor: '#D6D6D6' }}>
            <TouchableOpacity
              style={[styles.lessonSubButton, styles.lessonDocumentButton]}
            >
              <Text>Document</Text>
            </TouchableOpacity>
          </HoverableView>

          <HoverableView onHover={{ backgroundColor: '#D6D6D6' }}>
            <TouchableOpacity
              style={[styles.lessonSubButton, styles.lessonShowAllButton]}
            >
              <Text>Show all</Text>
            </TouchableOpacity>
          </HoverableView>
        </View>
      </View>
    )
  };

  function renderLessonContent (lessonId) {
    return (
      <View style={styles.lessonContent}>
        <ScrollView horizontal={true}>
          {subjectNames.map((subject, index) => (
            <View key={index}>
              {lessonId === subject.lesson_id ?
                <HoverableView onHover={{ backgroundColor: '#EAF8E9' }}>
                  <TouchableOpacity
                    style={styles.subjectGroup}
                    onPress={() => subject.video_link !== null ? onShowContent(subject.video_link) : null}
                  >
                    <TouchableOpacity style={styles.subjectDiscription}>
                      <Text style={styles.subjectName}>{subject.name}</Text>
                    </TouchableOpacity>
                    <Image
                      style={styles.image}
                      source={'/image/happy-girl-writing.jpeg'}
                    />
                    <View style={styles.subjectBottomButtonGroup}>
                      {subject.done === true ? displayDoneButton() : null}
                      {subject.document_link !== null ? displayDocumentButton(subject.document_link) : null}
                    </View>
                  </TouchableOpacity>
                </HoverableView>
              : null}
            </View>
          ))}
        </ScrollView>
      </View>
    )
  };

  function displayDoneButton () {
    return (
      <TouchableOpacity style={[styles.subjectBottomButton, styles.doneButton]}>
        <Text style={styles.subjectBottomButtonText}>Done</Text>
      </TouchableOpacity>
    )
  };

  function displayDocumentButton (documentLink) {
    return (
      <TouchableOpacity
        style={[styles.subjectBottomButton, styles.showDocButton]}
        onPress={() => onShowContent(documentLink)}
      >
        <Text style={styles.subjectBottomButtonText}>Document</Text>
      </TouchableOpacity>
    )
  };
}