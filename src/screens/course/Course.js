import React from "react";
import { View, Text, TouchableOpacity, Image} from "react-native";
import styles from "./style";
import HoverableView from "../../compoments/HoverableView";
import { useNavigate } from "react-router-dom";

export default function Course() {
  let navigate = useNavigate();
  
  const goToLessonScreen = () => {
    navigate("/lesson");
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Study Courses</Text>

      <HoverableView
        style={styles.course}
        onHover={{ backgroundColor: '#F8F6E9' }}
      >
        <TouchableOpacity onPress={goToLessonScreen}>
          <Image
            style={styles.image}
            source={'image/book.jpeg'}
          />
          <Text style={styles.courseName}>Abeka</Text>
        </TouchableOpacity>
      </HoverableView>

      <HoverableView
        style={styles.course}
        onHover={{ backgroundColor: '#F8F6E9' }}
      >
        <TouchableOpacity onPress={() => alert('Pressed!')}>
          <Image
            style={styles.image}
            source={'image/book.jpeg'}
          />
          <Text style={styles.courseName}>Abeka</Text>
        </TouchableOpacity>
      </HoverableView>
      
      <HoverableView
        style={styles.course}
        onHover={{ backgroundColor: '#F8F6E9' }}
      >
        <TouchableOpacity onPress={() => alert('Pressed!')}>
          <Image
            style={styles.image}
            source={'image/color-pencil.webp'}
          />
          <Text style={styles.courseName}>Academy</Text>
        </TouchableOpacity>
      </HoverableView>

      <HoverableView
        style={styles.course}
        onHover={{ backgroundColor: '#F8F6E9' }}
      >
        <TouchableOpacity onPress={() => alert('Pressed!')}>
          <Image
            style={styles.image}
            source={'image/color-pencil.webp'}
          />
          <Text style={styles.courseName}>Academy</Text>
        </TouchableOpacity>
      </HoverableView>

    </View>
  )
}