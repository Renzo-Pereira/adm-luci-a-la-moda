import './App.css';
import Home from './components/home/home';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Upload from './components/upload/upload';
import Files from './components/files/files';
import Navbar from './components/navbar/navbar'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/files" element={<Files />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
