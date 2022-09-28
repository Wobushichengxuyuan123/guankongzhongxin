import React, { Component } from "react";
import Style from "./statisticalAnalysis.module.scss";
// import VideoComplete from "./videoComplete/videoComplete";
import VideoComplete2 from "./videoComplete/videoComplete2";
// import OnlineDuration from "./onlineDuration/onlineDuration.js";
// import RunDay from "./runDay/runDay.js";
// import InspectionOmit from "./inspectionOmit/inspectionOmit.js";
import WorkCloseLoop from "./workCloseLoop/workCloseLoop.js";
// import InspectionAndResult from "./inspectionAndResult/inspectionAndResult.js";
import {
  videoComplete,
  onlineDuration,
  runDay,
  inspectionOmit,
  // workCloseLoop,
  inspectionAndResult,
  patrolTask,
} from "./config";
class statisticalAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnShowKey: "videoComplete",
      openFlag: true,
      menuList: {
        videoComplete: {
          key: videoComplete,
          name: "录像完整率统计",
          // component: (
          //   <WorkCloseLoop
          //     key={"videoComplete"}
          //     comKey="videoComplete"
          //     comName="录像完整率统计"
          //     parent={this}
          //   ></WorkCloseLoop>
          // ),
          component: <VideoComplete2 comName="录像完整率统计" parent={this} />,
        },
        onlineDuration: {
          key: onlineDuration,
          name: "在线时长统计",
          component: (
            <WorkCloseLoop
              key={onlineDuration}
              comKey={onlineDuration}
              comName="在线时长统计"
              parent={this}
            ></WorkCloseLoop>
          ),
          // component: <OnlineDuration comName="在线时长统计" parent={this} />,
        },
        runDay: {
          key: runDay,
          name: "运行天数统计",
          // component: <RunDay comName="运行天数统计" parent={this} />,
          component: (
            <WorkCloseLoop
              key={runDay}
              comKey={runDay}
              comName="运行天数统计"
              parent={this}
            ></WorkCloseLoop>
          ),
        },
        inspectionOmit: {
          key: inspectionOmit,
          name: "巡视漏检率统计",
          component: (
            <WorkCloseLoop
              isShowControlBtn={true}
              key={inspectionOmit}
              comKey={inspectionOmit}
              comName="巡视漏检率统计"
              parent={this}
            />
          ),
        },
        // workCloseLoop: {
        //   key: workCloseLoop,
        //   name: "任务闭环率统计",
        //   component: (
        //     <WorkCloseLoop
        //       isShowControlBtn={true}
        //       key={"workCloseLoop"}
        //       comKey="workCloseLoop"
        //       comName="任务闭环率统计"
        //       parent={this}
        //     ></WorkCloseLoop>
        //   ),
        // },
        inspectionAndResult: {
          key: inspectionAndResult,
          name: "巡视告警和结果统计",
          component: (
            <WorkCloseLoop
              isShowControlBtn={true}
              key={inspectionAndResult}
              comKey={inspectionAndResult}
              comName="巡视告警和结果统计"
              parent={this}
            ></WorkCloseLoop>
          ),
        },
        patrolTask: {
          key: patrolTask,
          name: "巡视任务统计",
          component: (
            <WorkCloseLoop
              isSupportExport={true}
              isShowControlBtn={true}
              key={patrolTask}
              comKey={patrolTask}
              comName="巡视任务统计"
              parent={this}
            ></WorkCloseLoop>
          ),
        },
      },
    };
  }
  renderCom() {
    return;
  }
  setBtnShowKey(btnShowKey) {
    this.setState({
      btnShowKey,
    });
  }
  render() {
    let { btnShowKey, openFlag, menuList } = this.state;
    let backClassName = (v, btnShowKey) => {
      let className =
        Style.menu_item +
        " " +
        v +
        " " +
        (btnShowKey === v ? Style.active : "");
      return className;
    };
    return (
      <div className={Style.root}>
        <div
          style={{ display: openFlag ? "block" : "none" }}
          className={Style.leftMenu}
        >
          {Object.keys(menuList).map((v) => {
            return (
              <div
                key={v}
                className={backClassName(v, btnShowKey)}
                onClick={this.setBtnShowKey.bind(this, v)}
              >
                {menuList[v]["name"]}
              </div>
            );
          })}
        </div>
        <div className={Style.content}>{menuList[btnShowKey]["component"]}</div>
      </div>
    );
  }
}

export default statisticalAnalysis;
