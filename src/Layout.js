import "./senthamil.css";
import NavLayout from "./NavLayout";
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
