/**
 * External dependencies.
 */
import { Menu } from 'antd';

const UserMenu = () => {
  return (
    <Menu>
      <Menu.Item>
        <a href="/logout">Logout</a>
      </Menu.Item>
    </Menu>
  );
};

export default UserMenu;
