import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal } from "react-native";
import styles from "./styles";
import HoverableView from "../../compoments/HoverableView";
import { useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineRead, AiOutlineVideoCamera } from "react-icons/ai";
import { supabase } from "../../supabaseClient";
import * as _ from 'lodash';

export default function Lesson(props) {
  const [subjectItems, setSubjectItems] = useState([]);
  const [lessonItems, setLessonItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [lessonId, setLessonId] = useState(0);
  const [lessonName, setLessonName] = useState(null);

  let navigate = useNavigate();
  const goToCourseScreen = () => {
    navigate("/");
  };

  const onShowContent = (urlContent) => {
    window.open(`${urlContent}`, '_blank');
  };

  const getSubjectItems = async () => {
    const { data, error } = await supabase
      .from('subjects')
      .select('*, lessons!inner(*)')

    if(error) {
      throw new Error(error.message)
    }
    if(!data) {
      throw new Error("Subjects not found")
    }
    setSubjectItems(data);
  };
  
  useEffect(() => {
    getSubjectItems();
  }, []);

  const getLessonItems = async () => {
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
    setLessonItems(data);
  };

  useEffect(() => {
    getLessonItems();
  }, []);

  return (
    <View style={styles.container}>
      {renderHeader(props.courseName)}
      {renderSortedLessonItems()}
      {renderSubjectItemsModal(lessonId, lessonName)}
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

  function renderSortedLessonItems () {
    const sortedLessonItems = _
      .chain(lessonItems)
      .sortBy('name')
      .map((lesson, index) => (
        <View key={index}>
          <HoverableView onHover={{ backgroundColor: '#F8F6E9' }}>
            {renderLessonTitleGroup(lesson.name, lesson.description, lesson.id, lesson.done, lesson.document_link, lesson.video_link)}
            <View style={styles.lessonContent}>
              <ScrollView horizontal={true}>
              {renderSortedSubjectItems(lesson.id)}
              </ScrollView>
            </View>
          </HoverableView>
        </View>
      ))
      .value();

    return sortedLessonItems;
  }

  function renderLessonTitleGroup (lessonName, lessonDescription, lessonId, lessonDone, lessonDocument, lessonVideo) {
    return (
      <View>
        <View style={styles.flexWrapOnRow}>
          <Text style={styles.lessonName}>{lessonName}</Text>
          {lessonDescription !== null ? <Text style={styles.lessonDescriptionText}>( {lessonDescription} )</Text> : null}
        </View>
        <View style={[styles.lessonButtonGroup, styles.flexWrapOnRow]}>
          {displayDoneLessonButton(lessonDone, lessonId)}
          {lessonDocument !== null ? displayDocumentLessonButton(lessonDocument) : null}
          {lessonVideo !== null ? displayVideoLessonButton(lessonVideo) : null}
          {displayShowAllLessonButton(lessonId, lessonName)}
        </View>
      </View>
    )
  };

  function renderSortedSubjectItems (lessonId) {
    const sortedSubjectItems = _
      .chain(subjectItems)
      .sortBy('name')
      .map((subject, index) => (
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
                  {subject.done === true ? displayDoneSubjectButton() : null}
                  {subject.document_link !== null ? displayDocumentSubjectButton(subject.document_link) : null}
                </View>
              </TouchableOpacity>
            </HoverableView>
          : null}
        </View>
      ))
      .value();

    return sortedSubjectItems;
  };

  function renderSubjectItemsModal (lessonId, lessonName) {
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
          <View style={styles.flexWrapOnRow}>
            {renderSortedSubjectItems(lessonId)}
          </View>
        </View>
      </Modal>
    )
  };

  function displayDoneLessonButton (lessonDone, lessonId) {
    return (
      <HoverableView onHover={{ backgroundColor: '#D6D6D6' }}>
        {lessonDone === true ?
          <TouchableOpacity
            style={[styles.lessonSubButton, styles.pressedLessonDoneButton]}
            onPress={() => updateLessonDoneToFalse(lessonId)}
          >
            <Text style={styles.subjectBottomButtonText}>Done</Text>
          </TouchableOpacity>
        :
          <TouchableOpacity
            style={[styles.lessonSubButton, styles.lessonDoneButton]}
            onPress={() => updateLessonDoneToTrue(lessonId)}
          >
            <Text>Click for Done</Text>
          </TouchableOpacity>
        }
      </HoverableView>
    )
  };

  async function updateLessonDoneToTrue (lessonId) {
    const { data, error } = await supabase
      .from('lessons')
      .update({ done: true })
      .match({ id: lessonId })

    if(error) {
      throw new Error(error.message)
    }
    if(!data) {
      throw new Error("Lessons not found")
    }
    getLessonItems();
  };

  async function updateLessonDoneToFalse (lessonId) {
    const { data, error } = await supabase
      .from('lessons')
      .update({ done: false })
      .match({ id: lessonId })

    if(error) {
      throw new Error(error.message)
    }
    if(!data) {
      throw new Error("Lessons not found")
    }
    getLessonItems();
  };

  function displayDocumentLessonButton (lessonDocument) {
    return (
      <HoverableView onHover={{ backgroundColor: '#D6D6D6' }}>
        <TouchableOpacity
          style={[styles.lessonSubButton, styles.lessonDocumentButton, {flexDirection: 'row'}]}
          onPress={() => onShowContent(lessonDocument)}
        >
          <Text>Document</Text>
          <AiOutlineRead style={{paddingLeft: 4}}/>
        </TouchableOpacity>
      </HoverableView>
    )
  };

  function displayVideoLessonButton (lessonVideo) {
    return (
      <HoverableView onHover={{ backgroundColor: '#D6D6D6' }}>
        <TouchableOpacity
          style={[styles.lessonSubButton, styles.lessonDocumentButton, {flexDirection: 'row'}]}
          onPress={() => onShowContent(lessonVideo)}
        >
          <Text>Video</Text>
          <AiOutlineVideoCamera style={{paddingLeft: 4}}/>
        </TouchableOpacity>
      </HoverableView>
    )
  };

  function displayShowAllLessonButton (lessonId, lessonName) {
    return (
      <HoverableView onHover={{ backgroundColor: '#D6D6D6' }}>
        <TouchableOpacity
          style={[styles.lessonSubButton, styles.lessonShowAllButton]}
          onPress={() => handlePressShowAllButton(lessonId, lessonName)}
        >
          <Text>Show all</Text>
        </TouchableOpacity>
      </HoverableView>
    )
  };

  function handlePressShowAllButton (lessonId, lessonName) {
    setModalVisible(true);
    setLessonId(lessonId);
    setLessonName(lessonName);
  };

  function displayDoneSubjectButton () {
    return (
      <TouchableOpacity style={[styles.subjectBottomButton, styles.doneButton]}>
        <Text style={styles.subjectBottomButtonText}>Done</Text>
      </TouchableOpacity>
    )
  };

  function displayDocumentSubjectButton (documentLink) {
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