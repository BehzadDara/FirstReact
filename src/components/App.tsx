import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header.tsx';
import Home from './Home/Home.tsx';
import TaskDetails from './TaskDetails/TaskDetails.tsx';
import About from './About.tsx';
import NotFound from './NotFound.tsx';
import Counter from './Counter.tsx';
import Timer from './Timer.tsx';
import Calculation from './Calculation.tsx';
import ColorGenerator from './ColorGenerator.tsx';
import ColorPicker from './ColorPicker.tsx';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/calculation" element={<Calculation />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/colorGenerator" element={<ColorGenerator />} />
        <Route path="/colorPicker" element={<ColorPicker />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
