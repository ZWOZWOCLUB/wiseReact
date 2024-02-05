import coreCSS from "../../@core/vendor/css/core.module.css"
import thenmeCSS from "../../@core/vendor/css/themeDefault.module.css"

function Header(){
    return(
    <nav
            className={[coreCSS[`layout-navbar`], coreCSS[`container-xxl`], coreCSS[`navbar`], coreCSS[`navbar-expand-xl`], thenmeCSS[`navbar-detached`], coreCSS[`align-items-center`], coreCSS[`bg-navbar-theme`]]}
            id="layout-navbar"
          >
            <div className={[coreCSS[`layout-menu-toggle`], coreCSS[`navbar-nav`], coreCSS[`align-items-xl-center`], coreCSS[`me-3 me-xl-0`], coreCSS[`d-xl-none`]]}>
              <a className={[coreCSS[`nav-item nav-link`], coreCSS[`px-0`], coreCSS[`me-xl-4`]]}>
                <i className={[coreCSS[`bx`], coreCSS[`bx-menu`], coreCSS[`bx-sm`]]}></i>
              </a>
            </div>
            <div className={[coreCSS[`navbar-nav-right`], coreCSS[`d-flex`], coreCSS[`align-items-center`]]} id="navbar-collapse">
              <div className={[coreCSS[`navbar-nav`], coreCSS[`align-items-center`]]}>
                <div className={[coreCSS[`nav-item`], coreCSS[`d-flex`], coreCSS[`align-items-center`]]}>
                  <i className={[coreCSS[`bx`], coreCSS[`bx-search`], coreCSS[`fs-4`], coreCSS[`lh-0`]]}></i>
                  <input
                    type="text"
                    className={[coreCSS[`form-control`], coreCSS[`border-0`], coreCSS[`shadow-none`]]}
                    placeholder="Search..."
                    aria-label="Search..."
                  />
                </div>
              </div>
              <ul className={[coreCSS[`navbar-nav`], coreCSS[`flex-row`], coreCSS[`align-items-center`], coreCSS[`ms-auto`]]}>
                <li className={[coreCSS[`nav-item`], coreCSS[`lh-1`], coreCSS[`me-3`]]}>
                  공지
                </li>
                <li className="nav-item lh-1 me-3">
                  알림
                </li>
                <li className="nav-item lh-1 me-3">
                  쪽지
                </li>
                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <a className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <div className="avatar avatar-online">
                      <img src="../../assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        <div className="d-flex">
                          <div clclassNameass="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                              <img src="../../assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-semibold d-block">John Doe</span>
                            <small className="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-user me-2"></i>
                        <span className={[coreCSS[`align-middle`]]}>My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-cog me-2"></i>
                        <span className="align-middle">출퇴근</span>
                      </a>
                    </li>
                    
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="auth-login-basic.html">
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Log Out</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
          );
}

export default Header;