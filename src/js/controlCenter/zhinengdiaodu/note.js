import React from "react";
import { Button } from "antd";

import "./css/note.scss";

class Note extends React.Component {
  ganbi() {}
  render() {
    return (
      <div className="box">
        <div className="tou">
          <div className="toua">用户（88802000）</div>
          <div className="toub" onClick={this.guanbi}>
            x
          </div>
        </div>
        <div className="content">
          <div className="content-right">右</div>
          <div className="coente-lefr">左</div>
        </div>
        <div className="bottom">
          <textarea></textarea>
          <Button className="an">发送</Button>
        </div>
      </div>
    );
  }
}

export default Note;
