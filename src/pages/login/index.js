/**
 * External dependencies.
 */
import React, { useState } from 'react';
import { setCookie } from 'nookies';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, Checkbox, Card, Layout, Alert, Form } from 'antd';
import Router from 'next/router';
import { useMutation } from 'react-query';

/**
 * Internal dependencies.
 */
import { userLoginQuery } from '../../queries';
import withNoAuth from '~/utils/withNoAuth';
import styles from './styles.less';

const Login = () => {
	const [ mutate, { isLoading, isSuccess, isError } ] = useMutation( userLoginQuery );
	const formSubmit = async ( values ) => {
		try {
			const user = await mutate( values );
			setCookie( {}, 'token', user.token );
			setCookie( {}, 'display_name', user.user_display_name );
			setCookie( {}, 'email', user.user_email );
			setCookie( {}, 'nice_name', user.user_nicename );
			Router.push( '/' );
		} catch ( error ) {
			// Do nothing.
		}
	};

	return (
		<Layout>
			<Layout.Content className={ styles.content }>
				<img className={ styles.logo } alt="BZ Alpha" src="/bzalpha-logo.svg" />
				<Card className={ styles.card }>
					<Form name="login" onFinish={ formSubmit }>
						{ isError && <Form.Item>
							<Alert message="Invalid username or password." type="error" showIcon />
						</Form.Item> }
						<Form.Item
							name="username"
							rules={ [ { required: true, message: 'Please enter your username.' } ] }
						>
							<Input
								prefix={ <UserOutlined className={ styles.icon } /> }
								placeholder="Username"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={ [ { required: true, message: 'Please enter your password.' } ] }
						>
							<Input
								prefix={ <LockOutlined className={ styles.icon } /> }
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item
							className={ styles.actions }
							name="remember"
							valuePropName="checked"
							initialValue={ true }
						>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>
						<Button
							loading={ isLoading || isSuccess }
							type="primary"
							htmlType="submit"
							className={ styles.submit }
						>
							Log in
						</Button>
					</Form>
				</Card>
			</Layout.Content>
		</Layout>
	);
};

export default withNoAuth( Login );
