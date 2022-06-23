import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal } from "react-native";
import styles from "./styles";
import HoverableView from "../../compoments/HoverableView";
import { useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineRead } from "react-icons/ai";
import { supabase } from "../../supabaseClient";

export default function Lesson(props) {
  const [subjectNames, setSubjectNames] = useState([]);
  const [lessonNames, setLessontNames] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [lessonId, setLessonId] = useState(0);
  const [lessonName, setLessonName] = useState(null);

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
      {lessonNames.map((lesson, index) => (
        <View key={index}>
          <HoverableView onHover={{ backgroundColor: '#F8F6E9' }}>
            {renderLessonTitleGroup(lesson.name, lesson.id)}
            <View style={styles.lessonContent}>
              <ScrollView horizontal={true}>
              {renderLessonContent(lesson.id)}
              </ScrollView>
            </View>
          </HoverableView>
        </View>
      ))}
      {renderSpecificLessonModal(lessonId, lessonName)}
    </View>
  );

  function renderHeader (courseName) {
    return (
      <View>
        <Text style={styles.header}>{courseName}</Text>
        <AiFillHome
          onClick={goToCourseScreen}
          style={{fontSize: 25, color: '#547618', position: 'absolute', paddingTop: 15, paddingLeft: 10}}
        />
      </View>
    )
  };

  function handlePressButton (lessonId, lessonName) {
    setModalVisible(true);
    setLessonId(lessonId);
    setLessonName(lessonName);
  }

  function renderLessonTitleGroup (lessonName, lessonId) {
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
              style={[styles.lessonSubButton, styles.lessonDocumentButton, {flexDirection: 'row'}]}
            >
              <Text>Document</Text>
              <AiOutlineRead style={{paddingLeft: 4}}/>
            </TouchableOpacity>
          </HoverableView>

          <HoverableView onHover={{ backgroundColor: '#D6D6D6' }}>
            <TouchableOpacity
              style={[styles.lessonSubButton, styles.lessonShowAllButton]}
              onPress={() => handlePressButton(lessonId, lessonName)}
            >
              <Text>Show all</Text>
            </TouchableOpacity>
          </HoverableView>
        </View>
      </View>
    )
  };

  function renderSpecificLessonModal (lessonId, lessonName) {
    return (
      <Modal
        onRequestClose={() => setModalVisible(false)}
        visible={modalVisible}
        animationType={"slide"}
      >
        <View style={styles.modalView}>
          <View>
            <Text style={styles.lessonTitleModal}>{lessonName}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close [X]</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.lessonContentModal}>
            {renderLessonContent(lessonId)}
          </View>
        </View>
      </Modal>
    )
  }

  function renderLessonContent (lessonId) {
    return (
      <>
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
      </>
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
        style={[styles.subjectBottomButton, styles.showDocButton, {flexDirection: 'row'}]}
        onPress={() => onShowContent(documentLink)}
      >
        <Text style={styles.subjectBottomButtonText}>Document</Text>
        <AiOutlineRead style={{color: '#FFFFFF', paddingLeft: 4}}/>
      </TouchableOpacity>
    )
  };
}