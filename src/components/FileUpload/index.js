/**
 * External dependencies.
 */
import React, { Component, forwardRef } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';
import { parseCookies } from 'nookies';
const { token } = parseCookies();

/**
 * Internal dependencies.
 */
import { isEmpty, pick, isEqual } from 'lodash';

class FileUpload extends Component {
	state = {
		fileList: [],
	};

	componentDidMount = () => {
		this.setState( { fileList: this.getFile() } );
	};

	componentDidUpdate = ( prevProps ) => {
		if ( ! isEqual( this.props.file, prevProps.file ) ) {
			this.setState( { fileList: this.getFile() } );
		}
	};

	getFile = () => {
		return isEmpty( this.props.file ) ? [] : [ {
			uid: 1,
			status: 'done',
			name: this.props.file.title,
			url: this.props.file.url,
			id: this.props.file.id,
		} ];
	};

	handleChange = ( info ) => {
		let fileList = [ ...info.fileList ];
		fileList = fileList.slice( -1 );
		fileList = fileList.map( ( file ) => {
			if ( file.response ) {
				file.title = file.response.title;
				file.name = file.response.title;
				file.url = file.response.source_url;
				file.source_url = file.response.source_url;
				file.id = file.response.id;
			}
			return file;
		} );

		this.setState( { fileList } );

		if ( info.file.status === 'done' ) {
			const { onChange } = this.props;
			if ( onChange ) {
				const keys = [ 'title', 'name', 'url', 'source_url', 'id' ];
				onChange( fileList.length && pick( fileList[ 0 ], keys ) );
			}
		}
	};

	handleRemove = () => {
		this.setState( { fileList: [] } );

		const { onChange } = this.props;
		if ( onChange ) {
			onChange( undefined );
		}
	};

	render() {
		let { text, ...props } = this.props;

		text = text || 'Click to Upload';
		props = {
			...props,
			onChange: this.handleChange,
			onRemove: this.handleRemove,
			multiple: false,
			name: 'file',
			action: `${ process.env.API_URL }/wp-json/wp/v2/media`,
			method: 'POST',
			headers: {
				'X-Requested-With': null,
				Authorization: `Bearer ${ token }`,
			},
		};

		return (
            <Upload { ...props } fileList={ this.state.fileList }>
				<Button icon={<UploadOutlined />} block>
					{ text }
				</Button>
			</Upload>
        );
	}
}

const wrapFileUpload = ( props, ref ) => {
	return <FileUpload { ...props } ref={ ref } />;
};

export default forwardRef( wrapFileUpload );
