import React, {useState, useEffect} from 'react';
import Course from './screens/course/Course';
import Lesson from './screens/lesson/Lesson';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { supabase } from './supabaseClient';

function App() {
  const [courseNames, setCourseNames] = useState([]);

  const getCourseNames = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('name, id')

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Course />} />
        {courseNames.map((value, index) => (
          <Route 
            key={index} 
            path={`/${value.name}/lesson/`} 
            element={<Lesson courseId={value.id} courseName={value.name}/>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
