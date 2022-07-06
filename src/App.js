import React, {useState, useEffect} from 'react';
import Course from './screens/course/Course';
import Lesson from './screens/lesson/Lesson';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { slugify } from './compoments/Slugify';

function App() {
  const [courseItems, setCourseItems] = useState([]);

  const getCourseItems = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('name, id')

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
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Course />} />
        {courseItems.map((course, index) => (
          <Route 
            key={index} 
            path={`/${slugify(course.name)}/lesson/`} 
            element={<Lesson courseId={course.id} courseName={course.name}/>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
