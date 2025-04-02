import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/list/:query" element={<MovieList />}/>
        <Route path="/details/:id" element={<MovieDetails />}/>
      </Routes>
    </Router>
  )
}

export default App
