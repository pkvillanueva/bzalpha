/**
 * External dependencies.
 */
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive'
import { Layout, Menu, Icon, Drawer, Dropdown, Avatar, PageHeader } from 'antd';
const { Header, Sider, Content } = Layout;

/**
 * Internal dependencies
 */
import Container from '~/components/Container';
import { UserContext } from '~/store/user';
import { map, pickBy, identity, isEmpty } from 'lodash';
import styles from './styles.less';

const headerMenu = [
  { icon: 'dashboard', title: 'Dashboard', href: '/' },
  { icon: 'database', title: 'BZ Works', href: '/works' },
  { icon: 'team', title: 'Seaman', href: '/seaman' },
  { icon: 'appstore', title: 'Vessels', href: '/vessel' },
  { icon: 'profile', title: 'Principals', href: '/principal' }
];

const userMenu = [
  { title: 'Logout', href: '/logout' },
];

const getActiveKeys = ( pathname ) => {
  let activeKeys = [];

  headerMenu.forEach( ( menuItem ) => {
    if ( pathname.length === 0 || pathname === '/' ) {
      activeKeys.push( 'dashboard' );
    } else if ( menuItem.href === '/' ) {
      return;
    } else if ( pathname.search( menuItem.href ) === 0 ) {
      activeKeys.push( menuItem.icon );
    }
  } );

  return activeKeys;
};

const LayoutSider = ( { collapsed, isMobile } ) => {
  const { pathname } = useRouter();
  const activeKeys = getActiveKeys( pathname );
  const props = {
    trigger: null,
    collapsible: true,
    collapsed: isMobile ? false : collapsed,
    collapsedWidth: isMobile ? 256 : 80,
    width: 256,
    className: styles.sider
  };

  return (
    <Sider { ...props }>
      <div className={ styles.siderLogo }>
        <a href="/">
          <img alt="BZ Alpha" src="/static/logo.svg" />
          <h1>BZ Alpha</h1>
        </a>
      </div>
      <Menu selectedKeys={ activeKeys } theme="dark" mode="inline">
        { map( headerMenu, ( menu ) => (
          <Menu.Item key={ menu.icon }>
            <a href={ menu.href }>
              <Icon type={ menu.icon } />
              <span>{ menu.title }</span>
            </a>
          </Menu.Item>
        ) ) }
      </Menu>
    </Sider>
  );
};

const withMobileDrawer = ( Component, props ) => {
  const { isMobile, collapsed, handleCollapsed } = props;

  if ( isMobile ) {
    return (
      <Drawer
        closable={ false }
        className={ styles.drawer }
        visible={ collapsed }
        onClose={ () => handleCollapsed( false ) }
        placement="left"
      >
        <Component { ...props } />
      </Drawer>
    );
  }
};

const LayoutHeader = ( { isMobile, display_name, collapsed, handleCollapsed, triggerProps } ) => {
  const { pathname } = useRouter();
  const activeKeys = getActiveKeys( pathname );

  const UserMenu = () => (
    <Menu>
      { map( userMenu, ( menu ) => (
        <Menu.Item key={ menu.icon }>
          <a href={ menu.href }>{ menu.title }</a>
        </Menu.Item>
      ) ) }
    </Menu>
  );

  return (
    <Header className={ styles.header }>
      <Container>
        <div className={ styles.headerInner }>
          <div className={ styles.logo }>
            <a href="/">
              <img alt="BZ Alpha" src="/static/logo.svg" />
              <h1>BZ Alpha</h1>
            </a>
          </div>
          { isMobile && <span className={ styles.headerTrigger } onClick={ () => handleCollapsed( ! collapsed ) }>
            <Icon { ...triggerProps } />
          </span> }
          { ! isMobile && <Menu selectedKeys={ activeKeys } className={ styles.headerMenu } theme="dark" mode="horizontal">
            { map( headerMenu, ( menu ) => (
              <Menu.Item key={ menu.icon }>
                <a href={ menu.href }>
                  <Icon type={ menu.icon } />
                  <span>{ menu.title }</span>
                </a>
              </Menu.Item>
            ) ) }
          </Menu> }
          <div className={ styles.headerRight }>
            <Dropdown overlayClassName={ styles.headerDropdown } overlay={ UserMenu } placement="bottomRight">
              <div className={ styles.headerAction }>
                <Avatar size="small" className={ styles.headerAvatar }>
                  { display_name.charAt( 0 ).toUpperCase() }
                </Avatar>
                <span>{ display_name }</span>
              </div>
            </Dropdown>
          </div>
        </div>
      </Container>
    </Header>
  );
};

const LayoutContent = ( props ) => {
  let { children, breadcrumb, pageHeaderContent, ...pageHeaderProps } = props;
  const itemRender = ( route, params, routes, paths ) => {
    const last = routes.indexOf( route ) === routes.length - 1;
    return last ? (
      <span>{ route.breadcrumbName }</span>
    ) : (
      <a href={ `/${ paths.join( '/' ) }` }>{ route.breadcrumbName }</a>
    );
  }

  pageHeaderProps = pickBy( {
    breadcrumb: breadcrumb ? { routes: breadcrumb, itemRender: itemRender } : false,
    ...pageHeaderProps
  }, identity );
  if ( pageHeaderContent ) {
    pageHeaderProps.children = pageHeaderContent;
  }

  return (
    <Content className={ styles.content }>
      { ! isEmpty( pageHeaderProps ) ?
        <div className={ styles.pageHeader }>
          <Container>
            <PageHeader className={ styles.pageHeaderInner } { ...pageHeaderProps } />
          </Container>
        </div> :
        undefined
      }
      <Container>
        { children }
      </Container>
    </Content>
  );
};

const _Layout = ( { title, subTitle, breadcrumb, pageHeaderContent, children, footer, avatar, extra } ) => {
  const isMobile = useMediaQuery( { query: '(max-width: 768px)' } );
  const { display_name } = useContext( UserContext );
  const [ collapsed, setCollapsed ] = useState( false );
  const handleCollapsed = ( status ) => {
    setCollapsed( status );
  };
  const siderProps = {
    collapsed,
    handleCollapsed,
    isMobile
  };
  const headerProps = {
    isMobile,
    display_name,
    collapsed,
    handleCollapsed,
    triggerProps: {
      type: collapsed || isMobile ? 'menu-unfold' : 'menu-fold'
    }
  };
  const pageHeaderProps = {
    title,
    subTitle,
    breadcrumb,
    pageHeaderContent,
    footer,
    extra,
    avatar
  };
  const contentProps = {
    children
  };

  return (
    <Layout>
      { withMobileDrawer( LayoutSider, siderProps ) }
      <Layout className={ styles.layout }>
        <LayoutHeader { ...headerProps } />
        <LayoutContent { ...pageHeaderProps } { ...contentProps } />
      </Layout>
    </Layout>
  );
}

export default _Layout;
