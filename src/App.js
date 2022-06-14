import React from 'react';
import Course from './screens/course/Course';
import Lesson from './screens/lesson/Lesson';
import Subject from './screens/subject/Subject';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Course />}>
          {/* <Route path="lesson" element={<Lesson />} /> */}
        </Route>
        <Route path="lesson" element={<Lesson />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
