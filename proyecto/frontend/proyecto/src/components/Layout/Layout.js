import { Outlet, Link } from "react-router-dom";
//import './style.css'

const Layout = () => {
  return (
    <div className="layout-container">
    <nav className="nav-bar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
  )
};

export default Layout;