import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.tsx';
import Home from './components/Home/Home.tsx';
import TaskDetails from './components/TaskDetails/TaskDetails.tsx';
import About from './components/About.tsx';
import NotFound from './components/NotFound.tsx';
import Counter from './components/Counter.tsx';
import Timer from './components/Timer.tsx';
import Calculation from './components/Calculation.tsx';
import ColorGenerator from './components/ColorGenerator.tsx';
import ColorPicker from './components/ColorPicker.tsx';
import ColorSpectrumGenerator from './components/ColorSpectrumGenerator.tsx';

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
        <Route path="/colorSpectrumGenerator" element={<ColorSpectrumGenerator />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

// eslint config in react
// create browser route
// route folder and has components
// profiler
// modals and drawers are not layout, are commons