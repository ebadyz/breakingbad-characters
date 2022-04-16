import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./global.css";
import Home from "./components/Home";
import Quotes from "./components/Quotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quotes/:characterId" element={<Quotes />} />
        <Route
          path="*"
          element={
            <main
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <h1>404</h1>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
