import coreCSS from "../../@core/vendor/css/core.module.css"
import themDefaultCSS from '../../@core/vendor/css/themeDefault.module.css';
import newCoreCss from "../../@core/vendor/css/newCore.module.css";
import profile from "../../@core/img/avatars/1.png";
import { NavLink } from "react-router-dom";

function Header(){
    return(

      <nav
        className={`${coreCSS[`layout-navbar`]} ${coreCSS[`container-xxl`]} ${coreCSS[`navbar`]} ${coreCSS[`navbar-expand-xl`]} ${coreCSS[`navbar-detached`]} ${coreCSS[`align-items-center`]} ${themDefaultCSS[`bg-navbar-theme`]}`}
        id="layout-navbar"
      >
        <div className={`${coreCSS[`layout-menu-toggle`]} ${coreCSS[`navbar-nav`]} ${coreCSS[`align-items-xl-center`]} ${coreCSS[`me-3`]} ${coreCSS[`me-xl-0`]} ${coreCSS[`d-xl-none`]}`}>
          <a className={`${coreCSS[`nav-item`]} ${coreCSS[`nav-link`]} ${coreCSS[`px-0`]} ${coreCSS[`me-xl-4`]}`} href="javascript:void(0)">
            <i className="bx bx-menu bx-sm"></i>
          </a>
        </div>

        <div className={`${coreCSS[`navbar-nav-right`]} ${coreCSS[`d-flex`]} ${coreCSS[`align-items-center`]}`} id="navbar-collapse">
          <div className={`${coreCSS[`navbar-nav`]} ${coreCSS[`align-items-center`]}`}>
            <div className={`${coreCSS[`nav-item`]} ${coreCSS[`d-flex`]} ${coreCSS[`align-items-center`]}`}>
            <i className="bx bx-search fs-4 lh-0" style={{ fontSize: 26 }}></i>
              <input
                type="text"
                className={`${coreCSS[`form-control`]} ${coreCSS[`border-0`]} ${coreCSS[`shadow-none`]}`}
                placeholder="Search..."
                aria-label="Search..."
              />
            </div>
          </div>

          <ul className={`${coreCSS[`navbar-nav`]} ${coreCSS[`flex-row`]} ${coreCSS[`align-items-center`]} ${coreCSS[`ms-auto`]}`}>
            <li
              className={`${coreCSS[`nav-item`]} ${coreCSS[`me-3`]}`}
              style={{ alignSelf: "center", height: 24, borderLeft: "1px solid #d3d3d3" }}
            />
            <NavLink to="">
            <li className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${coreCSS[`me-3`]}`}>
              <i className="bx bxs-megaphone" style={{ fontSize: 27 }} />
            </li>
            </NavLink>
            <NavLink to="">
            <li className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${coreCSS[`me-3`]}`}>
              <i className="bx bxs-bell" style={{ fontSize: 27 }} />
            </li>
            </NavLink>
            <NavLink to="">
            <li className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${coreCSS[`me-3`]}`}>
              <i className="bx bxs-envelope" style={{ fontSize: 27 }} />
            </li>
            </NavLink>
            <li
              className={`${coreCSS[`nav-item`]} ${coreCSS[`me-3`]}`}
              style={{ alignSelf: "center", height: 24, borderLeft: "1px solid #d3d3d3" }}
            />
            <NavLink to="">
            <li className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${coreCSS[`me-3`]}`}>
              <img
                src={profile}
                alt=""
                className={`${coreCSS[`w-px-30`]} ${coreCSS[`h-auto`]} ${coreCSS[`rounded-circle`]}`}
              />           
            </li>
            </NavLink>
            <li className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]}`}>
              <i className="bx bx-log-out" style={{ fontSize: 28 }} />
            </li>
          </ul>
        </div>
      </nav>
          );
}

export default Header;