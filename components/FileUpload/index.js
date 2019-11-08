/**
 * External dependencies.
 */
import React, { Component } from 'react';
import { Upload, Button, Icon } from 'antd';

/**
 * Internal dependencies.
 */
import { isEmpty, pick, isEqual } from 'lodash';

class FileUpload extends Component {
  state = {
    fileList: []
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
      id: this.props.file.id
    } ];
  };

  handleChange = ( info ) => {
    let fileList = [ ...info.fileList ];
    fileList = fileList.slice( -1 );
    fileList = fileList.map( file => {
      if ( file.response ) {
        file.title = file.response.title.rendered;
        file.name = file.response.title.rendered;
        file.url = file.response.source_url;
        file.id = file.response.id;
      }
      return file;
    } );

    this.setState( { fileList: fileList } );

    if ( info.file.status === 'done' ) {
      const { onChange } = this.props;
      if ( onChange ) {
        const keys = [ 'title', 'name', 'url', 'id' ];
        onChange( fileList.length && pick( fileList[0], keys ) );
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
    let { token, onChange, ...props } = this.props;

    props = {
      ...props,
      onChange: this.handleChange,
      onRemove: this.handleRemove,
      multiple: false,
      name: 'file',
      action: 'http://bzalpha.test/wp-json/wp/v2/media',
      method: 'POST',
      headers: {
        'X-Requested-With': null,
        'Authorization': `Bearer ${ this.props.token }`
      },
    };

    return (
      <Upload { ...props } fileList={ this.state.fileList }>
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
    );
  }
}

export default FileUpload;
