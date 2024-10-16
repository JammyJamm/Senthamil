import { Outlet, Link } from "react-router-dom";
import MatchImage from "../src/assets/images/fire.png";
import { useState } from "react";
const RouterNav = () => {
  const [counter, setCounter] = useState(1);
  const handleNav = () => {
    if (counter == 2) setCounter(1);
    else setCounter(counter + 1);
  };
  return (
    <>
      {/* <nav>
        <ul>
          <li> 
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav> */}
      <nav>
        <ul>
          {counter == 1 ? (
            <li onClick={handleNav}>
              <Link to="/senthamil">
                <img src={MatchImage} />
              </Link>
            </li>
          ) : (
            ""
          )}
          {counter == 2 ? (
            <li onClick={handleNav}>
              <Link to="/sabi">
                <img src={MatchImage} />
              </Link>
            </li>
          ) : (
            ""
          )}
          {counter == 3 ? (
            <li onClick={handleNav}>
              <Link to="/laddu">
                <img src={MatchImage} />
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default RouterNav;
