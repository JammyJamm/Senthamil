import "./senthamil.css";
import AddPlayer from "./AddPlayer";
import PlayerData from "./PlayerData";

const Layout = () => {
  return (
    <div className="main">
      <PlayerData />
      <AddPlayer />
    </div>
  );
};
export default Layout;
