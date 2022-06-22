import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Image} from "react-native";
import styles from "./styles";
import HoverableView from "../../compoments/HoverableView";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

export default function Course() {
  const [courseNames, setCourseNames] = useState([]);

  const getCourseNames = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('id, name')

    if(error) {
      throw new Error(error.message)
    }
    if(!data) {
      throw new Error("Course not found")
    }
    setCourseNames(data);
  }

  useEffect(() => {
   getCourseNames();
  }, [])
    
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Study Courses</Text>

      <View>
        {courseNames.map((course, index) => (
          <View key={index}>
            <HoverableView
              style={styles.course}
              onHover={{ backgroundColor: '#F8F6E9' }}
            >
            <Link to={`/${course.name}/lesson`}>
              <TouchableOpacity>
                <Image
                  style={styles.image}
                  source={'/image/book.jpeg'}
                />
                <Text style={styles.courseName}>{course.name}</Text>
              </TouchableOpacity>
            </Link>
            </HoverableView>
          </View>
        ))}
      </View>
    </View>
  )
}