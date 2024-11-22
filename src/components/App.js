import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home/Home';
import TaskDetails from './TaskDetails/TaskDetails';
import About from './About';
import NotFound from './NotFound';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
