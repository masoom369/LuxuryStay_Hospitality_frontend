import React from "react";
import { useAuth } from "../context/AuthContext";
import { Helmet } from 'react-helmet-async';

function Layout({ children }) {
  const { user } = useAuth();
  return (
    <>
      <Helmet>
  <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="assets/plugins/fontawesome/css/fontawesome.min.css" />
  <link rel="stylesheet" href="assets/plugins/fontawesome/css/all.min.css"/>
  <link rel="stylesheet" href="assets/css/feathericon.min.css"/>
  <link rel="stylehseet" href="https://cdn.oesmith.co.uk/morris-0.5.1.css"/>
  <link rel="stylesheet" href="assets/plugins/morris/morris.css"/>
  <link rel="stylesheet" href="assets/css/style.css"/>
        
      </Helmet>
      <div className="main-wrapper">
        <div className="header">
          <div className="header-left">
            <a href="index.html" className="logo">
              <img
                src="assets/img/hotel_logo.png"
                width={50}
                height={70}
                alt="logo"
              />
              <span className="logoclass">HOTEL</span>
            </a>
            <a href="index.html" className="logo logo-small">
              <img
                src="assets/img/hotel_logo.png"
                alt="Logo"
                width={30}
                height={30}
              />
            </a>
          </div>
          <a href="javascript:void(0);" id="toggle_btn">
            <i className="fe fe-text-align-left" />
          </a>
          <a className="mobile_btn" id="mobile_btn">
            <i className="fas fa-bars" />
          </a>
          <ul className="nav user-menu">
            <li className="nav-item dropdown noti-dropdown">
              <a
                href="#"
                className="dropdown-toggle nav-link"
                data-toggle="dropdown"
              >
                <i className="fe fe-bell" />
                <span className="badge badge-pill">3</span>
              </a>
              <div className="dropdown-menu notifications">
                <div className="topnav-dropdown-header">
                  <span className="notification-title">Notifications</span>
                  <a href="javascript:void(0)" className="clear-noti">
                    Clear All
                  </a>
                </div>
                <div className="noti-content">
                  <ul className="notification-list">
                    <li className="notification-message">
                      <a href="#">
                        <div className="media">
                          <span className="avatar avatar-sm">
                            <img
                              className="avatar-img rounded-circle"
                              alt="User Image"
                              src="assets/img/profiles/avatar-02.jpg"
                            />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">Carlson Tech</span>
                              has approved
                              <span className="noti-title">your estimate</span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                4 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="notification-message">
                      <a href="#">
                        <div className="media">
                          <span className="avatar avatar-sm">
                            <img
                              className="avatar-img rounded-circle"
                              alt="User Image"
                              src="assets/img/profiles/avatar-11.jpg"
                            />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">
                                International Software Inc
                              </span>
                              has sent you a invoice in the amount of
                              <span className="noti-title">$218</span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                6 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="notification-message">
                      <a href="#">
                        <div className="media">
                          <span className="avatar avatar-sm">
                            <img
                              className="avatar-img rounded-circle"
                              alt="User Image"
                              src="assets/img/profiles/avatar-17.jpg"
                            />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">John Hendry</span>
                              sent a cancellation request
                              <span className="noti-title">
                                Apple iPhone XR
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                8 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="notification-message">
                      <a href="#">
                        <div className="media">
                          <span className="avatar avatar-sm">
                            <img
                              className="avatar-img rounded-circle"
                              alt="User Image"
                              src="assets/img/profiles/avatar-13.jpg"
                            />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">
                                Mercury Software Inc
                              </span>
                              added a new product
                              <span className="noti-title">
                                Apple MacBook Pro
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                12 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="topnav-dropdown-footer">
                  <a href="#">View all Notifications</a>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown has-arrow">
              <a
                href="#"
                className="dropdown-toggle nav-link"
                data-toggle="dropdown"
              >
                <span className="user-img">
                  <img
                    className="rounded-circle"
                    src="assets/img/profiles/avatar-01.jpg"
                    width={31}
                    alt="Soeng Souy"
                  />
                </span>
              </a>
              <div className="dropdown-menu">
                <div className="user-header">
                  <div className="avatar avatar-sm">
                    <img
                      src="assets/img/profiles/avatar-01.jpg"
                      alt="User Image"
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="user-text">
                    <h6>Soeng Souy</h6>
                    <p className="text-muted mb-0">Administrator</p>
                  </div>
                </div>
                <a className="dropdown-item" href="profile.html">
                  My Profile
                </a>
                <a className="dropdown-item" href="settings.html">
                  Account Settings
                </a>
                <a className="dropdown-item" href="login.html">
                  Logout
                </a>
              </div>
            </li>
          </ul>
          <div className="top-nav-search">
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Search here"
              />
              <button className="btn" type="submit">
                <i className="fas fa-search" />
              </button>
            </form>
          </div>
        </div>
        <div className="sidebar" id="sidebar">
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="active">
                  <a href="index.html">
                    <i className="fas fa-tachometer-alt" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <li className="list-divider" />
                <li className="submenu">
                  <a href="#">
                    <i className="fas fa-suitcase" /> <span> Booking </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="all-booking.html"> All Booking </a>
                    </li>
                    <li>
                      <a href="edit-booking.html"> Edit Booking </a>
                    </li>
                    <li>
                      <a href="add-booking.html"> Add Booking </a>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fas fa-user" /> <span> Customers </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="all-customer.html"> All customers </a>
                    </li>
                    <li>
                      <a href="edit-customer.html"> Edit Customer </a>
                    </li>
                    <li>
                      <a href="add-customer.html"> Add Customer </a>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fas fa-key" /> <span> Rooms </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="all-rooms.html">All Rooms </a>
                    </li>
                    <li>
                      <a href="edit-room.html"> Edit Rooms </a>
                    </li>
                    <li>
                      <a href="add-room.html"> Add Rooms </a>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fas fa-user" /> <span> Staff </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="all-staff.html">All Staff </a>
                    </li>
                    <li>
                      <a href="edit-staff.html"> Edit Staff </a>
                    </li>
                    <li>
                      <a href="add-staff.html"> Add Staff </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="pricing.html">
                    <i className="far fa-money-bill-alt" /> <span>Pricing</span>
                  </a>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fas fa-share-alt" /> <span> Apps </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="chat.html">
                        <i className="fas fa-comments" />
                        <span> Chat </span>
                      </a>
                    </li>
                    <li className="submenu">
                      <a href="#">
                        <i className="fas fa-video camera" />
                        <span> Calls </span> <span className="menu-arrow" />
                      </a>
                      <ul className="submenu_class" style={{ display: "none" }}>
                        <li>
                          <a href="voice-call.html"> Voice Call </a>
                        </li>
                        <li>
                          <a href="video-call.html"> Video Call </a>
                        </li>
                        <li>
                          <a href="incoming-call.html"> Incoming Call </a>
                        </li>
                      </ul>
                    </li>
                    <li className="submenu">
                      <a href="#">
                        <i className="fas fa-envelope" /> <span> Email </span>
                        <span className="menu-arrow" />
                      </a>
                      <ul className="submenu_class" style={{ display: "none" }}>
                        <li>
                          <a href="compose.html">Compose Mail </a>
                        </li>
                        <li>
                          <a href="inbox.html"> Inbox </a>
                        </li>
                        <li>
                          <a href="mail-veiw.html"> Mail Veiw </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fas fa-user" /> <span> Employees </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="employees.html">Employees List </a>
                    </li>
                    <li>
                      <a href="leaves.html">Leaves </a>
                    </li>
                    <li>
                      <a href="holidays.html">Holidays </a>
                    </li>
                    <li>
                      <a href="attendance.html">Attendance </a>
                    </li>
                    {user && user.assignments?.some(a => a.role === "admin") && (
                      <li>
                        <a href="/admin/user-management">User Management</a>
                      </li>
                    )}
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="far fa-money-bill-alt" />
                    <span> Accounts </span> <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="invoices.html">Invoices </a>
                    </li>
                    <li>
                      <a href="payments.html">Payments </a>
                    </li>
                    <li>
                      <a href="expenses.html">Expenses </a>
                    </li>
                    <li>
                      <a href="taxes.html">Taxes </a>
                    </li>
                    <li>
                      <a href="provident-fund.html">Provident Fund </a>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fas fa-book" /> <span> Payroll </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="salary.html">Employee Salary </a>
                    </li>
                    <li>
                      <a href="salary-veiw.html">Payslip </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="calendar.html">
                    <i className="fas fa-calendar-alt" /> <span>Calendar</span>
                  </a>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fe fe-table" /> <span> Blog </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="blog.html">Blog </a>
                    </li>
                    <li>
                      <a href="blog-details.html">Blog Veiw </a>
                    </li>
                    <li>
                      <a href="add-blog.html">Add Blog </a>
                    </li>
                    <li>
                      <a href="edit-blog.html">Edit Blog </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="assets.html">
                    <i className="fas fa-cube" /> <span>Assests</span>
                  </a>
                </li>
                <li>
                  <a href="activities.html">
                    <i className="far fa-bell" /> <span>Activities</span>
                  </a>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fe fe-table" /> <span> Reports </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="expense-reports.html">Expense Report </a>
                    </li>
                    <li>
                      <a href="invoice-reports.html">Invoice Report </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="settings.html">
                    <i className="fas fa-cog" /> <span>Settings</span>
                  </a>
                </li>
                <li className="list-divider" />
                <li className="menu-title mt-3">
                  <span>UI ELEMENTS</span>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fas fa-laptop" /> <span> Components </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="uikit.html">UI Kit </a>
                    </li>
                    <li>
                      <a href="typography.html">Typography </a>
                    </li>
                    <li>
                      <a href="tabs.html">Tabs </a>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fas fa-edit" /> <span> Forms </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="form-basic-inputs.html">Basic Input </a>
                    </li>
                    <li>
                      <a href="form-input-groups.html">Input Groups </a>
                    </li>
                    <li>
                      <a href="form-horizontal.html">Horizontal Form </a>
                    </li>
                    <li>
                      <a href="form-vertical.html">Vertical Form </a>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fas fa-table" /> <span> Tables </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="tables-basic.html">Basic Table </a>
                    </li>
                    <li>
                      <a href="tables-datatables.html">Data Table </a>
                    </li>
                  </ul>
                </li>
                <li className="list-divider" />
                <li className="menu-title mt-3">
                  <span>EXTRAS</span>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fas fa-columns" /> <span> Pages </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="login.html">Login </a>
                    </li>
                    <li>
                      <a href="register.html">Register </a>
                    </li>
                    <li>
                      <a href="forgot-password.html">Forgot Password </a>
                    </li>
                    <li>
                      <a href="change-password.html">Change Password </a>
                    </li>
                    <li>
                      <a href="lock-screen.html">Lockscreen </a>
                    </li>
                    <li>
                      <a href="profile.html">Profile </a>
                    </li>
                    <li>
                      <a href="gallery.html">Gallery </a>
                    </li>
                    <li>
                      <a href="error-404.html">404 Error </a>
                    </li>
                    <li>
                      <a href="error-500.html">500 Error </a>
                    </li>
                    <li>
                      <a href="blank-page.html">Blank Page </a>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="fas fa-share-alt" />
                    <span> Multi Level </span> <span className="menu-arrow" />
                  </a>
                  <ul className="submenu_class" style={{ display: "none" }}>
                    <li>
                      <a href="">Level 1 </a>
                    </li>
                    <li>
                      <a href="">Level 2 </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="page-wrapper">
          {children}
        </div>
      </div>
      <script src="assets/js/jquery-3.5.1.min.js"></script>
      <script src="assets/js/popper.min.js"></script>
      <script src="assets/js/bootstrap.min.js"></script>
      <script src="assets/plugins/slimscroll/jquery.slimscroll.min.js"></script>
      <script src="assets/plugins/raphael/raphael.min.js"></script>
      <script src="assets/plugins/morris/morris.min.js"></script>
      <script src="assets/js/chart.morris.js"></script>
      <script src="assets/js/script.js"></script>
    </>
  );
}
export default Layout;
