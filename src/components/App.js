import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home/Home';
import TaskDetails from './TaskDetails/TaskDetails';
import About from './About';
import NotFound from './NotFound';
import Counter from './Counter';
import Timer from './Timer';
import Calculation from './Calculation';
import ColorGenerator from './ColorGenerator';

const App = () => {
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
