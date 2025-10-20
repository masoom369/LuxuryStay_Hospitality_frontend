import React from "react";

const AdminDashboard = () => {
  return (
    <>
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
                    <h6 className="text-muted">Total Booking</h6>
                  </div>
                  <div className="ml-auto mt-md-3 mt-lg-0">
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
                    </span>
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
                    <h6 className="text-muted">Available Rooms</h6>
                  </div>
                  <div className="ml-auto mt-md-3 mt-lg-0">
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
                    </span>
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
                    <h6 className="text-muted">Enquiry</h6>
                  </div>
                  <div className="ml-auto mt-md-3 mt-lg-0">
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
                    </span>
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
                    <h6 className="text-muted">Collections</h6>
                  </div>
                  <div className="ml-auto mt-md-3 mt-lg-0">
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
                    </span>
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
                <h4 className="card-title">VISITORS</h4>
              </div>
              <div className="card-body">
                <div id="line-chart" />
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="card card-chart">
              <div className="card-header">
                <h4 className="card-title">ROOMS BOOKED</h4>
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
                          <span className="badge badge-pill bg-success inv-badge">
                            INACTIVE
                          </span>
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
                          <span className="badge badge-pill bg-success inv-badge">
                            INACTIVE
                          </span>
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
                          <span className="badge badge-pill bg-success inv-badge">
                            INACTIVE
                          </span>
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
                          <span className="badge badge-pill bg-success inv-badge">
                            INACTIVE
                          </span>
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
                          <span className="badge badge-pill bg-success inv-badge">
                            INACTIVE
                          </span>
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
    </>
  );
};

export default AdminDashboard;
