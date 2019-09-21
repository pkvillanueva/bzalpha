/**
 * Internal dependencies
 */
import App from '../components/App';

const Index = () => (
  <App>
    <nav className="t-header">
      <div className="t-header-brand-wrapper">
        <a href="index.html">
          <img className="logo" src="./static/bzalpha-icon.svg" alt="Logo" />
          <img className="logo-mini" src="../assets/images/logo_mini.svg" alt="Logo" />
        </a>
        <button className="t-header-toggler t-header-desk-toggler d-none d-lg-block">
          <svg className="logo" viewBox="0 0 200 200">
            <path className="top" d="
                M 40, 80
                C 40, 80 120, 80 140, 80
                C180, 80 180, 20  90, 80
                C 60,100  30,120  30,120
              "></path>
            <path className="middle" d="
                M 40,100
                L140,100
              "></path>
            <path className="bottom" d="
                M 40,120
                C 40,120 120,120 140,120
                C180,120 180,180  90,120
                C 60,100  30, 80  30, 80
              "></path>
          </svg>
        </button>
      </div>
      <div className="t-header-content-wrapper">
        <div className="t-header-content">
          <button className="t-header-toggler t-header-mobile-toggler d-block d-lg-none">
            <i className="mdi mdi-menu"></i>
          </button>
          <form action="#" className="t-header-search-box">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="mdi mdi-magnify"></i>
                </div>
              </div>
              <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Search" autocomplete="off" />
            </div>
          </form>
          <ul className="nav ml-auto">
            <li className="nav-item dropdown">
              <a className="nav-link" href="#" id="notificationDropdown" data-toggle="dropdown" aria-expanded="false">
                <i className="mdi mdi-bell-outline mdi-1x"></i>
              </a>
              <div className="dropdown-menu navbar-dropdown dropdown-menu-right" aria-labelledby="notificationDropdown">
                <div className="dropdown-header">
                  <h6 className="dropdown-title">Notifications</h6>
                  <p className="dropdown-title-text">You have 4 unread notification</p>
                </div>
                <div className="dropdown-body">
                  <div className="dropdown-list">
                    <div className="icon-wrapper rounded-circle bg-inverse-primary text-primary">
                      <i className="mdi mdi-alert"></i>
                    </div>
                    <div className="content-wrapper">
                      <small className="name">Storage Full</small>
                      <small className="content-text">Server storage almost full</small>
                    </div>
                  </div>
                  <div className="dropdown-list">
                    <div className="icon-wrapper rounded-circle bg-inverse-success text-success">
                      <i className="mdi mdi-cloud-upload"></i>
                    </div>
                    <div className="content-wrapper">
                      <small className="name">Upload Completed</small>
                      <small className="content-text">3 Files uploded successfully</small>
                    </div>
                  </div>
                  <div className="dropdown-list">
                    <div className="icon-wrapper rounded-circle bg-inverse-warning text-warning">
                      <i className="mdi mdi-security"></i>
                    </div>
                    <div className="content-wrapper">
                      <small className="name">Authentication Required</small>
                      <small className="content-text">Please verify your password to continue using cloud services</small>
                    </div>
                  </div>
                </div>
                <div className="dropdown-footer">
                  <a href="#">View All</a>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="#" id="messageDropdown" data-toggle="dropdown" aria-expanded="false">
                <i className="mdi mdi-message-outline mdi-1x"></i>
                <span className="notification-indicator notification-indicator-primary notification-indicator-ripple"></span>
              </a>
              <div className="dropdown-menu navbar-dropdown dropdown-menu-right" aria-labelledby="messageDropdown">
                <div className="dropdown-header">
                  <h6 className="dropdown-title">Messages</h6>
                  <p className="dropdown-title-text">You have 4 unread messages</p>
                </div>
                <div className="dropdown-body">
                  <div className="dropdown-list">
                    <div className="image-wrapper">
                      <img className="profile-img" src="http://www.placehold.it/50x50" alt="profile image" />
                      <div className="status-indicator rounded-indicator bg-success"></div>
                    </div>
                    <div className="content-wrapper">
                      <small className="name">Clifford Gordon</small>
                      <small className="content-text">Lorem ipsum dolor sit amet.</small>
                    </div>
                  </div>
                  <div className="dropdown-list">
                    <div className="image-wrapper">
                      <img className="profile-img" src="http://www.placehold.it/50x50" alt="profile image" />
                      <div className="status-indicator rounded-indicator bg-success"></div>
                    </div>
                    <div className="content-wrapper">
                      <small className="name">Rachel Doyle</small>
                      <small className="content-text">Lorem ipsum dolor sit amet.</small>
                    </div>
                  </div>
                  <div className="dropdown-list">
                    <div className="image-wrapper">
                      <img className="profile-img" src="http://www.placehold.it/50x50" alt="profile image" />
                      <div className="status-indicator rounded-indicator bg-warning"></div>
                    </div>
                    <div className="content-wrapper">
                      <small className="name">Lewis Guzman</small>
                      <small className="content-text">Lorem ipsum dolor sit amet.</small>
                    </div>
                  </div>
                </div>
                <div className="dropdown-footer">
                  <a href="#">View All</a>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="#" id="appsDropdown" data-toggle="dropdown" aria-expanded="false">
                <i className="mdi mdi-apps mdi-1x"></i>
              </a>
              <div className="dropdown-menu navbar-dropdown dropdown-menu-right" aria-labelledby="appsDropdown">
                <div className="dropdown-header">
                  <h6 className="dropdown-title">Apps</h6>
                  <p className="dropdown-title-text mt-2">Authentication required for 3 apps</p>
                </div>
                <div className="dropdown-body border-top pt-0">
                  <a className="dropdown-grid">
                    <i className="grid-icon mdi mdi-jira mdi-2x"></i>
                    <span className="grid-tittle">Jira</span>
                  </a>
                  <a className="dropdown-grid">
                    <i className="grid-icon mdi mdi-trello mdi-2x"></i>
                    <span className="grid-tittle">Trello</span>
                  </a>
                  <a className="dropdown-grid">
                    <i className="grid-icon mdi mdi-artstation mdi-2x"></i>
                    <span className="grid-tittle">Artstation</span>
                  </a>
                  <a className="dropdown-grid">
                    <i className="grid-icon mdi mdi-bitbucket mdi-2x"></i>
                    <span className="grid-tittle">Bitbucket</span>
                  </a>
                </div>
                <div className="dropdown-footer">
                  <a href="#">View All</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="page-body">
      <div className="page-content-wrapper">
        <div className="page-content-wrapper-inner">
          <div className="viewport-header">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb has-arrow">
                <li className="breadcrumb-item">
                  <a href="#">Dashboard</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">Overview</li>
              </ol>
            </nav>
          </div>
          <div className="content-viewport">
            <div className="row">
              <div className="col-md-7 equel-grid order-md-2">
                <div className="grid d-flex flex-column justify-content-between overflow-hidden">
                  <div className="grid-body">
                    <div className="d-flex justify-content-between">
                      <p className="card-title">Sales Revenue</p>
                      <div className="chartjs-legend" id="sales-revenue-chart-legend"></div>
                    </div>
                    <div className="d-flex">
                      <p className="d-none d-xl-block">12.5% Growth compared to the last week</p>
                      <div className="ml-auto">
                        <h2 className="font-weight-medium text-gray"><i className="mdi mdi-menu-up text-success"></i><span className="animated-count">25.04</span>%</h2>
                      </div>
                    </div>
                  </div>
                  <canvas className="mt-4" id="sales-revenue-chart" height="245"></canvas>
                </div>
              </div>
              <div className="col-md-5 order-md-0">
                <div className="row">
                  <div className="col-6 equel-grid">
                    <div className="grid d-flex flex-column align-items-center justify-content-center">
                      <div className="grid-body text-center">
                        <div className="profile-img img-rounded bg-inverse-primary no-avatar component-flat mx-auto mb-4"><i className="mdi mdi-account-group mdi-2x"></i></div>
                        <h2 className="font-weight-medium"><span className="animated-count">21.2</span>k</h2>
                        <small className="text-gray d-block mt-3">Total Followers</small>
                        <small className="font-weight-medium text-success"><i className="mdi mdi-menu-up"></i><span className="animated-count">12.01</span>%</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 equel-grid">
                    <div className="grid d-flex flex-column align-items-center justify-content-center">
                      <div className="grid-body text-center">
                        <div className="profile-img img-rounded bg-inverse-danger no-avatar component-flat mx-auto mb-4"><i className="mdi mdi-airballoon mdi-2x"></i></div>
                        <h2 className="font-weight-medium"><span className="animated-count">1.6</span>k</h2>
                        <small className="text-gray d-block mt-3">Impression</small>
                        <small className="font-weight-medium text-danger"><i className="mdi mdi-menu-down"></i><span className="animated-count">03.45</span>%</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 equel-grid">
                    <div className="grid d-flex flex-column align-items-center justify-content-center">
                      <div className="grid-body text-center">
                        <div className="profile-img img-rounded bg-inverse-warning no-avatar component-flat mx-auto mb-4"><i className="mdi mdi-fire mdi-2x"></i></div>
                        <h2 className="font-weight-medium animated-count">2363</h2>
                        <small className="text-gray d-block mt-3">Reach</small>
                        <small className="font-weight-medium text-danger"><i className="mdi mdi-menu-down"></i><span className="animated-count">12.15</span>%</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 equel-grid">
                    <div className="grid d-flex flex-column align-items-center justify-content-center">
                      <div className="grid-body text-center">
                        <div className="profile-img img-rounded bg-inverse-success no-avatar component-flat mx-auto mb-4"><i className="mdi mdi-charity mdi-2x"></i></div>
                        <h2 className="font-weight-medium"><span className="animated-count">23.6</span>%</h2>
                        <small className="text-gray d-block mt-3">Engagement Rate</small>
                        <small className="font-weight-medium text-success"><i className="mdi mdi-menu-up"></i><span className="animated-count">51.03</span>%</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 equel-grid">
                <div className="grid">
                  <div className="grid-body py-3">
                    <p className="card-title ml-n1">Order History</p>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover table-sm">
                      <thead>
                        <tr className="solid-header">
                          <th colspan="2" className="pl-4">Customer</th>
                          <th>Order No</th>
                          <th>Purchased On</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="pr-0 pl-4">
                            <img className="profile-img img-sm" src="http://www.placehold.it/50x50" alt="profile image" />
                          </td>
                          <td className="pl-md-0">
                            <small className="text-black font-weight-medium d-block">Barbara Curtis</small>
                            <span>
                              <span className="status-indicator rounded-indicator small bg-primary"></span>Account Deactivated </span>
                          </td>
                          <td>
                            <small>8523537435</small>
                          </td>
                          <td> Just Now </td>
                        </tr>
                        <tr>
                          <td className="pr-0 pl-4">
                            <img className="profile-img img-sm" src="http://www.placehold.it/50x50" alt="profile image" />
                          </td>
                          <td className="pl-md-0">
                            <small className="text-black font-weight-medium d-block">Charlie Hawkins</small>
                            <span>
                              <span className="status-indicator rounded-indicator small bg-success"></span>Email Verified </span>
                          </td>
                          <td>
                            <small>9537537436</small>
                          </td>
                          <td> Mar 04, 2018 11:37am </td>
                        </tr>
                        <tr>
                          <td className="pr-0 pl-4">
                            <img className="profile-img img-sm" src="http://www.placehold.it/50x50" alt="profile image" />
                          </td>
                          <td className="pl-md-0">
                            <small className="text-black font-weight-medium d-block">Nina Bates</small>
                            <span>
                              <span className="status-indicator rounded-indicator small bg-warning"></span>Payment On Hold </span>
                          </td>
                          <td>
                            <small>7533567437</small>
                          </td>
                          <td> Mar 13, 2018 9:41am </td>
                        </tr>
                        <tr>
                          <td className="pr-0 pl-4">
                            <img className="profile-img img-sm" src="http://www.placehold.it/50x50" alt="profile image" />
                          </td>
                          <td className="pl-md-0">
                            <small className="text-black font-weight-medium d-block">Hester Richards</small>
                            <span>
                              <span className="status-indicator rounded-indicator small bg-success"></span>Email Verified </span>
                          </td>
                          <td>
                            <small>5673467743</small>
                          </td>
                          <td> Feb 21, 2018 8:34am </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <a className="border-top px-3 py-2 d-block text-gray" href="#"><small className="font-weight-medium"><i className="mdi mdi-chevron-down mr-2"></i>View All Order History</small></a>
                </div>
              </div>
              <div className="col-md-4 equel-grid">
                <div className="row flex-grow">
                  <div className="col-12 equel-grid">
                    <div className="grid widget-revenue-card">
                      <div className="grid-body d-flex flex-column h-100">
                        <div className="split-header">
                          <p className="card-title">Server Load</p>
                          <div className="content-wrapper v-centered">
                            <small className="text-muted">2h ago</small>
                            <span className="btn action-btn btn-refresh btn-xs component-flat">
                              <i className="mdi mdi-autorenew"></i>
                            </span>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <h3 className="font-weight-medium mt-2">69.05%</h3>
                          <p className="text-gray">Storage is getting full</p>
                          <div className="d-flex justify-content-between text-muted mt-3">
                            <small>Usage</small>
                            <small>35.62 GB / 2 TB</small>
                          </div>
                          <div className="progress progress-slim mt-2">
                            <div className="progress-bar bg-primary" role="progressbar" style={ { width: '68%' } } aria-valuenow="68" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 equel-grid">
                    <div className="grid widget-sales-card d-flex flex-column">
                      <div className="grid-body pb-3">
                        <div className="wrapper d-flex">
                          <p className="card-title">Performance</p>
                          <div className="badge badge-success ml-auto">+ 12.42%</div>
                        </div>
                        <div className="wrapper mt-2">
                          <h3>321,212</h3>
                          <small className="text-gray">More traffic in this week</small>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <canvas className="w-100" id="sales-conversion" height="70"></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-6 equel-grid">
                <div className="grid deposit-balance-card">
                  <div className="grid-body">
                    <p className="card-title">Deposits</p>
                    <div className="row">
                      <div className="col-md-12 mt-4">
                        <div id="current-circle-progress">
                          <span className="circle-progress-value font-weight-medium text-primary h4"></span>
                        </div>
                      </div>
                      <div className="col-md-12 text-center mt-4">
                        <h4 className="font-weight-medium">$32,436</h4>
                      </div>
                      <div className="col-12">
                        <button type="button" className="btn btn-sm btn-block mt-4 btn-primary">View Transactions</button>
                      </div>
                      <div className="deposit-balance-card-footer">
                        <div className="footer-col col">
                          <small>Goal: $100k</small>
                          <div className="progress progress-slim mt-2">
                            <div className="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" style={ { width: '35%' } } aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className="footer-col col">
                          <small>Duration: 23 Days</small>
                          <div className="progress progress-slim mt-2">
                            <div className="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" style={ { width: '76%' } } aria-valuenow="76" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 equel-grid">
                <div className="grid">
                  <div className="grid-body pb-0">
                    <p className="card-title">Your top countries</p>
                    <small className="mt-4">Sales performance revenue based by country</small>
                    <div className="table-responsive">
                      <table className="table mt-2">
                        <tbody>
                          <tr className="text-align-edge">
                            <td className="border-top-0"><i className="flag-icon flag-icon-at"></i></td>
                            <td className="border-top-0">Austria</td>
                            <td className="border-top-0 font-weight-bold">$3,434.10</td>
                          </tr>
                          <tr className="text-align-edge">
                            <td><i className="flag-icon flag-icon-br"></i></td>
                            <td>Brazil</td>
                            <td className="font-weight-bold">$3,233.20</td>
                          </tr>
                          <tr className="text-align-edge">
                            <td><i className="flag-icon flag-icon-de"></i></td>
                            <td>Germany</td>
                            <td className="font-weight-bold">$2,345.20</td>
                          </tr>
                          <tr className="text-align-edge">
                            <td><i className="flag-icon flag-icon-fr"></i></td>
                            <td>France</td>
                            <td className="font-weight-bold">$1,671.10</td>
                          </tr>
                          <tr className="text-align-edge">
                            <td><i className="flag-icon flag-icon-ca"></i></td>
                            <td>Canada</td>
                            <td className="font-weight-bold">$1,546.00</td>
                          </tr>
                          <tr className="text-align-edge">
                            <td><i className="flag-icon flag-icon-ch"></i></td>
                            <td>Switzerland</td>
                            <td className="font-weight-bold">$1,034.10</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 equel-grid">
                <div className="grid">
                  <div className="grid-body">
                    <div className="d-flex justify-content-between">
                      <p className="card-title">Activity Log</p>
                      <div className="btn-group">
                        <button type="button" className="btn btn-trasnparent btn-xs component-flat pr-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="mdi mdi-dots-vertical"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">Expand View</a>
                          <a className="dropdown-item" href="#">Edit</a>
                        </div>
                      </div>
                    </div>
                    <div className="vertical-timeline-wrapper">
                      <div className="timeline-vertical dashboard-timeline">
                        <div className="activity-log">
                          <p className="log-name">Agnes Holt</p>
                          <div className="log-details">Analytics dashboard has been created<span className="text-primary ml-1">#Slack</span></div>
                          <small className="log-time">8 mins Ago</small>
                        </div>
                        <div className="activity-log">
                          <p className="log-name">Ronald Edwards</p>
                          <div className="log-details">Report has been updated <div className="grouped-images mt-1">
                              <img className="img-sm" src="http://www.placehold.it/50x50" alt="Profile Image" />
                              <img className="img-sm" src="http://www.placehold.it/50x50" alt="Profile Image" />
                              <img className="img-sm" src="http://www.placehold.it/50x50" alt="Profile Image" />
                              <img className="img-sm" src="http://www.placehold.it/50x50" alt="Profile Image" />
                              <span className="plus-text img-sm">+3</span>
                            </div>
                          </div>
                          <small className="log-time">3 Hours Ago</small>
                        </div>
                        <div className="activity-log">
                          <p className="log-name">Charlie Newton</p>
                          <div className="log-details"> Approved your request <div className="wrapper mt-1">
                              <button type="button" className="btn btn-xs btn-primary">Approve</button>
                              <button type="button" className="btn btn-xs btn-inverse-primary">Reject</button>
                            </div>
                          </div>
                          <small className="log-time">2 Hours Ago</small>
                        </div>
                        <div className="activity-log">
                          <p className="log-name">Gussie Page</p>
                          <div className="log-details">Added new task: Slack home page</div>
                          <small className="log-time">4 Hours Ago</small>
                        </div>
                        <div className="activity-log">
                          <p className="log-name">Ina Mendoza</p>
                          <div className="log-details">Added new images</div>
                          <small className="log-time">8 Hours Ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a className="border-top px-3 py-2 d-block text-gray" href="#"><small className="font-weight-medium"><i className="mdi mdi-chevron-down mr-2"></i>View All</small></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="row">
            <div className="col-sm-6 text-center text-sm-right order-sm-1">
              <ul className="text-gray">
                <li><a href="#">Terms of use</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-sm-6 text-center text-sm-left mt-3 mt-sm-0">
              <small className="text-muted d-block">Copyright © 2019 <a href="http://www.uxcandy.co" target="_blank">UXCANDY</a>. All rights reserved</small>
              <small className="text-gray mt-2">Handcrafted With <i className="mdi mdi-heart text-danger"></i></small>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </App>
);

export default Index;
