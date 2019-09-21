/**
 * External dependencies
 */
import { Col, Form } from 'react-bootstrap';

/**
 * Internal dependencies
 */
import App from '../components/App';

const Login = () => (
  <App>
    <div className="authentication-theme auth-style_1">
      <div className="row">
        <div className="col-12 logo-section">
          <a href="../../index.html" className="logo">
            <img src="./static/bzalpha-logo.png" alt="logo" />
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-5 col-md-7 col-sm-9 col-11 mx-auto">
          <div className="grid">
            <div className="grid-body">
              <div className="row">
                <div className="col-lg-7 col-md-8 col-sm-9 col-12 mx-auto form-wrapper">
                  <form action="#">
                    <div className="form-group input-rounded">
                      <input type="text" className="form-control" placeholder="Username" />
                    </div>
                    <div className="form-group input-rounded">
                      <input type="password" className="form-control" placeholder="Password" />
                    </div>
                    <div className="form-inline">
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" className="form-check-input" />Remember me <i className="input-frame"></i>
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="auth_footer">
        <p className="text-muted text-center">© BZ Alpha Navigation 2019</p>
      </div>
    </div>
    {/* <Col md={5} className="mx-auto">
      <form className="login">
        <Form.Group controlId="username">
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </form>
    </Col> */}
  </App>
);

export default Login;
