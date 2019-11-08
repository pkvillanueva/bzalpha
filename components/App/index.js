/**
 * External dependencies.
 */
import React, { useContext } from 'react';
import { Layout, Menu, Badge, Avatar, Dropdown } from 'antd';
const { Header, Content, Footer } = Layout;
const { Item: MenuItem } = Menu;

/**
 * Internal dependencies.
 */
import { UserContext } from '~/store/user';
import Container from '~/components/Container';
import UserMenu from './UserMenu';
import styles from './styles.less';

const App = ( { children } ) => {
  const { display_name } = useContext( UserContext );

  return (
    <div className={ styles.pageWrapper }>
      <Layout>
        <Header className="app-header">
          <a className="app-logo" href="/">
            <img alt="BZ Alpha" src="/static/bzalpha-icon.svg" />
            <span>BZ Alpha</span>
          </a>
          <Menu mode="horizontal">
            <MenuItem>Dashboard</MenuItem>
            <MenuItem>Works</MenuItem>
            <MenuItem>Seamen</MenuItem>
            <MenuItem>Vessels</MenuItem>
            <MenuItem>Principals</MenuItem>
          </Menu>
          <Dropdown overlay={ UserMenu } placement="bottomRight">
            <Badge className="app-user-menu" status="success" dot>
              <Avatar shape="square">{ display_name.charAt(0) }</Avatar>
            </Badge>
          </Dropdown>
        </Header>
        <Content className="app-content">
          { children }
        </Content>
        <Footer>
          <Container>
            <div className="app-footer">
              <span className="app-copy">&copy; 2019 BZ Alpha Navigation</span>
              <ul className="app-quick-links">
                <li><a href="/">Dashboard</a></li>
                <li><a href="/">Works</a></li>
              </ul>
            </div>
          </Container>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
