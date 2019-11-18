/**
 * External dependencies.
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import { Upload, Icon, message, Avatar } from 'antd';
import { parseCookies } from 'nookies';

/**
 * Internal dependencies.
 */
import styles from './styles.less';

function getBase64( img, callback ) {
  const reader = new FileReader();
  reader.addEventListener( 'load', () => callback( reader.result ) );
  reader.readAsDataURL( img );
}

function beforeUpload( file ) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if ( ! isJpgOrPng ) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if ( ! isLt2M ) {
    message.error( 'Image must smaller than 2MB!' );
  }
  return isJpgOrPng && isLt2M;
}

class AvatarUpload extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    const { src } = this.props;

    if ( src ) {
      this.setState( { imageUrl: src } );
    }
  }

  handleChange = info => {
    if ( info.file.status === 'uploading' ) {
      this.setState( { loading: true } );
      return;
    }
    if ( info.file.status === 'done' ) {
      // Get this url from response in real world.
      getBase64( info.file.originFileObj, imageUrl =>
        this.setState( {
          imageUrl,
          loading: false,
        } )
      );

      const { onChange } = this.props;
      if ( onChange ) {
        onChange( info.file.response.id || 0 );
      }
    }
  };

  render() {
    const { token } = parseCookies();
    const uploadButton = (
      <div>
        <Icon type={ this.state.loading ? 'loading' : 'plus' } />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    let { className } = this.props;
    className = classnames(
      className,
      'avatar-uploader',
      { [`${ styles.hasFile }`]: imageUrl }
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className={ className }
        showUploadList={ false }
        name="file"
        action="http://bzalpha.test/wp-json/wp/v2/media"
        method="POST"
        headers={ {
          'X-Requested-With': null,
          'Authorization': `Bearer ${ token }`
        } }
        beforeUpload={ beforeUpload }
        onChange={ this.handleChange }
      >
        { imageUrl ? <Avatar src={ imageUrl } size={ 97 } shape="square" /> : uploadButton }
      </Upload>
    );
  }
}

export default AvatarUpload;