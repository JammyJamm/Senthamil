import logo from "../src/assets/images/logo.png";
import { Link } from "react-router-dom";
import background from "../src/assets/images/Background.png";
export const Laddu = () => {
  return (
    <div
      className="ui-topNav ui-match-nav"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="profile">
        <div className="image">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div class="more">
        <Link to="/ladduAddData">
          <img src="/Senthamil/static/media/add.587029074ccbecca2d6d44140b51b354.svg" />
        </Link>
      </div>
      <div className="ui-nav">
        <div className="ui-block">
          <button className={""} value="wkHigh_player" onClick={""}>
            ^WK-P
          </button>
          <button className={""} value="wk_playerHigh" onClick={""}>
            WK-P^
          </button>
          <button className={""} value="captainHigh_player" onClick={""}>
            ^C-P
          </button>
          <button className={""} value="captain_playerHigh" onClick={""}>
            C-P^
          </button>
          <button className={""} value="playerHigh_player" onClick={""}>
            C-P^
          </button>
        </div>
      </div>
    </div>
  );
};
