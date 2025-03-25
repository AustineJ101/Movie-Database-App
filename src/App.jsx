import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import MovieList from "./pages/MovieList";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/list/:query" element={<MovieList />}/>
      </Routes>
    </Router>
  )
}

export default App
