/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
var obj = {};
const params = window.location.search.substring(1);
if (params) {
  const paramsArr = params.split("&");
  paramsArr.forEach((v) => {
    const item = v.split("=");
    obj[item[0]] = item[1];
  });
  sessionStorage.setItem("token", obj.token);
}
// 请求接口后 拿到当前区域的数据
var dataEvents;

//参数数组points的每一项为每一个点的：纬度,经度
//如 points = ['30.86660,104.390740', '30.861961,104.386963', '30.842287,104.388079', '点的纬度,点的经度'……];
//返回中心点的数组[纬度,精度]
// function getPointsCenter(points) {
//   var point_num = points.length; //坐标点个数
//   var X = 0,
//     Y = 0;
//   for (let i = 0; i < points.length; i++) {
//     if (points[i] === "") {
//       continue;
//     }
//     let point = points[i].split(",");
//     X += Number(point[0]);
//     Y += Number(point[1]);
//   }
//   return [X / point_num, Y / point_num];
// }

// 定位到电站
function goToHome() {
  // console.log("没有可绘制区域数据-定位到电站");
  // 调用电站列表接口
  if (location.host.indexOf("172.16.9") != -1) {
    // 定位到沂蒙
    if (window.GisMap) {
      GisMap.FlyTo(118.09000366721703, 35.45561690753966, 4000, 0, -50);
    } else {
      drawObj.FlyTo(118.09000366721703, 35.45561690753966, 4000, 0, -50);
    }
  } else if (window.location.host.indexOf("192.168.1.103") !== -1) {
    // 定位到易县
    if (window.GisMap) {
      GisMap.FlyTo(115.29786062595939, 39.4070110008425, 4000, 0, -50);
    } else {
      drawObj.FlyTo(115.29786062595939, 39.4070110008425, 4000, 0, -50);
    }
  }
  else if (window.location.host.indexOf("172.16.114.14") !== -1) {
    // 定位到白山
    if (window.GisMap) {
      GisMap.FlyTo(127.202, 42.714, 1800, 75, -50);
    } else {
      drawObj.FlyTo(127.202, 42.714, 1800, 75, -50);
    }
  } else {
    //定位到点云
    if (window.GisMap) {
      GisMap.FlyTo(116.46047790969708, 39.90000306216944, 10, 0, -25);
    } else {
      drawObj.FlyTo(116.46047790969708, 39.90000306216944, 10, 0, -25);
    }
  }
}

