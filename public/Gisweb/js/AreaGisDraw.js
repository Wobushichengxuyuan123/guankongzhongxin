/* eslint-disable no-undef */
var viewer;
var camera;
//漫游对象
var drawHelper;
var EntityModelArr = [];
var AreaGisDraw = {
  //初始化地图
  init() {
    viewer = new Cesium.Viewer("cesiumContainer", {
      animation: false, //是否显示动画控制
      baseLayerPicker: false, //底图背景选择框
      geocoder: false, //右上角查找放大镜
      timeline: true, //时间线是否显示
      sceneModePicker: false, //二维三维投影方式显示
      navigationHelpButton: false, //取消右上角的问号
      homeButton: false, //首页按钮
      sceneMode: Cesium.SceneMode.SCENE3D, //2D、3D模式： SCENE2D |MORPHING
      // selectionIndicator: false,
      infoBox: false, //禁止infoBox
      //加载单张图像
      imageryProvider: new Cesium.SingleTileImageryProvider({
        url: `${window.location.origin}/Gisweb/img/World.jpg`,
      }),
    });
    //去掉版权
    viewer._cesiumWidget._creditContainer.style.display = "none";
    // 禁止默认双击事件
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );

    //设置起始位置
    viewer.camera.setView({
      // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
      // fromDegrees()方法，将经纬度和高程转换为世界坐标
      destination: Cesium.Cartesian3.fromDegrees(105.435314, 35.0, 15000000.0),
      orientation: {
        roll: 0.0,
      },
    });
    viewer.scene.fog.enabled = false; //关闭雾气
    viewer.scene.globe.showGroundAtmosphere = false; //关闭大气
    //加载全球JSON数据
    // viewer.dataSources.add(
    //   (ChinaJson = Cesium.GeoJsonDataSource.load("Gisweb/datas/china.json", {
    //     stroke: Cesium.Color.BLUE,
    //     fill: Cesium.Color.fromAlpha(Cesium.Color.RED, 0.4),
    //     strokeWidth: 3,
    //     markerSymbol: "?",
    //   }))
    // );
    //取消底图
    // viewer.imageryLayers.get(0).show = false;
    //设置鼠标进去地下模式
    viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;
    //设置地球透明
    viewer.scene.globe.translucency.enabled = true;
    viewer.scene.globe.translucency.frontFaceAlphaByDistance =
      new Cesium.NearFarScalar(400.0, 0.5, 8000, 0.9);

    camera = viewer.camera;
    //鼠标模型穿透
    var lastWhellCameraPosition = undefined;
    var lastWhellCameraPositionTimes = 0;
    var currentCameraPosition = camera.position;
    var ellipsoid = viewer.scene.globe.ellipsoid;
    viewer.screenSpaceEventHandler.setInputAction(function onMouseWheel(e) {
      if (
        e > 0 &&
        lastWhellCameraPosition &&
        Math.abs(currentCameraPosition.x - lastWhellCameraPosition.x) < 0.001 &&
        Math.abs(currentCameraPosition.y - lastWhellCameraPosition.y) < 0.001 &&
        Math.abs(currentCameraPosition.z - lastWhellCameraPosition.z) < 0.001
      ) {
        if (lastWhellCameraPositionTimes > 1) {
          // console.log(e);
          var cameraHeight = ellipsoid.cartesianToCartographic(
            currentCameraPosition
          ).height;
          camera.moveForward(cameraHeight / 50.0);
        } else {
          lastWhellCameraPositionTimes++;
        }
      } else {
        lastWhellCameraPositionTimes = 0;
      }
      lastWhellCameraPosition = currentCameraPosition.clone();
    }, Cesium.ScreenSpaceEventType.WHEEL);
    // 漫游对象初始化
    drawHelper = new DrawHelper(viewer);
  },
  //加载模型和地图
  ModelMapDatas() {
    var currentProject = projectListMap[top.location.hostname];
    if (currentProject) {
      setTimeout(function () {
        AreaGisDraw.FlyTo(
          currentProject.lng,
          currentProject.lat,
          currentProject.height + 15,
          currentProject.heading,
          currentProject.pitch
        );
      }, currentProject.time);
    }
    //加载全球图像
    // 如果是沂蒙电站
    if (location.host.indexOf("172.16.9") != -1) {
      var tmsLayer = new Cesium.TileMapServiceImageryProvider({
        url: gisurl1.webIp_1 + "/ym/ym_map", //url为文件夹地址
        // maximumLevel:17,
      });
    } else if (location.host.indexOf("192.168.1.103") != -1) {
      // 如果是易县电站
      var tmsLayer = new Cesium.TileMapServiceImageryProvider({
        url: "http://192.168.1.103:8001" + "/yx/", //url为文件夹地址
        // maximumLevel:17,
      });
    }
    // 如果是白山电站
    else if (location.host.indexOf("172.16.114.14") != -1) {
    }
    // 设置阳光角度
    // 改变时间设置光照效果
    //UTC
    if (location.host.indexOf("172.16.114.14") != -1) {
      var utc = Cesium.JulianDate.fromDate(new Date("2030/04/18 04:00:00"));
      //北京时间=UTC+8=GMT+8
      viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(
        utc,
        8,
        new Cesium.JulianDate()
      );
      // viewer.scene.light = new Cesium.DirectionalLight({
      //   direction: new Cesium.Cartesian3(0.35492591601301104, -0.8909182691839401, -0.2833588392420772),
      //   intensity : 14
      // })
      viewer.scene.light.intensity = 14;
      viewer.scene.imageryLayers.addImageryProvider(tmsLayer);
    }
    //220电科院项目
    if (
      location.host.indexOf("192.168.1.100") != -1 ||
      location.host.indexOf("8.142.19.151") != -1
    ) {
      var tmsLayer = new Cesium.TileMapServiceImageryProvider({
        url: "http://8.142.19.151:6009/Gisweb/models/nj/maps/", //url为文件夹地址
        // maximumLevel:17,
      });
      var utc = Cesium.JulianDate.fromDate(new Date("2030/04/18 04:00:00"));
      //北京时间=UTC+8=GMT+8
      viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(
        utc,
        8,
        new Cesium.JulianDate()
      );
      // viewer.scene.light = new Cesium.DirectionalLight({
      //   direction: new Cesium.Cartesian3(0.35492591601301104, -0.8909182691839401, -0.2833588392420772),
      //   intensity : 14
      // })
      viewer.scene.light.intensity = 14;
      viewer.scene.imageryLayers.addImageryProvider(tmsLayer);
    }
    //加载模型
    function createModel(url, lng, lat, height, scale, radians = 0) {
      const position = Cesium.Cartesian3.fromDegrees(
        Number(lng),
        Number(lat),
        Number(height)
      );
      const heading = Cesium.Math.toRadians(radians); // 模型旋转角度
      const pitch = Cesium.Math.toRadians(0.0);
      const roll = 0;
      const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
      const orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
      );
      var Entity = window.viewer.entities.add({
        name: url,
        position: position,
        orientation: orientation,
        model: {
          uri: url,
          scale: scale,
          // maximumScale: 1.1
          position: position,
          orientation: orientation,
          heightReference: Cesium.HeightReference.NONE, // 是否贴地显示
          color: Cesium.Color.WHITE, // 将模型颜色和设置的颜色进行融合
        },
      });
      Entity.Ttype = "模型";
      EntityModelArr.push(Entity);
    }

    // 如果是沂蒙电站
    if (location.host.indexOf("172.16.9") != -1) {
      createModel(
        `${gisurl1.webIp_1}/ym/ym_models/yimeng.glb`,
        118.071989509,
        35.583792117,
        180.010687231,
        10
      );
    } //如果是易县电站
    else if (location.host.indexOf("192.168.1.103") != -1) {
      createModel(
        "http://192.168.1.103:8001/" + "yixianNew" + ".glb",
        115.293318037185,
        39.43639988789703,
        178.410687231,
        0.5
      );
    } else if (location.host.indexOf("172.16.114.14") != -1) {
      createModel(
        "http://172.16.114.14:7999/" + "baishandianzhan" + ".glb",
        127.216447,
        42.718,
        1000,
        1
      );
    }
    //220电科院项目
    else if (location.host.indexOf("192.168.1.100") != -1) {
      projectListMap["192.168.1.100"];
      createModel(
        projectListMap["192.168.1.100"].modelUrl,
        projectListMap["192.168.1.100"].modelLng,
        projectListMap["192.168.1.100"].modelLat,
        projectListMap["192.168.1.100"].modelHeight,
        projectListMap["192.168.1.100"].modelscale
      );
      AreaGisDraw.FlyTo(105.43531, 34.99989, 151, 0, 0);
    } else if (location.host.indexOf("8.142.19.151") != -1) {
      projectListMap["8.142.19.151"];
      createModel(
        projectListMap["8.142.19.151"].modelUrl,
        projectListMap["8.142.19.151"].modelLng,
        projectListMap["8.142.19.151"].modelLat,
        projectListMap["8.142.19.151"].modelHeight,
        projectListMap["8.142.19.151"].modelscale
      );
    } else if (location.host.indexOf("localhost") != -1) {
      projectListMap["localhost"];
      createModel(
        projectListMap["localhost"].modelUrl,
        projectListMap["localhost"].modelLng,
        projectListMap["localhost"].modelLat,
        projectListMap["localhost"].modelHeight,
        projectListMap["localhost"].modelscale
      );
    }

    location.host.indexOf("localhost") != -1;
  },
  //加载点云数据
  Dianyun() {
    //加载北京图像
    var tmsLayer = new Cesium.TileMapServiceImageryProvider({
      url: gisurl1.webIp_1 + "/beijing/beijing_map", //url为文件夹地址
    });
    viewer.scene.light.intensity = 14;
    viewer.scene.imageryLayers.addImageryProvider(tmsLayer);
    var mss = new Cesium.Matrix4.fromArray([
      1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0, -49.5,
      -49.5,
    ]);
    DianyunTileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        // url: gisurl1.webIp_1 + "/Dianyun/tileset.json", //文件的路径
        url: "http://localhost:9000/model/b2ddf0f0e60411ec8984b3b7ffec8c10/tileset.json", //url为文件夹地址
        // maximumScreenSpaceError: 2, //最大的屏幕空间误差
        // modelMatrix: mss, //形状矩阵
      })
    );
    //生效
    DianyunTileset.Ttype = "点云模型";
    DianyunTileset.modelMatrix = mss;
    viewer.scene.primitives.add(DianyunTileset);
    console.log(DianyunTileset);
    //定位过去
    // viewer.zoomTo(DianyunTileset);
  },
  //单击点击事件
  MouseKeyChange() {
    //点击获取当前坐标
    new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas).setInputAction(
      (event) => {
        var lng;
        var lat;
        var height;
        var earthPosition = camera.pickEllipsoid(
          event.position,
          viewer.scene.globe.ellipsoid
        ); //视角穿过球面点的位置
        var cartographic = Cesium.Cartographic.fromCartesian(
          earthPosition,
          viewer.scene.globe.ellipsoid,
          new Cesium.Cartographic()
        );
        var pick = viewer.scene.pick(event.position);
        pickedNowBillboard = pick;
        //如果有模型 输出经纬度+获取模型高度
        if (viewer.scene.mode !== Cesium.SceneMode.MORPHING) {
          //console.log(pick);
          // 区分普通模型和点云模型
          if (
            (viewer.scene.pickPositionSupported &&
              Cesium.defined(pick) &&
              pick.node) ||
            (viewer.scene.pickPositionSupported &&
              Cesium.defined(pick) &&
              pick.primitive.Ttype == "点云模型")
          ) {
            var cartesian = viewer.scene.pickPosition(event.position);
            if (Cesium.defined(cartesian)) {
              var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
              lng = Cesium.Math.toDegrees(cartographic.longitude);
              lat = Cesium.Math.toDegrees(cartographic.latitude);
              height = cartographic.height; //模型高度
              ClickNowLngLonHeight = {
                lng: lng,
                lat: lat,
                height: height,
              };
              console.log(
                "当前经纬度-有点云模型的高度：" + lng + "," + lat + "," + height
              );
              window.LonlatToFn &&
                window.LonlatToFn(
                  JSON.stringify({
                    lon: Number(lng).toFixed(9),
                    lat: Number(lat).toFixed(9),
                    hei: Number(height).toFixed(9),
                  })
                );
            }
          } else {
            //如果没有模型 直接输出经纬度
            lng = Cesium.Math.toDegrees(cartographic.longitude);
            lat = Cesium.Math.toDegrees(cartographic.latitude);
            // 摄像机高度
            // height = camera.positionCartographic.height / 1000;
            height = 0;
            ClickNowLngLonHeight = {
              lng: lng,
              lat: lat,
              height: height,
            };
            console.log(
              "当前经纬度-无模型高度：" + lng + "," + lat + "," + height
            );
            //启用实监听功能
            var $info = $("#Mark_1");
            var $defence = $("#defence");
            var c = new Cesium.Cartesian2(event.position.x, event.position.y);
            function update(c, Tid) {
              if (
                Tid &&
                pickedNowBillboard?.id?.Tid &&
                Tid === pickedNowBillboard?.id.Tid
              ) {
                var x = c.x - $info.width() / 2;
                var y = c.y - $info.height() - 5;
                // $info.css(
                //   "transform",
                //   "translate3d(" + x + "px, " + (y - 25) + "px, 0)"
                // );
                $info.css({
                  left: x + "px",
                  top: y + 30 + "px",
                });
                $defence.css({
                  left: x + "px",
                  top: y + 30 + "px",
                });
              }
            }
            if (pick && pick.primitive) {
              console.log(pick.id);
              var changedC = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                viewer.scene,
                pick.primitive._actualPosition
              );
              viewer.scene.postRender.addEventListener(function () {
                var changedC = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                  viewer.scene,
                  pick.primitive._actualPosition
                );
                if (c && changedC && c.x && changedC.x && c.y && changedC.y) {
                  if (c.x !== changedC.x || c.y !== changedC.y) {
                    update(changedC, pick.id?.Tid);
                    c = changedC;
                  }
                }
              });
            }
            // //判断点是否在地球背面 背面则隐藏Div弹层
            // ellipsoidMark = Cesium.Ellipsoid.WGS84;
            // pointMark = Cesium.Cartesian3.fromDegrees(
            //   ClickNowLngLonHeight.lng,
            //   ClickNowLngLonHeight.lat
            // );
            // occluderMark = new Cesium.EllipsoidalOccluder(
            //   ellipsoidMark,
            //   camera.position
            // );
            // visibleMark = occluderMark.isPointVisible(pointMark);
            // console.log("visible：" + visibleMark);
            // //visible为true说明点在球的正面，否则点在球的背面。
            // if (MarkOpen && visibleMark) {
            //   $("#Mark_1").css("display", "block");
            // } else {
            //   $("#Mark_1").css("display", "none");
            // }
          }
        } else {
          //如果没有模型 直接输出经纬度
          lng = Cesium.Math.toDegrees(cartographic.longitude);
          lat = Cesium.Math.toDegrees(cartographic.latitude);
          // 摄像机高度
          // height = camera.positionCartographic.height / 1000;
          height = 0;
          ClickNowLngLonHeight = {
            lng: lng,
            lat: lat,
            height: height,
          };
          console.log("当前经纬度：" + lng + "," + lat + "," + height);
        }
        //console.log(pick);
        //选中某模型   pick选中的对象
        if (pick && pick.id && pick.id.label) {
          console.log(pick.id.id);
        }
      },
      Cesium.ScreenSpaceEventType.LEFT_CLICK
    );

    //点击获取屏幕坐标
    new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas).setInputAction(
      (event) => {
        // console.log("屏幕坐标:", event.position);
        //如果点击了标注
        var pick = viewer.scene.pick(event.position);
        //选中某模型   pick选中的对象
        if (pick && pick.id && pick.id.label) {
          //console.log(pick);
          //必须点击广告牌标注才显示Div弹层
          if (pick.id && pick.primitive && pick.primitive._imageId) {
            // 打开Div弹层
            // 就是外站不是要求月更五个视频吗，我
            // MarkOpen = true;
            if (pick.id.Ttype) {
              if (pick.id.Ttype == "报警") {
                console.log(pick.id);
                //GisMap.UIConfing(pick.id.Tid, pick.id.Ttype, pick.id.Tname);
              } else {
                //GisMap.UIConfing(pick.id.Tid, pick.id.Ttype);
              }
            } else {
              console.log("Div标签层没有类型");
            }
          }
        } else {
          //打开Div弹层
          //MarkOpen = false;
          $("#Mark_1").css("display", "none");
        }
      },
      Cesium.ScreenSpaceEventType.LEFT_CLICK
    );
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
  // 绘制区域
  BasedrawPolygon: function (positions, config_) {
    if (positions.length < 2) return;
    let config = config_ ? config_ : {};
    return viewer.entities.add({
      name: "面几何对象",
      polygon: {
        hierarchy: positions,
        // material: config.color ? new Cesium.Color.fromCssColorString(config.color).withAlpha(.2) : new Cesium.Color.fromCssColorString("#FFD700").withAlpha(.2),
        material: config.color
          ? new Cesium.Color(
              config.color[0],
              config.color[1],
              config.color[2],
              Number(config.opacity)
            )
          : new Cesium.Color.fromCssColorString("#FFD700").withAlpha(0.2),
      },
    });
  },
};
//初始化Gis应用
AreaGisDraw.init();
//如果是沂蒙或易县 项目 加载普通模型 否则加载点云模型
if (
  location.host.indexOf("172.16.9") != -1 ||
  location.host.indexOf("192.168.1.103") != -1 ||
  location.host.indexOf("192.168.1.100") != -1 ||
  location.host.indexOf("8.142.19.151") != -1 ||
  location.host.indexOf("localhost") != -1
) {
  //加载模型和地图
  AreaGisDraw.ModelMapDatas();
} else {
  //加载点云数据
  // AreaGisDraw.Dianyun();
}
//鼠标和键盘相关操作
// AreaGisDraw.MouseKeyChange();

// //判断是否是沂蒙项目
// if (window.location.host.indexOf("172.16.9") >= 0) {
//   // 定位到沂蒙
//   setTimeout(function () {
//     AreaGisDraw.FlyTo(118.09000366721703, 35.45561690753966, 4000, 0, -48);
//   }, 3000);
// } //判断是否是易县项目
// else if (window.location.host.indexOf("192.168.1.103") !== -1) {
//   // 定位到易县
//   setTimeout(function () {
//     // GisMap.FlyTo(115.28599386837803,39.42982588420539, 4000, 0, -50);
//     AreaGisDraw.FlyTo(115.29786062595939, 39.4070110008425, 4000, 0, -50);
//   }, 3000);
// } else {
//   //定位到点云
//   setTimeout(function () {
//     AreaGisDraw.FlyTo(116.46047790969708, 39.90000306216944, 10, 0, -25);
//   }, 3000);
// }
