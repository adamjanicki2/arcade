import Link from "src/components/Link";
import { useDocumentTitle } from "src/hooks";
import "src/pages/home.css";
const Home = () => {
  useDocumentTitle("Arcade");
  return (
    <div
      className="flex flex-column items-center justify-center"
      style={{ minHeight: "60vh" }}
    >
      <h1 style={{ width: "fit-content" }} className="home-title tc">
        ARCADE
      </h1>
      <Link to="/games/" className="home-link">
        START PLAYING
      </Link>
      <Link to="/about/" className="home-link mt4">
        LEARN MORE
      </Link>
    </div>
  );
};
export default Home;
