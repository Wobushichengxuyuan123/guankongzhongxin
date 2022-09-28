/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
//全部项目标注点
var ProjecListEnetityAll = [];
//项目列表
var ProjecList = {};
//全部设备标注点
var ShebeiEnetityAll = [];
//设备列表
var ShebeiList = {};
// 人员列表
var personalList = [];
// 车辆列表
var carList = [];
//是否新建点位 0不新建点位 1新建点位 2修改点位
var newPoint = 0;
// 新建点位的实体 再次新建时要删除之前新建的点
var newPointEnetity = {};
//获取点位列表
var pointsNowSiteList = {};
//机器人和无人机实时定位
var RobotUAV_New = [];
//机器人和无人机实时定位 实例
var LabelEnetity_RobotUAV = [];
//机器人和无人机实时定位 定时器
var RobotUAV_New_Time = {};
// 当前点击选中的风险或设备对象
var clickDataObj = {};
var GisMap = {
  init() {
    //加载全部电站项目列表
    ProjecList = Ajax.Projects();
    // console.log("项目列表：" + ProjecList);
    if (ProjecList && ProjecList.data && ProjecList.data.list > 0) {
      for (var d = 0; d < ProjecList.data.list.length; d++) {
        if (
          ProjecList.data.list[d].xCoordinate &&
          ProjecList.data.list[d].yCoordinate &&
          ProjecList.data.list[d].zCoordinate
        ) {
          GisMap.drawPoint(ProjecList.data.list[d], "电站");
        } else {
          console.log("电站经纬度错误！");
        }
      }
    } else {
      console.log("没有电站信息");
    }
    // 加载全部设备 或某电站数据
    ShebeiList = Ajax.AllDatasGet();
    // console.log("全部设备数据条数：" + ShebeiList.length);

    //如果是管控中心 则加载全部设备数据 如果是大屏则不加载全部数据
    if (window.location.href.indexOf("centerSecond") == -1) {
      if (ShebeiList && ShebeiList.length > 0) {
        for (var s = 0; s < ShebeiList.length; s++) {
          // console.log(ShebeiList[s]);
          if (ShebeiList[s].lng && ShebeiList[s].lat && ShebeiList[s].height) {
            GisMap.drawPoint(ShebeiList[s], "设备");
          } else {
            // console.log("设备经纬度错误！");
          }
        }
      } else {
        console.log("没有设备信息");
      }
    }
  },
  shebeiType(type) {
    //设备分类
    console.log("点击了类型：" + type);
    var types = JSON.parse(type);

    //删除所有设备
    if (ShebeiEnetityAll && ShebeiEnetityAll.length > 0) {
      for (var f = 0; f < ShebeiEnetityAll.length; f++) {
        viewer.entities.remove(ShebeiEnetityAll[f]);
      }
    }
    //绘制图标
    if (ShebeiList && ShebeiList.length > 0) {
      for (var s = 0; s < ShebeiList.length; s++) {
        for (var g = 0; g < types.length; g++) {
          // console.log(ShebeiList[s]);
          if (ShebeiList[s].equipment_categories_name == types[g]) {
            // console.log(ShebeiList[s]);
            if (
              ShebeiList[s].lng &&
              ShebeiList[s].lat &&
              ShebeiList[s].height
            ) {
              GisMap.drawPoint(ShebeiList[s], "设备");
            } else {
              // console.log("设备经纬度错误！");
            }
          }
        }
      }
    } else {
      console.log("没有设备信息");
    }
  },
  //UI相关处理
  //传输点击的实体数据
  //如果点击的是报警 直接获取报警名称
  UIConfing(Tid, Ttype, BaojingName, Ttype_type) {
    //各种类型弹层
    // 如果点击的是电站
    if (Ttype == "电站") {
      for (var i = 0; i < ProjecList.data.list.length; i++) {
        if (ProjecList.data.list[i].id == Tid) {
          $("#Mark_1").html(
            "<i>×</i>" +
              "<div><span>设备名称：</span><span>" +
              ProjecList.data.list[i].projectName +
              "</span></div>" +
              "<div><span>监管单位：</span><span>" +
              ProjecList.data.list[i].superviseCompany +
              "</span></div>" +
              "<div><span>施工单位：</span><span>" +
              ProjecList.data.list[i].designCompany +
              "</span></div>"
          );
          $("#Mark_1").css("display", "block");
          //关闭广告牌
          $("#Mark_1 > i").on("click", function () {
            //关闭Div弹层
            GisMap.MarkRemove();
          });
          return;
        }
      }
    }
    if (Ttype == "设备") {
      var sbType = "";
      // 如果是沂蒙项目 为视频设备 其他项目为摄像机
      // location.host.indexOf("172.16.9") != -1 ||
      //   location.host.indexOf("192.168.1.100") != -1 ||
      //   location.host.indexOf("8.142.19.151") != -1 ||
      //   location.host.indexOf("localhost") != -1
      if (Ttype_type && Ttype_type=="摄像机" || Ttype_type && Ttype_type=="视频设备") {
        sbType = Ttype_type;
      }
      for (var i = 0; i < ShebeiList.length; i++) {
        if (ShebeiList[i].equipment_id == Tid) {
          clickDataObj = {
            equipment_id: Tid,
            equipment_name: ShebeiList[i].equipment_name,
            equipment_categories_name: ShebeiList[i].equipment_categories_name,
            channel_num: ShebeiList[i].channel_num,
            equiment_code: ShebeiList[i].equiment_code,
            id: ShebeiList[i].equipment_id,
            xCoordinate: ShebeiList[i].lng,
            yCoordinate: ShebeiList[i].lat,
            zCoordinate: ShebeiList[i].height,
          };
          // window.markData(JSON.stringify(clickDataObj));
          if (window.markData) {
            window.markData(JSON.stringify(clickDataObj));
          }

          if (ShebeiList[i].equipment_categories_name == sbType) {
            console.log(ShebeiList[i]);
            $("#Mark_1").html(
              "<i>×</i>" +
                "<div><span>设备名称：</span><span>" +
                ShebeiList[i].equipment_name +
                "</span></div>" +
                "<div><span>设备类别：</span><span>" +
                ShebeiList[i].equipment_categories_name +
                "</span></div>" +
                "<strong class='CameraOpen'>监控</span>" +
                "</strong>"
            );
            $("#Mark_1").css("display", "block");
            //关闭广告牌
            $("#Mark_1 > i").on("click", function () {
              //关闭Div弹层
              GisMap.MarkRemove();
            });
            var d = {
              id: ShebeiList[i].equipment_id,
              loginname: ShebeiList[i].equipment_name,
              password: ShebeiList[i].equipment_password,
              ip: ShebeiList[i].equipment_ip,
              port: ShebeiList[i].equipment_port,
              code: ShebeiList[i].equiment_code,
              serial: ShebeiList[i].channel_num,
            };
            // 打开摄像机
            $(".CameraOpen").on("click", function () {
              console.log(d);
              window.controlVideoCon(JSON.stringify(d));
            });
          } else if (ShebeiList[i].equipment_categories_name == "道闸") {
            $("#Mark_1").html(
              "<i>×</i>" +
                "<div><span>设备名称：</span><span>" +
                ShebeiList[i].equipment_name +
                "</span></div>" +
                "<div><span>设备类别：</span><span>" +
                ShebeiList[i].equipment_categories_name +
                "</span></div>" +
                "<strong class='DaozhaCK'>常开</span>" +
                "</strong>" +
                "<strong class='DaozhaGB'>关门</span>" +
                "</strong>" +
                "<strong class='DaozhaKQ'>开门</span>" +
                "</strong>"
            );
            $("#Mark_1").css("display", "block");
            //关闭广告牌
            $("#Mark_1 > i").on("click", function () {
              //关闭Div弹层
              GisMap.MarkRemove();
            });
            var d = {
              sourceEquipmentId: ShebeiList[i].equipment_id,
            };
            // 开启道闸
            $(".DaozhaKQ").on("click", function () {
              d.type = 0;
              window.chedaoDoor(JSON.stringify(d));
            });
            // 关闭道闸
            $(".DaozhaGB").on("click", function () {
              d.type = 1;
              window.chedaoDoor(JSON.stringify(d));
            });
            // 常开道闸
            $(".DaozhaCK").on("click", function () {
              d.type = 3;
              window.chedaoDoor(JSON.stringify(d));
            });
          } else if (
            ShebeiList[i].equipment_categories_name == "门禁" ||
            ShebeiList[i].equipment_categories_name == "门禁控制主机" ||
            ShebeiList[i].equipment_categories_name == "人脸识别一体机"
          ) {
            $("#Mark_1").html(
              "<i>×</i>" +
                "<div><span>设备名称：</span><span>" +
                ShebeiList[i].equipment_name +
                "</span></div>" +
                "<div><span>设备类别：</span><span>" +
                ShebeiList[i].equipment_categories_name +
                "</span></div>" +
                "<strong class='MenjinCG'>常关</span>" +
                "</strong>" +
                "<strong class='MenjinCK'>常开</span>" +
                "</strong>" +
                "<strong class='MenjinGB'>关门</span>" +
                "</strong>" +
                "<strong class='MenjinKQ'>开门</span>" +
                "</strong>"
            );
            $("#Mark_1").css("display", "block");
            //关闭广告牌
            $("#Mark_1 > i").on("click", function () {
              //关闭Div弹层
              GisMap.MarkRemove();
            });
            // 开启道闸
            var d = {
              id: ShebeiList[i].equipment_id,
            };
            // 开启门禁
            $(".MenjinKQ").on("click", function () {
              d.type = 2;
              window.handerDoor(JSON.stringify(d));
            });
            // 关闭门禁
            $(".MenjinGB").on("click", function () {
              d.type = 1;
              window.handerDoor(JSON.stringify(d));
            });
            // 常开门禁
            $(".MenjinCK").on("click", function () {
              d.type = 0;
              window.handerDoor(JSON.stringify(d));
            });
            // 常关门禁
            $(".MenjinCG").on("click", function () {
              d.type = 3;
              window.handerDoor(JSON.stringify(d));
            });
          } else if (ShebeiList[i].equipment_categories_name == "广播") {
            $("#Mark_1").html(
              "<i>×</i>" +
                "<div><span>设备名称：</span><span>" +
                ShebeiList[i].equipment_name +
                "</span></div>" +
                "<div><span>设备类别：</span><span>" +
                ShebeiList[i].equipment_categories_name +
                "</span></div>" +
                "<strong class='CameraOpen'>开启</span>" +
                "</strong>" +
                "<strong class='CameraOpen'>关闭</span>" +
                "</strong>"
            );
            $("#Mark_1").css("display", "block");
            //关闭广告牌
            $("#Mark_1 > i").on("click", function () {
              //关闭Div弹层
              GisMap.MarkRemove();
            });
          } else if (ShebeiList[i].equipment_categories_name == "机器人") {
            $("#Mark_1").html(
              "<i>×</i>" +
                "<div><span>设备名称：</span><span>" +
                ShebeiList[i].equipment_name +
                "</span></div>" +
                "<div><span>设备类别：</span><span>" +
                ShebeiList[i].equipment_categories_name +
                "</span></div>"
            );
            $("#Mark_1").css("display", "block");
            //关闭广告牌
            $("#Mark_1 > i").on("click", function () {
              //关闭Div弹层
              GisMap.MarkRemove();
            });
          } else if (ShebeiList[i].equipment_categories_name == "无人机") {
            $("#Mark_1").html(
              "<i>×</i>" +
                "<div><span>设备名称：</span><span>" +
                ShebeiList[i].equipment_name +
                "</span></div>" +
                "<div><span>设备类别：</span><span>" +
                ShebeiList[i].equipment_categories_name +
                "</span></div>"
            );
            $("#Mark_1").css("display", "block");
            //关闭广告牌
            $("#Mark_1 > i").on("click", function () {
              //关闭Div弹层
              GisMap.MarkRemove();
            });
          } else {
            clickDataObj = {
              equipment_id: Tid,
              equipment_name: ShebeiList[i].equipment_name,
              equipment_categories_name:
                ShebeiList[i].equipment_categories_name,
              channel_num: ShebeiList[i].channel_num,
              equiment_code: ShebeiList[i].equiment_code,
              id: ShebeiList[i].equipment_id,
              xCoordinate: ShebeiList[i].lng,
              yCoordinate: ShebeiList[i].lat,
              zCoordinate: ShebeiList[i].height,
            };
            // window.markData(JSON.stringify(clickDataObj));
            if (window.markData) {
              window.markData(JSON.stringify(clickDataObj));
            }
            $("#Mark_1").html(
              "<i>×</i>" +
                "<div><span>设备名称：</span><span>" +
                ShebeiList[i].equipment_name +
                "</span></div>" +
                "<div><span>设备类别：</span><span>" +
                ShebeiList[i].equipment_categories_name +
                "</span></div>"
              // "<strong class='CameraOpen'>监控</span>" +
              // "</strong>"
            );
            $("#Mark_1").css("display", "block");
            //关闭广告牌
            $("#Mark_1 > i").on("click", function () {
              //关闭Div弹层
              GisMap.MarkRemove();
            });
          }
        }
      }
    }
    if (Ttype == "报警") {
      console.log("BaojingName " + BaojingName);
      $("#Mark_1").html(
        "<i>×</i>" +
          "<div><span>报警名称：</span><span>" +
          BaojingName +
          "</span></div>"
      );
      $("#Mark_1").css("display", "block");
      //关闭广告牌
      $("#Mark_1 > i").on("click", function () {
        //关闭Div弹层
        GisMap.MarkRemove();
      });
    }
    if (Ttype === "人员") {
      const currentObj = personalList.filter((v) => v.id)[0] || {};
      console.log(currentObj);
      $("#defence").html(`
          <div class="header1">
            <i class="Marks1_i" onclick="cameraClose()">×</i>
          </div>
          <div class="container">
            <header class="personType">人员详情</header>
            <img id="personerImg" width="100%" src=${currentObj.personPic} alt="照片" />
            <p class="personType">
              <span class="label">姓名:</span>
              <span class="personName">${currentObj.personName}</span>
            </p>
            <p>
              <span class="label">所属单位:</span>
              <span class="deptName">${currentObj.deptName}</span>
            </p>
            <p>
              <span class="label">捕捉时间:</span>
              <span class="dateTime">${currentObj.dateTime}</span>
            </p>
            <p>
              <span class="label">捕捉区域:</span>
              <span class="locationAreaName">${currentObj.locationAreaName}</span>
            </p>
            <p>
              <span class="label">识别结果类型:</span>
              <span class="result">${currentObj.personType}</span>
            </p>
          </div>
          <div class="err"></div>
        `);
      $("#defence").css("display", "block");
      //关闭广告牌
      $(".Marks1_i").on("click", function () {
        //关闭Div弹层
        $("#defence").css("display", "none");
      });
    }
    if (Ttype === "车辆") {
      const currentObj = carList.filter((v) => v.id)[0] || {};
      console.log(currentObj);
      $("#defence").html(`
          <div class="header1">
            <i class="Marks1_i" onclick="cameraClose()">×</i>
          </div>
          <div class="container">
            <header class="personType">人员详情</header>
            <img id="personerImg" width="100%" src=${currentObj.carPic} alt="照片" />
            <p class="carType">
              <span class="label">车牌号:</span>
              <span class="carNo">${currentObj.carNo}</span>
            </p>
            <p class="carType">
              <span class="label">联系人:</span>
              <span class="carDriverName">${currentObj.carDriverName}</span>
            </p>
            <p>
              <span class="label">联系电话:</span>
              <span class="personPhone">${currentObj.personPhone}</span>
            </p>
            <p>
              <span class="label">所属单位:</span>
              <span class="deptName">${currentObj.deptName}</span>
            </p>
            <p>
              <span class="label">捕捉时间:</span>
              <span class="dateTime">${currentObj.dateTime}</span>
            </p>
            <p>
              <span class="label">捕捉区域:</span>
              <span class="locationAreaName">${currentObj.locationAreaName}</span>
            </p>
            <p>
              <span class="label">识别结果类型:</span>
              <span class="result">${currentObj.personType}</span>
            </p>
          </div>
          <div class="err"></div>
        `);
      $("#defence").css("display", "block");
      //关闭广告牌
      $(".Marks1_i").on("click", function () {
        //关闭Div弹层
        $("#defence").css("display", "none");
      });
    }
  },
  // 区域定位
  LonLatToGis(val) {
    console.log("区域定位: " + val);
    var data = JSON.parse(val);
    if (data.map_json && data.map_json !== "{}" && data.map_json !== "") {
      var positionInfo = JSON.parse(data.map_json);
      console.log(positionInfo.APS);
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
        console.log(positions);
        drawObj.clearDrawEntities();
        GisMap.drawArea(positions, positionInfo);
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
          console.log(lng, lat, height);
          GisMap.FlyTo(
            lng,
            lat,
            height,
            positionInfo.heading,
            positionInfo.pitch
          );
        } else {
          // 调用电站列表接口
          //判断是否是沂蒙项目
          if (window.location.host.indexOf("172.16.9") >= 0) {
            // 定位到沂蒙
            if (GisMap) {
              GisMap.FlyTo(118.09000366721703, 35.45561690753966, 4000, 0, -50);
            } else {
              drawObj.FlyTo(
                118.09000366721703,
                35.45561690753966,
                4000,
                0,
                -50
              );
            }
          } //判断是否是易县项目
          else if (window.location.host.indexOf("192.168.1.103") != -1) {
            if (GisMap) {
              GisMap.FlyTo(115.29786062595939, 39.4070110008425, 10, 0, -25);
            } else {
              drawObj.FlyTo(115.29786062595939, 39.4070110008425, 10, 0, -25);
            }
          } else if (window.location.host.indexOf("192.168.1.112") != -1) {
            if (GisMap) {
              GisMap.FlyTo(115.29786062595939, 39.4070110008425, 10, 0, -25);
            } else {
              drawObj.FlyTo(115.29786062595939, 39.4070110008425, 10, 0, -25);
            }
          } else if (window.location.host.indexOf("172.16.114.14") != -1) {
            if (GisMap) {
              GisMap.FlyTo(127.202, 42.714, 1800, 75, -50);
            } else {
              GisMap.FlyTo(127.202, 42.714, 1800, 75, -50);
            }
          } else if (
            window.location.host.indexOf("192.168.1.100") != -1 ||
            window.location.host.indexOf("8.142.19.151") != -1 ||
            window.location.host.indexOf("localhost") != -1
          ) {
            //定位到点云
            if (GisMap) {
              GisMap.FlyTo(118.785366, 31.90726, 7, 20, -20);
            } else {
              drawObj.FlyTo(118.785366, 31.90726, 7, 20, -20);
            }
          }
        }
      }
    } else {
      alert("此区域没有绘制区域");
      // 调用电站列表接口
      // drawObj.FlyTo(118.09000366721703, 35.45561690753966, 4000, 0, -50);
    }
  },
  // 区域绘制
  drawArea: function (positions, positionInfo) {
    positions.map((v) => drawObj.drawPoint(v));
    drawObj.drawPolyline(positions);
    drawObj.drawPolyline([positions[positions.length - 1], positions[0]]);
    drawObj.drawPolygon(positions, {
      color: positionInfo.aeraColor,
      opacity: positionInfo.aeraOpacity,
    });
  },
  //空间测量UI
  measureUI() {
    $("body").append(
      '<div id="Layerui">' +
        "<div class='measureUID1 mea1_0'>" +
        "<div class='measureUID1_1'>" +
        "<strong>测量</strong>" +
        '<i class="measureUIi mea1_3"><img src ="./Gisweb/img/closed.png" /></i>' +
        "</div>" +
        "<div class='measureUID1_2'>" +
        "<p><span class='meas_1 mea1_1'>" +
        "空间距离" +
        "</span>" +
        "<span class='meas_2 mea1_2'>" +
        "三维测量" +
        "</span></p>" +
        "</div>" +
        "</div>" +
        "<div class='measureUID1 mea2_0'>" +
        "<div class='measureUID1_1'>" +
        "<strong>漫游</strong>" +
        '<i class="measureUIi mea2_3"><img src ="./Gisweb/img/closed.png" /></i>' +
        "</div>" +
        "<div class='measureUID1_2'>" +
        "<p><span class='meas_1 mea2_1'>" +
        "绘制路径" +
        "</span>" +
        "<span class='meas_2 mea2_2'>" +
        "开始漫游" +
        "</span>" +
        "<span class='meas_2 mea2_2_1'>" +
        "暂停漫游" +
        "</span>" +
        // "<span class='meas_2 mea2_my'>" +
        // "预设漫游路径" +
        // "</span>" +
        "</p>" +
        "</div>" +
        "</div>" +
        "</div>"
    );
    $(".meas_1,.meas_2,.measureUIi").on("click", function () {
      $(".meas_1,.meas_2").removeClass("measureOnclick");
      $(this).addClass("measureOnclick");
      // 如果是空间距离
      //弹出一个提示层
      if ($(this).hasClass("mea1_1")) {
        layer.msg("开始测空间距离 鼠标右击结束");
        GisMap.MeasureStart1();
      }
      // 如果是三维测量
      if ($(this).hasClass("mea1_2")) {
        layer.msg("开始三维测量");
        GisMap.MeasureStart2();
      }
      //清除测量
      if ($(this).hasClass("mea1_3")) {
        layer.msg("清除测量");
        GisMap.MeasureClear();
      }
      //绘制路径
      if ($(this).hasClass("mea2_1")) {
        layer.msg("绘制漫游路径");
        GisMap.RoamDraw();
      }
      //开始漫游
      if ($(this).hasClass("mea2_2")) {
        layer.msg("开始漫游");
        GisMap.RoamStart();
      }
      if ($(this).hasClass("mea2_2_1")) {
        layer.msg("暂停漫游");
        GisMap.RoamPause();
      }
      //预设漫游路径
      if ($(this).hasClass("mea2_my")) {
        layer.msg("预设漫游路径");
        GisMap.RoamPresets();
      }
      //结束漫游
      if ($(this).hasClass("mea2_3")) {
        layer.msg("结束漫游");
        GisMap.RoamEnd();
      }
    });
  },
  // 点位绘制
  drawPoint(LngLon, Ttype) {
    // console.log(LngLon);
    var imageNew = "";
    if (LngLon.resource_class_icon) {
      imageNew = LngLon.resource_class_icon;
    } else {
      imageNew = "Gisweb/img/dztu1.png";
    }
    if (Ttype == "电站") {
      LngLon.xCoordinate = Number(LngLon.xCoordinate);
      LngLon.yCoordinate = Number(LngLon.yCoordinate);
      LngLon.zCoordinate = Number(LngLon.zCoordinate);
      // 添加广告牌实体标注
      var LabelEnetity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          LngLon.xCoordinate,
          LngLon.yCoordinate,
          LngLon.zCoordinate
        ),
        // point: {
        //   color: Cesium.Color.RED, //点位颜色
        //   pixelSize: 10, //像素点大小
        // },
        billboard: {
          image: imageNew,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: 1,
        },
        label: {
          text: LngLon.projectName,
          font: "13px Source Han Sans CN", //字体样式
          fillColor: Cesium.Color.while, //字体颜色
          backgroundColor: Cesium.Color.Blue, //背景颜色
          showBackground: true, //是否显示背景颜色
          style: Cesium.LabelStyle.FILL, //label样式
          // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          // outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
          pixelOffset: new Cesium.Cartesian2(0, -30), //偏移
        },
      });
      LabelEnetity.Ttype = Ttype;
      LabelEnetity.Tid = LngLon.id;
      LabelEnetity.lng = LngLon.xCoordinate;
      LabelEnetity.lon = LngLon.yCoordinate;
      LabelEnetity.height = LngLon.zCoordinate;
      ProjecListEnetityAll.push(LabelEnetity);
      console.log(ProjecListEnetityAll);
    }
    if (Ttype == "设备") {
      LngLon.lng = Number(LngLon.lng);
      LngLon.lat = Number(LngLon.lat);
      LngLon.height = Number(LngLon.height);
      // console.log("LngLon " + JSON.stringify(LngLon));
      // 广告牌图标设置
      var Newicon = "";
      if (LngLon.Ttype == "机器人" || LngLon.Ttype == "无人机") {
        if (LngLon.resource_class_icon) {
          Newicon = LngLon.resource_class_icon;
        } else {
          Newicon = "Gisweb/img/dztu1.png";
        }
        // console.log(JSON.stringify(LngLon));
        // 添加广告牌实体标注
        var LabelEnetity = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            LngLon.lng,
            LngLon.lat,
            LngLon.height
          ),
          // point: {
          //   color: Cesium.Color.RED, //点位颜色
          //   pixelSize: 10, //像素点大小
          // },
          billboard: {
            //图标不是404时再启用
            // image: imageNew,
            // image: "Gisweb/img/dztu1.png",
            image: Newicon,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            // scale: 1,
            width: 40,
            height: 40,
          },
          label: {
            text: LngLon.equipment_name,
            font: "13px Source Han Sans CN", //字体样式
            fillColor: Cesium.Color.while, //字体颜色
            backgroundColor: Cesium.Color.Blue, //背景颜色
            showBackground: true, //是否显示背景颜色
            style: Cesium.LabelStyle.FILL, //label样式
            // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            // outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
            pixelOffset: new Cesium.Cartesian2(0, -30), //偏移
          },
        });
        LabelEnetity.Ttype = Ttype;
        //记录具体什么设备
        LabelEnetity.Ttype_type = LngLon.equipment_categories_name;
        LabelEnetity.Tid = LngLon.equipment_id;
        LabelEnetity.lng = LngLon.lng;
        LabelEnetity.lat = LngLon.lat;
        LabelEnetity.height = LngLon.height;
        LabelEnetity_RobotUAV.push(LabelEnetity);

        ShebeiEnetityAll.push(LabelEnetity);
        // console.log(ShebeiEnetityAll);
      } else {
        // 添加广告牌实体标注

        if (LngLon.resource_class_icon) {
          Newicon = LngLon.resource_class_icon;
        } else {
          Newicon = "Gisweb/img/dztu1.png";
        }

        // console.log(LngLon.resource_class_icon);
        var LabelEnetity = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            LngLon.lng,
            LngLon.lat,
            LngLon.height
          ),
          // point: {
          //   color: Cesium.Color.RED, //点位颜色
          //   pixelSize: 10, //像素点大小
          // },
          billboard: {
            //图标不是404时再启用
            // image: imageNew,
            // image: "Gisweb/img/dztu1.png",
            image: Newicon,
            // image:"http://192.168.1.66:8180/group1/M00/00/00/wKgBQmKe_RKANCXSAAEH4qpDMfY325.jpg",
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            // scale: 1,
            width: 13,
            height: 16,
          },
          label: {
            text: LngLon.equipment_name,
            font: "13px Source Han Sans CN", //字体样式
            fillColor: Cesium.Color.while, //字体颜色
            backgroundColor: Cesium.Color.Blue, //背景颜色
            showBackground: true, //是否显示背景颜色
            style: Cesium.LabelStyle.FILL, //label样式
            // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            // outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
            pixelOffset: new Cesium.Cartesian2(0, -30), //偏移
          },
        });

        LabelEnetity.Ttype = Ttype;
        //记录具体什么设备
        LabelEnetity.Ttype_type = LngLon.equipment_categories_name;
        LabelEnetity.Tid = LngLon.equipment_id;
        LabelEnetity.lng = LngLon.lng;
        LabelEnetity.lat = LngLon.lat;
        LabelEnetity.height = LngLon.height;

        ShebeiEnetityAll.push(LabelEnetity);
        // console.log(ShebeiEnetityAll);
      }

      // }
    }
    if (Ttype == "新建点位" || Ttype == "修改点位") {
      LngLon.lng = Number(LngLon.lng);
      LngLon.lat = Number(LngLon.lat);
      LngLon.height = Number(LngLon.height);
      console.log(Ttype);
      //先清除实体
      if (newPointEnetity && newPointEnetity.id) {
        var ent = viewer.entities.getById(newPointEnetity.id);
        viewer.entities.remove(ent);
      }

      // 添加广告牌实体标注
      var LabelEnetity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          LngLon.lng,
          LngLon.lat,
          LngLon.height
        ),
        // point: {
        //   color: Cesium.Color.RED, //点位颜色
        //   pixelSize: 10, //像素点大小
        // },
        billboard: {
          image: "Gisweb/img/dztu2.png",
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: 1,
        },
        label: {
          text: Ttype,
          font: "13px Source Han Sans CN", //字体样式
          fillColor: Cesium.Color.while, //字体颜色
          backgroundColor: Cesium.Color.Blue, //背景颜色
          showBackground: true, //是否显示背景颜色
          style: Cesium.LabelStyle.FILL, //label样式
          // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          // outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
          pixelOffset: new Cesium.Cartesian2(0, -30), //偏移
        },
      });
      LabelEnetity.Ttype = Ttype;
      LabelEnetity.lng = LngLon.lng;
      LabelEnetity.lat = LngLon.lat;
      LabelEnetity.height = LngLon.height;
      newPointEnetity = LabelEnetity;
      var data2 = {
        Lon: String(Number(LngLon.lng).toFixed(10)),
        Lat: String(Number(LngLon.lat).toFixed(10)),
        Hei: String(Number(LngLon.height).toFixed(10)),
      };
      window.WebLonLatpoints(JSON.stringify(data2));
      // console.log(ShebeiEnetityAll);
    }
    if (Ttype == "点位定位") {
      LngLon.lng = Number(LngLon.lng);
      LngLon.lat = Number(LngLon.lat);
      LngLon.height = Number(LngLon.height);
      console.log("点位定位");
      // 绘制点位标注
      // 添加广告牌实体标注
      var LabelEnetity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          LngLon.lng,
          LngLon.lat,
          LngLon.height
        ),
        // point: {
        //   color: Cesium.Color.RED, //点位颜色
        //   pixelSize: 10, //像素点大小
        // },
        billboard: {
          image: "Gisweb/img/dztu2.png",
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: 1,
        },
        label: {
          text: LngLon.name,
          font: "13px Source Han Sans CN", //字体样式
          fillColor: Cesium.Color.while, //字体颜色
          backgroundColor: Cesium.Color.Blue, //背景颜色
          showBackground: true, //是否显示背景颜色
          style: Cesium.LabelStyle.FILL, //label样式
          // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          // outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
          pixelOffset: new Cesium.Cartesian2(0, -30), //偏移
        },
      });
      LabelEnetity.Ttype = Ttype;
      LabelEnetity.lng = LngLon.lng;
      LabelEnetity.lat = LngLon.lat;
      LabelEnetity.height = LngLon.height;
      var data2 = {
        Lng: LngLon.lng,
        Lat: LngLon.lat,
        Hei: LngLon.height,
      };
      //定位到点位
      GisMap.AreaJump(data2, "点位");
    }
    // 报警标注绘制 并定位
    if (Ttype == "报警") {
      LngLon.lng = Number(LngLon.lng);
      LngLon.lat = Number(LngLon.lat);
      LngLon.height = Number(LngLon.height);
      console.log("报警");
      // 添加广告牌实体标注
      var LabelEnetity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          LngLon.lng,
          LngLon.lat,
          LngLon.height
        ),
        // point: {
        //   color: Cesium.Color.RED, //点位颜色
        //   pixelSize: 10, //像素点大小
        // },
        billboard: {
          image: "./Gisweb/img/dange1.png",
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: 1,
        },
        label: {
          text: LngLon.name,
          font: "13px Source Han Sans CN", //字体样式
          fillColor: Cesium.Color.while, //字体颜色
          backgroundColor: Cesium.Color.Blue, //背景颜色
          showBackground: true, //是否显示背景颜色
          style: Cesium.LabelStyle.FILL, //label样式
          // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          // outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
          pixelOffset: new Cesium.Cartesian2(0, -30), //偏移
        },
      });
      LabelEnetity.Ttype = Ttype;
      LabelEnetity.Tname = LngLon.name;
      LabelEnetity.lng = LngLon.lng;
      LabelEnetity.lat = LngLon.lat;
      LabelEnetity.height = LngLon.height;
      LabelEnetity.id = LngLon.id;
      var data2 = {
        Lng: LngLon.lng,
        Lat: LngLon.lat,
        Hei: LngLon.height,
      };
      //定位到报警
      GisMap.AreaJump(data2, "报警");
    }
    // 机器人实时定位
    if (Ttype == "机器人") {
      LngLon.lng = Number(LngLon.lng);
      LngLon.lat = Number(LngLon.lat);
      LngLon.height = Number(LngLon.height);
      console.log("机器人通了");
      // 添加广告牌实体标注
      var LabelEnetity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          LngLon.lng,
          LngLon.lat,
          LngLon.height
        ),
        // point: {
        //   color: Cesium.Color.RED, //点位颜色
        //   pixelSize: 10, //像素点大小
        // },
        billboard: {
          image: "./Gisweb/img/dange1.png",
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: 1,
        },
        label: {
          text: LngLon.name,
          font: "13px Source Han Sans CN", //字体样式
          fillColor: Cesium.Color.while, //字体颜色
          backgroundColor: Cesium.Color.Blue, //背景颜色
          showBackground: true, //是否显示背景颜色
          style: Cesium.LabelStyle.FILL, //label样式
          // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          // outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
          pixelOffset: new Cesium.Cartesian2(0, -30), //偏移
        },
      });
      LabelEnetity.Ttype = Ttype;
      LabelEnetity.Tname = LngLon.name;
      LabelEnetity.lng = LngLon.lng;
      LabelEnetity.lat = LngLon.lat;
      LabelEnetity.height = LngLon.height;
      LabelEnetity.id = LngLon.id;
      LabelEnetity_RobotUAV.push(LabelEnetity);
      var data2 = {
        Lng: LngLon.lng,
        Lat: LngLon.lat,
        Hei: LngLon.height,
      };

      //定位到机器人
      // GisMap.AreaJump(data2, "机器人");
    }
    //无人机实时定位
    if (Ttype == "无人机") {
      LngLon.lng = Number(LngLon.lng);
      LngLon.lat = Number(LngLon.lat);
      LngLon.height = Number(LngLon.height);
      console.log("无人机通了");
      // 添加广告牌实体标注
      var LabelEnetity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          LngLon.lng,
          LngLon.lat,
          LngLon.height
        ),
        // point: {
        //   color: Cesium.Color.RED, //点位颜色
        //   pixelSize: 10, //像素点大小
        // },
        billboard: {
          image: "./Gisweb/img/dange1.png",
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: 1,
        },
        label: {
          text: LngLon.name,
          font: "13px Source Han Sans CN", //字体样式
          fillColor: Cesium.Color.while, //字体颜色
          backgroundColor: Cesium.Color.Blue, //背景颜色
          showBackground: true, //是否显示背景颜色
          style: Cesium.LabelStyle.FILL, //label样式
          // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          // outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
          pixelOffset: new Cesium.Cartesian2(0, -30), //偏移
        },
      });
      LabelEnetity.Ttype = Ttype;
      LabelEnetity.Tname = LngLon.name;
      LabelEnetity.lng = LngLon.lng;
      LabelEnetity.lat = LngLon.lat;
      LabelEnetity.height = LngLon.height;
      LabelEnetity.id = LngLon.id;
      LabelEnetity_RobotUAV.push(LabelEnetity);
      var data2 = {
        Lng: LngLon.lng,
        Lat: LngLon.lat,
        Hei: LngLon.height,
      };

      //定位到机器人
      // GisMap.AreaJump(data2, "机器人");
    }
    if (Ttype === "人员" || Ttype === "车辆") {
      LngLon.lng = Number(LngLon.lng);
      LngLon.lat = Number(LngLon.lat);
      LngLon.height = Number(LngLon.height);
      // 添加广告牌实体标注
      var LabelEnetity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          LngLon.lng,
          LngLon.lat,
          LngLon.height
        ),
        billboard: {
          image:
            Ttype === "人员" ? "Gisweb/img/person.png" : "Gisweb/img/car.png",
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: 1,
        },
        label: {
          text: Ttype === "人员" ? LngLon.personName : LngLon.carNo,
          font: "13px Source Han Sans CN", //字体样式
          fillColor: Cesium.Color.while, //字体颜色
          backgroundColor: Cesium.Color.Blue, //背景颜色
          showBackground: true, //是否显示背景颜色
          style: Cesium.LabelStyle.FILL, //label样式
          // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          // outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
          pixelOffset: new Cesium.Cartesian2(0, -30), //偏移
        },
      });
      LabelEnetity.Ttype = Ttype;
      //记录具体什么设备
      LabelEnetity.Ttype_type = Ttype;
      LabelEnetity.Tid = LngLon.id;
      LabelEnetity.lng = LngLon.lng;
      LabelEnetity.lat = LngLon.lat;
      LabelEnetity.height = LngLon.height;
      ShebeiEnetityAll.push(LabelEnetity);
    }
  },
  //飞行定位方法
  // 项目区域跳转
  AreaJump(id, Ttype) {
    //如果没有Ttype属性就是"电站"跳转
    if (!Ttype) {
      console.log("点击了电站：" + id);
      for (var d = 0; d < ProjecList.data.list.length; d++) {
        if (
          id == ProjecList.data.list[d].id &&
          ProjecList.data.list[d].xCoordinate &&
          ProjecList.data.list[d].yCoordinate &&
          ProjecList.data.list[d].zCoordinate
        ) {
          if (ProjecList.data.list[d].projectName.indexOf("沂蒙") != -1) {
            GisMap.FlyTo(
              ProjecList.data.list[d].xCoordinate,
              ProjecList.data.list[d].yCoordinate,
              ProjecList.data.list[d].zCoordinate,
              0,
              -50
            );
          } else {
            GisMap.FlyTo(
              ProjecList.data.list[d].xCoordinate,
              ProjecList.data.list[d].yCoordinate,
              ProjecList.data.list[d].zCoordinate,
              0,
              -25
            );
          }

          // console.log(
          //   ProjecList.data.list[d].xCoordinate +
          //     "--" +
          //     ProjecList.data.list[d].yCoordinate
          // );

          // var center = Cesium.Cartesian3.fromDegrees(
          //   ProjecList.data.list[d].xCoordinate - 0.007,
          //   ProjecList.data.list[d].yCoordinate - 0.007,
          //   1500
          // );
          // var heading = Cesium.Math.toRadians(60);
          // var pitch = Cesium.Math.toRadians(-50);
          // var range = 150000.0;
          // var roll = 0;
          // camera.flyTo({
          //   //注意：Cesium.Cartesian3.fromDegrees(经度，纬度，高度)。经纬度坐标转笛卡尔坐标xyz
          //   destination: center,
          //   duration: 3,
          //   orientation: {
          //     // 指向
          //     heading: heading,
          //     // 视角
          //     pitch: pitch,
          //     range: range,
          //     // 旋转
          //     roll: roll,
          //   },
          //   // complete: function complete() {
          //   //   camera.lookAt(
          //   //     center,
          //   //     new Cesium.HeadingPitchRange(heading, pitch, range)
          //   //   );
          //   //   camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
          //   // },
          // });
        }
      }
    }
    if (Ttype == "设备") {
      console.log("点击了设备：" + id);
      for (var d = 0; d < ShebeiEnetityAll.length; d++) {
        if (
          id == ShebeiEnetityAll[d].Tid &&
          ShebeiEnetityAll[d].lng &&
          ShebeiEnetityAll[d].lat &&
          ShebeiEnetityAll[d].height
        ) {
          console.log(ShebeiEnetityAll[d].lng + "--" + ShebeiEnetityAll[d].lat);
          var center = Cesium.Cartesian3.fromDegrees(
            Number(ShebeiEnetityAll[d].lng),
            Number(ShebeiEnetityAll[d].lat) - 0.004,
            Number(ShebeiEnetityAll[d].height) + 500
          );
          var heading = Cesium.Math.toRadians(0);
          var pitch = Cesium.Math.toRadians(-50);
          var range = 30.0;
          var roll = 0;
          camera.flyTo({
            //注意：Cesium.Cartesian3.fromDegrees(经度，纬度，高度)。经纬度坐标转笛卡尔坐标xyz
            destination: center,
            duration: 3,
            orientation: {
              // 指向
              heading: heading,
              // 视角
              pitch: pitch,
              range: range,
              // 旋转
              roll: roll,
            },
            // complete: function complete() {
            //   camera.lookAt(
            //     center,
            //     new Cesium.HeadingPitchRange(heading, pitch, range)
            //   );
            //   camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
            // },
          });
        }
      }
    }
    if (Ttype == "报警") {
      console.log("点击了" + Ttype);
      // 点位的id字段包含经纬度
      var center = Cesium.Cartesian3.fromDegrees(
        Number(id.Lng),
        Number(id.Lat) - 0.004,
        Number(id.Hei) + 500
      );
      var heading = Cesium.Math.toRadians(0);
      var pitch = Cesium.Math.toRadians(-50);
      var range = 30.0;

      var roll = 0;
      camera.flyTo({
        //注意：Cesium.Cartesian3.fromDegrees(经度，纬度，高度)。经纬度坐标转笛卡尔坐标xyz
        destination: center,
        duration: 3,
        orientation: {
          // 指向
          heading: heading,
          // 视角
          pitch: pitch,
          range: range,
          // 旋转
          roll: roll,
        },
        // complete: function complete() {
        //   camera.lookAt(
        //     center,
        //     new Cesium.HeadingPitchRange(heading, pitch, range)
        //   );
        //   camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        // },
      });
    }
    if (Ttype == "点位") {
      console.log("点击了" + Ttype);
      // 点位的id字段包含经纬度
      var center = Cesium.Cartesian3.fromDegrees(
        Number(id.Lng),
        Number(id.Lat) - 0.004,
        Number(id.Hei) + 500
      );
      var heading = Cesium.Math.toRadians(0);
      var pitch = Cesium.Math.toRadians(-50);
      var range = 30.0;
      var roll = 0;
      camera.flyTo({
        //注意：Cesium.Cartesian3.fromDegrees(经度，纬度，高度)。经纬度坐标转笛卡尔坐标xyz
        destination: center,
        duration: 3,
        orientation: {
          // 指向
          heading: heading,
          // 视角
          pitch: pitch,
          range: range,
          // 旋转
          roll: roll,
        },
        // complete: function complete() {
        //   camera.lookAt(
        //     center,
        //     new Cesium.HeadingPitchRange(heading, pitch, range)
        //   );
        //   camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        // },
      });
    }
    if (Ttype == "机器人") {
      console.log("点击了" + Ttype);
      // 点位的id字段包含经纬度
      var center = Cesium.Cartesian3.fromDegrees(
        Number(id.Lng),
        Number(id.Lat) - 0.004,
        Number(id.Hei) + 500
      );
      var heading = Cesium.Math.toRadians(0);
      var pitch = Cesium.Math.toRadians(-50);
      var range = 30.0;
      var roll = 0;
      camera.flyTo({
        //注意：Cesium.Cartesian3.fromDegrees(经度，纬度，高度)。经纬度坐标转笛卡尔坐标xyz
        destination: center,
        duration: 3,
        orientation: {
          // 指向
          heading: heading,
          // 视角
          pitch: pitch,
          range: range,
          // 旋转
          roll: roll,
        },
        // complete: function complete() {
        //   camera.lookAt(
        //     center,
        //     new Cesium.HeadingPitchRange(heading, pitch, range)
        //   );
        //   camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        // },
      });
    }
  },
  // 点位模块处理
  GisPointsEdit(val) {
    console.log(val);
    var val = val;
    //选中的点位信息
    //直接新建点位
    if (val == 1) {
      // 是否新建点位
      newPoint = 1;
    }
    // 取消修改点位
    if (val == 0) {
      // 是否新建点位
      newPoint = 0;
      // 清除新建的点位
      if (newPointEnetity && newPointEnetity.id) {
        var ent = viewer.entities.getById(newPointEnetity.id);
        viewer.entities.remove(ent);
      }
    }
    // 开始修改点位
    if (val.value == 1) {
      // 是否新建点位
      newPoint = 2;
      GisMap.drawPoint(ClickNowLngLonHeight, "点位");
      //点位定位
      //获取当前点位列表
      // pointsNowSiteList = Ajax.SitePointsFn();
      console.log(pointsNowSiteList);
      // for (var s = 0; s < pointsNowSiteList.length; s++) {
      // if (pointsNowSiteList[s].id == val.id) {
      // console.log(pointsNowSiteList[s]);
      var ds = {
        name: val.pointName,
        lng: val.xcoordinate,
        lat: val.ycoordinate,
        height: val.zcoordinate,
      };

      GisMap.drawPoint(ds, "点位定位");
      // }
      // }
    }
  },
  // 设备定位
  ShebeiToGis(data) {
    console.log("设备点击ID：" + data.id);
    GisMap.AreaJump(data.id, "设备");
  },
  // 报警点击定位
  PoliceCall(val) {
    console.log("报警点定位");
    var ds = {};
    if (val.X && val.Y) {
      if (val.Z) {
        ds = {
          name: val.alarmTitle,
          id: val.id,
          lng: val.X,
          lat: val.Y,
          height: val.Z,
        };
      } else {
        ds = {
          name: val.alarmTitle,
          id: val.id,
          lng: val.X,
          lat: val.Y,
          height: 0,
        };
      }
      GisMap.drawPoint(ds, "报警");
    } else {
      console.log("报警点经纬度错误");
      return;
    }
  },
  //机器人实时定位
  RobotNowGps(bool) {
    // 加载全部设备 或某电站数据
    if (bool) {
      RobotUAV_New_Time = setInterval(function () {
        if (LabelEnetity_RobotUAV && LabelEnetity_RobotUAV.length > 0) {
          //删除机器人无人机实例
          for (var S = 0; S < LabelEnetity_RobotUAV.length; S++) {
            if (LabelEnetity_RobotUAV[S] != "") {
              console.log(LabelEnetity_RobotUAV[S]);
              viewer.entities.remove(LabelEnetity_RobotUAV[S]);
            }
          }
          LabelEnetity_RobotUAV = [];
          RobotUAV_New = Ajax.AllDatasGet_RobotUAV();
          console.log("机器人_无人机 数据：" + RobotUAV_New);
          if (RobotUAV_New.length > 0) {
            var ds = {};
            for (let A = 0; A < RobotUAV_New.length; A++) {
              if (
                RobotUAV_New[A].x_coordinate &&
                RobotUAV_New[A].y_coordinate &&
                RobotUAV_New[A] != ""
              ) {
                if (RobotUAV_New[A].z_coordinate) {
                  ds = {
                    name: RobotUAV_New[A].equipment_name,
                    id: RobotUAV_New[A].equipment_id,
                    lng: RobotUAV_New[A].x_coordinate,
                    lat: RobotUAV_New[A].y_coordinate,
                    height: RobotUAV_New[A].z_coordinate,
                  };
                } else {
                  ds = {
                    name: RobotUAV_New[A].equipment_name,
                    id: RobotUAV_New[A].equipment_id,
                    lng: RobotUAV_New[A].x_coordinate,
                    lat: RobotUAV_New[A].y_coordinate,
                    height: 0,
                  };
                }
                GisMap.drawPoint(ds, "机器人");
                GisMap.drawPoint(ds, "无人机");
              }
            }
          }
        }
      }, 3000);
    } else {
      clearInterval(RobotUAV_New_Time);
    }
  },
  //删除Div标签 设备
  MarkRemove() {
    $("#Mark_1").css("display", "none");
  },
  FlyTo(lng, lat, height, heading = 0, pitch = -50, range = 150000.0) {
    var center = Cesium.Cartesian3.fromDegrees(
      Number(lng),
      Number(lat),
      Number(height)
    );
    heading = Cesium.Math.toRadians(heading); // 东西南北，0为朝北。360为朝南
    pitch = Cesium.Math.toRadians(pitch); // 仰角，0度为水平，-90为垂直
    var roll = 0;
    camera.flyTo({
      //注意：Cesium.Cartesian3.fromDegrees(经度，纬度，高度)。经纬度坐标转笛卡尔坐标xyz
      destination: center,
      duration: 4,
      orientation: {
        // 指向
        heading,
        // 视角
        pitch,
        range,
        // 旋转
        roll: roll,
      },
      // complete: function complete() {
      //   camera.lookAt(
      //     center,
      //     new Cesium.HeadingPitchRange(heading, pitch, range)
      //   );
      //   camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
      // },
    });
  },
  //空间量测
  // 空间距离
  MeasureStart1() {
    console.log("空间距离");
    if (measureObj) {
      // 清除
      measureObj._drawLayer.entities.removeAll();
    }
    measureObj = new Cesium.Measure(viewer);
    measureObj.drawLineMeasureGraphics({
      clampToGround: false,
      callback: () => {},
    });
  },
  // 三维量测
  MeasureStart2() {
    console.log("三维量测");
    if (measureObj) {
      // 清除
      measureObj._drawLayer.entities.removeAll();
    }
    measureObj.drawTrianglesMeasureGraphics({ callback: () => {} });
  },
  //清除测量
  MeasureClear() {
    console.log("清除量测");
    if (measureObj) {
      measureObj._drawLayer.entities.removeAll();
    }

    //结束漫游
    if (drawHelper) {
      bxmap.FlyCesium.stopFly3DPaths();
      var utc = Cesium.JulianDate.fromDate(new Date("2030/04/18 04:00:00"));
      //北京时间=UTC+8=GMT+8
      viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(
        utc,
        8,
        new Cesium.JulianDate()
      );
    }
    // 删除区域
    drawObj.clearDrawEntities();
  },
  // 绘制漫游路径
  RoamDraw() {
    if (drawHelper) {
      if (!bxmap.FlyCesium.drawHelper) {
        bxmap.FlyCesium.drawHelper = new DrawHelper(
          bxmap.FlyCesium.cesiumViewer
        );
      }
      //PresetsPaths是默认路径
      bxmap.FlyCesium.draw3DObj = bxmap.FlyCesium.DrawFly3DPaths(
        bxmap.FlyCesium.drawHelper
      );
    }
    //重置时间
    Cesium.JulianDate.fromDate(new Date("2022/04/18 04:00:00"));
  },
  // 开始漫游
  RoamStart() {
    if (drawHelper) {
      if (bxmap.FlyCesium.draw3DObj) {
        console.log("漫游路径数据：" + bxmap.FlyCesium.draw3DObj);
        bxmap.FlyCesium.showFly3DPaths(bxmap.FlyCesium.draw3DObj);
      } else {
        layer.msg("漫游路线不存在");
        //  漫游路线不存在
      }
    }
  },
  //暂停漫游
  RoamPause() {
    if (drawHelper) {
      if (bxmap.FlyCesium.draw3DObj) {
        bxmap.FlyCesium.pauseFly3DPaths();
      } else {
        // layer.msg("漫游路线不存在");
        //  漫游路线不存在
      }
    }
    bxmap.FlyCesium.pauseFly3DPaths();
  },
  // 预设漫游路径
  RoamPresets() {
    var str =
      "116.4602708432274,39.90006828777385,116.46041109922339,39.900114228809166,116.46047202609532,39.90011684547651,116.46047383383531,39.90014036329682,116.46045161109683,39.900149379406905,116.46043000950233,39.900153589335616,116.46041559493514,39.900145031661076,116.46033535503597,39.900144235614796,116.46030983940393,39.900138789994294,116.46031708340375,39.900145980623975";
    bxmap.FlyCesium.PresetsPathsFn(str);
  },
  // 结束漫游
  RoamEnd() {
    if (drawHelper) {
      bxmap.FlyCesium.stopFly3DPaths();
      var utc = Cesium.JulianDate.fromDate(new Date("2030/04/18 04:00:00"));
      //北京时间=UTC+8=GMT+8
      viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(
        utc,
        8,
        new Cesium.JulianDate()
      );
    }
    // 清除量测
    if (measureObj) {
      measureObj._drawLayer.entities.removeAll();
    }
  },
  // 移除点位
  removePoint() {
    const entitys = viewer.entities.values.filter(
      (v) => !["模型", "电站"].includes(v.Ttype)
    );
    entitys.forEach((element) => {
      viewer.entities.remove(element);
    });
  },
  // 渲染指定设备的点位
  drawAssignPoint(typeList) {
    GisMap.removePoint();
    if (Array.isArray(typeList)) {
      ShebeiList = ShebeiList.filter((v) =>
        typeList.includes(v.equipment_categories_name)
      );
      ShebeiList.forEach((v) => {
        if (v.lng && v.lat && v.height) {
          GisMap.drawPoint(v, "设备");
        } else {
          // console.log("设备经纬度错误！");
        }
      });
    } else {
      GisMap.init();
    }
  },
  // 渲染指定人员/车辆的点位
  drawPersonOrCarPoint(data, type) {
    if (type === "人员") {
      personalList = data;
    } else if (type === "车辆") {
      carList = data;
    }
    GisMap.removePoint();
    if (Array.isArray(data)) {
      data.forEach((v) => {
        v.lng = v.xcoordinate;
        v.lat = v.ycoordinate;
        v.height = v.zcoordinate;
        if (v.lng && v.lat && v.height) {
          GisMap.drawPoint(v, type);
        } else {
          // console.log("设备经纬度错误！");
        }
      });
    }
  },
};
GisMap.init();
//三维量测
GisMap.measureUI();
//空间测量
// GisMap.Measure();
//机器人无人机实时定位
GisMap.RobotNowGps(false);

var currentProject = projectListMap[top.location.hostname];
if (currentProject) {
  setTimeout(function () {
    GisMap.FlyTo(
      currentProject.lng,
      currentProject.lat,
      currentProject.height + 15,
      currentProject.heading,
      currentProject.pitch
    );
  }, currentProject.time);
}
