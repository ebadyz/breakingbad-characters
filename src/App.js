import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

function Home() {
  return <div>Hello</div>;
}

function About() {
  return <div>About</div>;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
