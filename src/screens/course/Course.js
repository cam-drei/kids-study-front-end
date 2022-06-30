import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Image} from "react-native";
import styles from "./styles";
import HoverableView from "../../compoments/HoverableView";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import * as _ from 'lodash';
import { slugify } from "../../compoments/Slugify";

export default function Course() {
  const [courseItems, setCourseItems] = useState([]);

  const getCourseItems = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('id, name')

    if(error) {
      throw new Error(error.message)
    }
    if(!data) {
      throw new Error("Course not found")
    }
    setCourseItems(data);
  };

  useEffect(() => {
   getCourseItems();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Study Courses</Text>
      {renderSortedCourseItems()}
    </View>
  );

  function renderSortedCourseItems () {
    const sortedCourseItems = _
      .chain(courseItems)
      .sortBy('name')
      .map((course, index) => (
        <View key={index}>
          <HoverableView
            style={styles.course}
            onHover={{ backgroundColor: '#F8F6E9' }}
          >
          <Link to={`/${slugify(course.name)}/lesson`}>
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
      ))
      .value();

    return sortedCourseItems;
  };
}