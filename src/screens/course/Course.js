import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Image} from "react-native";
import styles from "./style";
import HoverableView from "../../compoments/HoverableView";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function Course() {
  const [courseNames, setCourseNames] = useState([]);

  let navigate = useNavigate();
  const GoToLessonScreen = () => {
    navigate("/lesson");
  };

  useEffect(() => {
    const GetCourseNames = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('name')
  
      if(error) {
        throw new Error(error.message)
      }
  
      if(!data) {
        throw new Error("Course not found")
      }
    
      setCourseNames(data);
      return data;
    }
    GetCourseNames();
  }, [])
    
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Study Courses</Text>
      
      <View >
        {courseNames.map((val, index) => (
          <View key={index}>
            <HoverableView
              style={styles.course}
              onHover={{ backgroundColor: '#F8F6E9' }}
            >
            <TouchableOpacity onPress={GoToLessonScreen}>
              <Image
                style={styles.image}
                source={'image/book.jpeg'}
              />
              <Text style={styles.courseName}>{val.name}</Text>
            </TouchableOpacity>
            </HoverableView>
          </View>
        ))}
      </View>
    </View>
  )
}