import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/HomePage/Home';
import SharedLayout from './pages/HomePage/SharedLayout';
import Manage from './pages/Manage/Manage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="manage" element={<Manage />} />
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