var Ajax = {
  //加载电站项目列表
  Projects() {
    var dataAll = [];
    $.ajax({
      type: "POST",
      headers: { Authorization: sessionStorage.getItem("token") },
      url: "/nelda-basics/pubProject/pagination?t=" + new Date().getTime(),
      async: false,
      // dataType: "json",
      contentType: "application/json;charset=utf-8,charset=UTF-8",
      data: JSON.stringify({}),
      success: function (val) {
        projectList = val;
        dataAll = val;
        // console.log("项目数据列表：" + val);
      },
      error: function (val) {
        // console.log("接口请求失败：" + val.status);
      },
    });
    return dataAll;
  },
  // 全部设备数据
  AllDatasGet() {
    //临时数据储存
    var dataAll = [];
    $.ajax({
      type: "GET",
      async: false,
      url: "/nelda-smcc/public/pubCurrentLocation/getPersonPosition",
      dataType: "json",
      success: function (data) {
        // 处理 坐标数据
        var itemDatas = {};
        var sbType = "";
        for (var i in data.data) {
          // 如果是沂蒙项目 为视频设备 其他项目为摄像机
          if (location.host.indexOf("172.16.9") != -1) {
            sbType = "视频设备";
          } else {
            sbType = "摄像机";
          }
          if (data.data[i].equipment_categories_name == sbType) {
            itemDatas = {
              Tid: data.data[i].equipment_id,
              Ttype: data.data[i].equipment_categories_name,
              // 设备名称
              equipment_id: data.data[i].equipment_id,
              equipment_name: data.data[i].equipment_name,
              // 类别名称
              equipment_categories_name: data.data[i].equipment_categories_name,
              // 类别ID
              equipment_categories_id: data.data[i].equipment_categories_id,
              // 图标Url
              resource_class_icon: data.data[i].resource_class_icon,
              // 经度
              lng: data.data[i].x_coordinate,
              // 纬度
              lat: data.data[i].y_coordinate,
              // 海拔高度
              height: data.data[i].z_coordinate,
              channel_num: data.data[i].channel_num,
              equiment_code: data.data[i].equiment_code,
              equipment_loginname: data.data[i].equipment_loginname,
              equipment_password: data.data[i].equipment_password,
              equipment_ip: data.data[i].equipment_ip,
              equipment_port: data.data[i].equipment_port,
            };
          } else if (data.data[i].equipment_categories_name == "广播") {
            itemDatas = {
              Tid: data.data[i].equipment_id,
              Ttype: data.data[i].equipment_categories_name,
              // 设备名称
              equipment_id: data.data[i].equipment_id,
              equipment_name: data.data[i].equipment_name,
              // 类别名称
              equipment_categories_name: data.data[i].equipment_categories_name,
              // 类别ID
              equipment_categories_id: data.data[i].equipment_categories_id,
              // 图标Url
              resource_class_icon: data.data[i].resource_class_icon,
              // 经度
              lng: data.data[i].x_coordinate,
              // 纬度
              lat: data.data[i].y_coordinate,
              // 海拔高度
              height: data.data[i].z_coordinate,
              location_area_id: data.data[i].location_area_id,
              equipment_number: data.data[i].equipment_number,
            };
          } else {
            itemDatas = {
              Tid: data.data[i].equipment_id,
              Ttype: data.data[i].equipment_categories_name,
              // 设备名称
              equipment_id: data.data[i].equipment_id,
              equipment_name: data.data[i].equipment_name,
              // 类别名称
              equipment_categories_name: data.data[i].equipment_categories_name,
              // 类别ID
              equipment_categories_id: data.data[i].equipment_categories_id,
              // 图标Url
              resource_class_icon: data.data[i].resource_class_icon,
              // 经度
              lng: data.data[i].x_coordinate,
              // 纬度
              lat: data.data[i].y_coordinate,
              // 海拔高度
              height: data.data[i].z_coordinate,
            };
          }

          dataAll.push(itemDatas);
        }
        return dataAll;
      },
      error: function (jqXHR) {
        // console.log("请求错误: " + jqXHR.status);
      },
    });
    return dataAll;
  },
  AllDatasGet_RobotUAV() {
    // 机器人和无人机实时定位 3秒一轮巡
    var dataAll = [];
    $.ajax({
      type: "GET",
      async: false,
      url: "/nelda-smcc/public/pubCurrentLocation/getPersonPosition",
      dataType: "json",
      success: function (data) {
        // 处理 坐标数据
        var itemDatas = {};
        for (var i in data.data) {
          if (
            data.data[i].equipment_categories_name == "机器人" ||
            data.data[i].equipment_categories_name == "无人机"
          ) {
            dataAll.push(data.data[i]);
          }
        }
        return dataAll;
      },
      error: function (jqXHR) {
        // console.log("请求错误: " + jqXHR.status);
      },
    });
    return dataAll;
  },
  //当前电站点位列表
  SitePointsFn() {
    //临时数据储存
    var dataAll = {};
    $.ajax({
      type: "POST",
      headers: { Authorization: sessionStorage.getItem("token") },
      url: "/nelda-basics/pubPointPosition/listQuery",
      async: false,
      // dataType: "json",
      contentType: "application/json;charset=utf-8,charset=UTF-8",
      data: JSON.stringify({}),
      success: function (val) {
        // console.log(val); 
        dataAll = val.data;
        return dataAll;
      },
      error: function (jqXHR) {
        // console.log("请求错误: " + jqXHR.status);
      },
    });
    return dataAll;
  },
  // 保存区域
  SaveArea(data) {
    // dataEvents = {
    //   ...data,
    // };
    // console.log("基础信息区域数据: " + data);
    if (dataEvents && dataEvents != "") {
      dataEvents.mapJson = data;
    } else {
      dataEvents = "";
    }
    // console.log(JSON.stringify(dataEvents));
    $.ajax({
      headers: { Authorization: sessionStorage.getItem("token") },
      type: "POST",
      url: "/nelda-basics/pubLocationArea/updateData",
      async: false,
      contentType: "application/json;charset=utf-8,charset=UTF-8",
      data: JSON.stringify(dataEvents),
      success: function (val) {
        var t = setTimeout(function () {
          alert("区域数据-保存成功");
          obj = {};
          clearTimeout(t);
        }, 500);
        setTimeout(function () {
          open(location, "_self").close();
        }, 2000);
      },
      error: function (val) {
        console.log("区域数据-保存失败");
      },
    });
  },
  // 获取区域信息
  GetArea() {
    // console.log("获取区域信息");
    $.ajax({
      type: "GET",
      url: `/nelda-basics/pubLocationArea/getDataById?id=${obj.id}`,
      async: false,
      headers: { Authorization: sessionStorage.getItem("token") },
      success: function (val) {
        if (!val.data || val.data === "") {
          console.log("这个区域没有数据");
          return;
        }
        console.log("获取区域数据：" + val);
        dataEvents = val.data;
        // console.log(JSON.parse(dataEvents.mapJson));
        if (
          dataEvents.mapJson &&
          dataEvents.mapJson !== "{}" &&
          dataEvents.mapJson !== ""
        ) {
          var positionInfo = JSON.parse(dataEvents.mapJson);
          // console.log(positionInfo.APS);
          if (Array.isArray(positionInfo.APS) && positionInfo.APS.length) {
            // console.log(positionInfo.APS);
            var positions = [];
            for (var s = 0; s < positionInfo.APS.length; s++) {
              if (positionInfo.APS[s] != "") {
                positions.push(
                  Cesium.Cartesian3.fromDegrees(
                    Number(positionInfo.APS[s].split(",")[0]),
                    Number(positionInfo.APS[s].split(",")[1]),
                    Number(positionInfo.APS[s].split(",")[2])
                  )
                );
              }
            }
            // console.log(positions);
            if (
              positionInfo.position &&
              positionInfo.position.x &&
              positionInfo.position.y &&
              positionInfo.position.z
            ) {
              const cartographic = Cesium.Cartographic.fromCartesian(
                positionInfo.position
              ); //根据笛卡尔坐标获取到弧度
              const lng = Cesium.Math.toDegrees(cartographic.longitude); //根据弧度获取到经度
              const lat = Cesium.Math.toDegrees(cartographic.latitude); //根据弧度获取到纬度
              const height = cartographic.height; //模型高度
              // console.log(lng, lat, height);
              drawObj.drawArea(positions, positionInfo);
              if (window.GisMap) {
                GisMap.FlyTo(
                  lng,
                  lat,
                  height,
                  positionInfo.heading,
                  positionInfo.pitch
                );
              } else {
                drawObj.FlyTo(
                  lng,
                  lat,
                  height,
                  positionInfo.heading,
                  positionInfo.pitch
                );
              }
            } else {
              goToHome();
            }
          }
        } else {
          goToHome();
        }
      },
      error: function (val) {
        // console.log("接口请求失败：" + val.status);
      },
    });
  },
  // 检修区域保存区域
  saveLocationArea(data) {
    const newData = {
      ...data,
      id: obj.id,
    };
    $.ajax({
      headers: { Authorization: sessionStorage.getItem("token") },
      type: "POST",
      url: "/nelda-inspection/area/updateMaintenanceAreaStatus",
      async: false,
      contentType: "application/json;charset=utf-8,charset=UTF-8",
      data: JSON.stringify(newData),
      success: function (val) {
        if (val.code === "0") {
          alert(val.data);
          window.close();
        } else {
          alert(val.msg);
        }
      },
      error: function (val) {
        alert("区域数据保存失败");
      },
    });
  },
  // 检修区域绘制区域
  getLocationArea() {
    const newData = {
      pageNo: 1,
      pageSize: 1,
      id: obj.id,
    };
    $.ajax({
      headers: { Authorization: sessionStorage.getItem("token") },
      type: "POST",
      url: "/nelda-inspection/area/getMaintenanceArea",
      async: false,
      contentType: "application/json;charset=utf-8,charset=UTF-8",
      data: JSON.stringify(newData),
      success: function (val) {
        if (val.code === "0") {
          const newObj = val.data.body[0];
          if (
            newObj.mapJson &&
            newObj.mapJson !== "{}" &&
            newObj.mapJson !== ""
          ) {
            const positionInfo = JSON.parse(newObj.mapJson);
            if (Array.isArray(positionInfo.APS) && positionInfo.APS.length) {
              const positions = positionInfo.APS.filter((item) => item).map(
                (v) =>
                  Cesium.Cartesian3.fromDegrees(
                    Number(v.split(",")[0]),
                    Number(v.split(",")[1]),
                    Number(v.split(",")[2])
                  )
              );
              if (
                positionInfo.position &&
                positionInfo.position.x &&
                positionInfo.position.y &&
                positionInfo.position.z
              ) {
                const cartographic = Cesium.Cartographic.fromCartesian(
                  positionInfo.position
                ); //根据笛卡尔坐标获取到弧度
                const lng = Cesium.Math.toDegrees(cartographic.longitude); //根据弧度获取到经度
                const lat = Cesium.Math.toDegrees(cartographic.latitude); //根据弧度获取到纬度
                const height = cartographic.height; //模型高度
                // console.log(lng, lat, height);
                // drawObj.drawPoint(Cesium.Cartesian3.fromDegrees(getPointsCenter(positionInfo.APS)[0], getPointsCenter(positionInfo.APS)[1]), 10);
                drawObj.drawArea(positions, positionInfo);
                if (GisMap) {
                  GisMap.FlyTo(
                    lng,
                    lat,
                    height,
                    positionInfo.heading,
                    positionInfo.pitch
                  );
                } else {
                  drawObj.FlyTo(
                    lng,
                    lat,
                    height,
                    positionInfo.heading,
                    positionInfo.pitch
                  );
                }
              } else {
                goToHome();
              }
            }
          } else {
            goToHome();
          }
        }
      },
      error: function (val) {
        alert("区域数据获取失败");
      },
    });
  },
};
