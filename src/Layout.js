import NavLayout from './NavLayout';
import AddPlayer from './AddPlayer';
import PlayerData from './PlayerData';

const PlayerLayout = () => {
  return (
    <div className="main">
      <PlayerData />
      <AddPlayer />
    </div>
  );
};
export default PlayerLayout;
