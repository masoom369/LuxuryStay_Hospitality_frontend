import React from "react";

const AdminDashboard = () => {
  return (
    <>
      <div className="main-wrapper">
        <div className="header">
          <div className="header-left">
            <a href="index.html" className="logo">
              {" "}
              <img
                src="assets/img/hotel_logo.png"
                width={50}
                height={70}
                alt="logo"
              />{" "}
              <span className="logoclass">HOTEL</span>{" "}
            </a>
            <a href="index.html" className="logo logo-small">
              {" "}
              <img
                src="assets/img/hotel_logo.png"
                alt="Logo"
                width={30}
                height={30}
              />{" "}
            </a>
          </div>
          <a href="javascript:void(0);" id="toggle_btn">
            {" "}
            <i className="fe fe-text-align-left" />{" "}
          </a>
          <a className="mobile_btn" id="mobile_btn">
            {" "}
            <i className="fas fa-bars" />{" "}
          </a>
          <ul className="nav user-menu">
            <li className="nav-item dropdown noti-dropdown">
              <a
                href="#"
                className="dropdown-toggle nav-link"
                data-toggle="dropdown"
              >
                {" "}
                <i className="fe fe-bell" />{" "}
                <span className="badge badge-pill">3</span>{" "}
              </a>
              <div className="dropdown-menu notifications">
                <div className="topnav-dropdown-header">
                  {" "}
                  <span className="notification-title">Notifications</span>{" "}
                  <a href="javascript:void(0)" className="clear-noti">
                    {" "}
                    Clear All{" "}
                  </a>{" "}
                </div>
                <div className="noti-content">
                  <ul className="notification-list">
                    <li className="notification-message">
                      <a href="#">
                        <div className="media">
                          {" "}
                          <span className="avatar avatar-sm">
                            <img
                              className="avatar-img rounded-circle"
                              alt="User Image"
                              src="assets/img/profiles/avatar-02.jpg"
                            />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">Carlson Tech</span>{" "}
                              has approved{" "}
                              <span className="noti-title">your estimate</span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                4 mins ago
                              </span>{" "}
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="notification-message">
                      <a href="#">
                        <div className="media">
                          {" "}
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
                              </span>{" "}
                              has sent you a invoice in the amount of{" "}
                              <span className="noti-title">$218</span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                6 mins ago
                              </span>{" "}
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="notification-message">
                      <a href="#">
                        <div className="media">
                          {" "}
                          <span className="avatar avatar-sm">
                            <img
                              className="avatar-img rounded-circle"
                              alt="User Image"
                              src="assets/img/profiles/avatar-17.jpg"
                            />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">John Hendry</span>{" "}
                              sent a cancellation request{" "}
                              <span className="noti-title">
                                Apple iPhone XR
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                8 mins ago
                              </span>{" "}
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="notification-message">
                      <a href="#">
                        <div className="media">
                          {" "}
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
                              </span>{" "}
                              added a new product{" "}
                              <span className="noti-title">
                                Apple MacBook Pro
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                12 mins ago
                              </span>{" "}
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="topnav-dropdown-footer">
                  {" "}
                  <a href="#">View all Notifications</a>{" "}
                </div>
              </div>
            </li>
            <li className="nav-item dropdown has-arrow">
              <a
                href="#"
                className="dropdown-toggle nav-link"
                data-toggle="dropdown"
              >
                {" "}
                <span className="user-img">
                  <img
                    className="rounded-circle"
                    src="assets/img/profiles/avatar-01.jpg"
                    width={31}
                    alt="Soeng Souy"
                  />
                </span>{" "}
              </a>
              <div className="dropdown-menu">
                <div className="user-header">
                  <div className="avatar avatar-sm">
                    {" "}
                    <img
                      src="assets/img/profiles/avatar-01.jpg"
                      alt="User Image"
                      className="avatar-img rounded-circle"
                    />{" "}
                  </div>
                  <div className="user-text">
                    <h6>Soeng Souy</h6>
                    <p className="text-muted mb-0">Administrator</p>
                  </div>
                </div>{" "}
                <a className="dropdown-item" href="profile.html">
                  My Profile
                </a>{" "}
                <a className="dropdown-item" href="settings.html">
                  Account Settings
                </a>{" "}
                <a className="dropdown-item" href="login.html">
                  Logout
                </a>{" "}
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
                  {" "}
                  <a href="index.html">
                    <i className="fas fa-tachometer-alt" />{" "}
                    <span>Dashboard</span>
                  </a>{" "}
                </li>
                <li className="list-divider" />
                <li className="submenu">
                  {" "}
                  <a href="#">
                    <i className="fas fa-suitcase" /> <span> Booking </span>{" "}
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
                  {" "}
                  <a href="#">
                    <i className="fas fa-user" /> <span> Customers </span>{" "}
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
                  {" "}
                  <a href="#">
                    <i className="fas fa-key" /> <span> Rooms </span>{" "}
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
                  {" "}
                  <a href="#">
                    <i className="fas fa-user" /> <span> Staff </span>{" "}
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
                  {" "}
                  <a href="pricing.html">
                    <i className="far fa-money-bill-alt" /> <span>Pricing</span>
                  </a>{" "}
                </li>
                <li className="submenu">
                  {" "}
                  <a href="#">
                    <i className="fas fa-share-alt" /> <span> Apps </span>{" "}
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
                      {" "}
                      <a href="#">
                        <i className="fas fa-video camera" />{" "}
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
                      {" "}
                      <a href="#">
                        <i className="fas fa-envelope" /> <span> Email </span>{" "}
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
                  {" "}
                  <a href="#">
                    <i className="fas fa-user" /> <span> Employees </span>{" "}
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
                  </ul>
                </li>
                <li className="submenu">
                  {" "}
                  <a href="#">
                    <i className="far fa-money-bill-alt" />{" "}
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
                  {" "}
                  <a href="#">
                    <i className="fas fa-book" /> <span> Payroll </span>{" "}
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
                  {" "}
                  <a href="calendar.html">
                    <i className="fas fa-calendar-alt" /> <span>Calendar</span>
                  </a>{" "}
                </li>
                <li className="submenu">
                  {" "}
                  <a href="#">
                    <i className="fe fe-table" /> <span> Blog </span>{" "}
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
                  {" "}
                  <a href="assets.html">
                    <i className="fas fa-cube" /> <span>Assests</span>
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="activities.html">
                    <i className="far fa-bell" /> <span>Activities</span>
                  </a>{" "}
                </li>
                <li className="submenu">
                  {" "}
                  <a href="#">
                    <i className="fe fe-table" /> <span> Reports </span>{" "}
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
                  {" "}
                  <a href="settings.html">
                    <i className="fas fa-cog" /> <span>Settings</span>
                  </a>{" "}
                </li>
                <li className="list-divider" />
                <li className="menu-title mt-3">
                  {" "}
                  <span>UI ELEMENTS</span>{" "}
                </li>
                <li className="submenu">
                  {" "}
                  <a href="#">
                    <i className="fas fa-laptop" /> <span> Components </span>{" "}
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
                  {" "}
                  <a href="#">
                    <i className="fas fa-edit" /> <span> Forms </span>{" "}
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
                  {" "}
                  <a href="#">
                    <i className="fas fa-table" /> <span> Tables </span>{" "}
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
                  {" "}
                  <span>EXTRAS</span>{" "}
                </li>
                <li className="submenu">
                  {" "}
                  <a href="#">
                    <i className="fas fa-columns" /> <span> Pages </span>{" "}
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
                  {" "}
                  <a href="#">
                    <i className="fas fa-share-alt" />{" "}
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
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12 mt-5">
                  <h3 className="page-title mt-3">Good Morning Soeng Souy!</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card board1 fill">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <div>
                        <h3 className="card_widget_header">236</h3>
                        <h6 className="text-muted">Total Booking</h6>{" "}
                      </div>
                      <div className="ml-auto mt-md-3 mt-lg-0">
                        {" "}
                        <span className="opacity-7 text-muted">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#009688"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user-plus"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy={7} r={4} />
                            <line x1={20} y1={8} x2={20} y2={14} />
                            <line x1={23} y1={11} x2={17} y2={11} />
                          </svg>
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card board1 fill">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <div>
                        <h3 className="card_widget_header">180</h3>
                        <h6 className="text-muted">Available Rooms</h6>{" "}
                      </div>
                      <div className="ml-auto mt-md-3 mt-lg-0">
                        {" "}
                        <span className="opacity-7 text-muted">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#009688"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-dollar-sign"
                          >
                            <line x1={12} y1={1} x2={12} y2={23} />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card board1 fill">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <div>
                        <h3 className="card_widget_header">1538</h3>
                        <h6 className="text-muted">Enquiry</h6>{" "}
                      </div>
                      <div className="ml-auto mt-md-3 mt-lg-0">
                        {" "}
                        <span className="opacity-7 text-muted">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#009688"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-file-plus"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8" />
                            <line x1={12} y1={18} x2={12} y2={12} />
                            <line x1={9} y1={15} x2={15} y2={15} />
                          </svg>
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card board1 fill">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <div>
                        <h3 className="card_widget_header">364</h3>
                        <h6 className="text-muted">Collections</h6>{" "}
                      </div>
                      <div className="ml-auto mt-md-3 mt-lg-0">
                        {" "}
                        <span className="opacity-7 text-muted">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#009688"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-globe"
                          >
                            <circle cx={12} cy={12} r={10} />
                            <line x1={2} y1={12} x2={22} y2={12} />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                          </svg>
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <div className="card card-chart">
                  <div className="card-header">
                    <h4 className="card-title">VISITORS</h4>{" "}
                  </div>
                  <div className="card-body">
                    <div id="line-chart" />
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="card card-chart">
                  <div className="card-header">
                    <h4 className="card-title">ROOMS BOOKED</h4>{" "}
                  </div>
                  <div className="card-body">
                    <div id="donut-chart" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 d-flex">
                <div className="card card-table flex-fill">
                  <div className="card-header">
                    <h4 className="card-title float-left mt-2">Booking</h4>
                    <button
                      type="button"
                      className="btn btn-primary float-right veiwbutton"
                    >
                      Veiw All
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover table-center">
                        <thead>
                          <tr>
                            <th>Booking ID</th>
                            <th>Name</th>
                            <th>Email ID</th>
                            <th>Aadhar Number</th>
                            <th className="text-center">Room Type</th>
                            <th className="text-right">Number</th>
                            <th className="text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-nowrap">
                              <div>BKG-0001</div>
                            </td>
                            <td className="text-nowrap">Tommy Bernal</td>
                            <td>
                              <a
                                href="/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="3743585a5a4e55524559565b77524f565a475b521954585a"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>12414786454545</td>
                            <td className="text-center">Double</td>
                            <td className="text-right">
                              <div>631-254-6480</div>
                            </td>
                            <td className="text-center">
                              {" "}
                              <span className="badge badge-pill bg-success inv-badge">
                                INACTIVE
                              </span>{" "}
                            </td>
                          </tr>
                          <tr>
                            <td className="text-nowrap">
                              <div>BKG-0002</div>
                            </td>
                            <td className="text-nowrap">Ellen Thill</td>
                            <td>
                              <a
                                href="/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="89fbe0eae1e8fbedebfbe6ebfafdc9ecf1e8e4f9e5eca7eae6e4"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>5456223232322</td>
                            <td className="text-center">Double</td>
                            <td className="text-right">
                              <div>830-468-1042</div>
                            </td>
                            <td className="text-center">
                              {" "}
                              <span className="badge badge-pill bg-success inv-badge">
                                INACTIVE
                              </span>{" "}
                            </td>
                          </tr>
                          <tr>
                            <td className="text-nowrap">
                              <div>BKG-0003</div>
                            </td>
                            <td className="text-nowrap">Corina Kelsey</td>
                            <td>
                              <a
                                href="/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="76131a1a1318021e1f1a1a36130e171b061a135815191b"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>454543232625</td>
                            <td className="text-center">Single</td>
                            <td className="text-right">
                              <div>508-335-5531</div>
                            </td>
                            <td className="text-center">
                              {" "}
                              <span className="badge badge-pill bg-success inv-badge">
                                INACTIVE
                              </span>{" "}
                            </td>
                          </tr>
                          <tr>
                            <td className="text-nowrap">
                              <div>BKG-0004</div>
                            </td>
                            <td className="text-nowrap">Carolyn Lane</td>
                            <td>
                              <a
                                href="/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="50333f22393e313b353c23352910373d31393c7e333f3d"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>2368989562621</td>
                            <td className="text-center">Double</td>
                            <td className="text-right">
                              <div>262-260-1170</div>
                            </td>
                            <td className="text-center">
                              {" "}
                              <span className="badge badge-pill bg-success inv-badge">
                                INACTIVE
                              </span>{" "}
                            </td>
                          </tr>
                          <tr>
                            <td className="text-nowrap">
                              <div>BKG-0005</div>
                            </td>
                            <td className="text-nowrap">Denise</td>
                            <td>
                              <a
                                href="/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="1c7f7d6e73706572707d72795c7b717d7570327f7371"
                              >
                                [email&nbsp;protected]
                              </a>
                            </td>
                            <td>3245455582287</td>
                            <td className="text-center">Single</td>
                            <td className="text-right">
                              <div>570-458-0070</div>
                            </td>
                            <td className="text-center">
                              {" "}
                              <span className="badge badge-pill bg-success inv-badge">
                                INACTIVE
                              </span>{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
