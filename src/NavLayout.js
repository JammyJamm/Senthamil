import { Link, Outlet } from 'react-router-dom';

const NavLayout = () => {
  return (
    <div>
      <nav className="navbar fixed-bottom bg-body-tertiary">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li class="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li class="nav-item">
              <Link to="/player" className="nav-link">
                Player
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/player">Player</Link>
            </li>
          </ul>
        </nav> */}

      <Outlet />
    </div>
  );
};

export default NavLayout;
