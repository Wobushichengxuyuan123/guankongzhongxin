import React from 'react'
import { Upload, Button, Icon, message } from 'antd';
import reqwest from 'reqwest';

export class MyUpload extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  };
  handleUpload = (arg) => {
    // *音频
    if (this.props.disabledUpload) {
      this.props.watchFunUpload({
        emitType: 'startGb',
        gbType: 'audio'
      })
    } else {
      const { fileList } = this.state;
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('files[]', file);
      });

      this.setState({
        uploading: true,
      });

      // You can use any AJAX library you like
/*       reqwest({
        url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        method: 'post',
        processData: false,
        data: formData,
        success: () => {
          this.setState({
            fileList: [],
            uploading: false,
          });
          message.success('upload successfully.');
        },
        error: () => {
          this.setState({
            uploading: false,
          });
          message.error('upload failed.');
        },
      }); */
      this.props.logoutGb()
    }
  };
  stopBroadcast = (parameter) => {
    this.props.stopBroadcast({
      stopType: 'audio'
    })
  }

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onChange: file => {
        console.log('文件路径',fileList);
        console.log(file,'onchange');
      },
      onRemove: file => {
        console.log('文件路径',fileList);
        console.log(file,'remove');
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        console.log('文件路径',fileList);
        console.log('beforeUpload',file);
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    let buttonChange = (parameter) => {
      if(!this.props.isCreate){
        return (
          <Button
          type="primary"
          onClick={this.handleUpload}
          loading={uploading}
          style={{ marginTop: 16, marginRight: 16 }}
        >
          开始广播
        </Button>
        )
      } else {
        return(
          <Button
          type="primary"
          onClick={this.stopBroadcast}
          style={{ marginTop: 16, marginRight: 16 }}
        >
          停止广播
        </Button>
        )
      }
    }
    return (
      <div className="myUploadBox">
        {/* <Upload
        accept=".mp3,.wav"
        disabled={this.props.disabledUpload}
        {...props}>
          <Button>
            <Icon type="upload" /> 选择文件
          </Button>
        </Upload> */}
        {buttonChange()}
        <Button
          onClick={this.props.logoutGb}
          type="primary"
        >
          退出
        </Button>
      </div>
    );
  }
}

