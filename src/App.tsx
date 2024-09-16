import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "src/components/Footer";
import Nav from "src/components/Nav";
import { useSetTheme } from "src/hooks";
import About from "src/pages/About";
import Games from "src/pages/Games";
import Home from "src/pages/Home";
import NotFound from "src/pages/NotFound";
import games from "src/games";

const App = () => {
  useSetTheme();

  return (
    <BrowserRouter basename="/arcade">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/" element={<About />} />
        <Route path="/games/" element={<Games />} />
        {games.map((game) => (
          <Route
            key={game.id}
            path={`/games/${game.id}/`}
            element={<game.Component />}
          />
        ))}
        {/* Make sure this is the last route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
