/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
var viewer;
var camera;
//空间量测对象
var measureObj;
//漫游对象
var drawHelper;
//  当前点击的经纬度高度
var ClickNowLngLonHeight = {};
// 当前点击的广告牌对象
var pickedNowBillboard = {};
//甲方提供的点云数据
var DianyunTileset;
// Div弹层是否开启
//var MarkOpen = false;
//判断当前点是否在地球背面
var ellipsoidMark;
var pointMark;
var occluderMark;
var visibleMark;
var EntityModelArr = [];
//中国矢量图
var ChinaJson;
var Gisinit = {
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
    //三维飞行初始化
    bxmap.FlyCesium.Init(viewer, drawHelper, "box"); //初始化漫游飞行路径功能
  },
  // 时间条显示隐藏
  TimelineContainer() {
    if($(".cesium-viewer-timelineContainer").css("display") == "block"){
      $(".cesium-viewer-timelineContainer").css("display","none");
      $(".cesium-viewer-fullscreenContainer").css("display","none");
    }else{
      $(".cesium-viewer-timelineContainer").css("display","block");
      $(".cesium-viewer-fullscreenContainer").css("display","block");
    }


  },
  //加载模型和地图
  ModelMapDatas(currentProject) {
    //加载全球图像
    if (currentProject.url) {
      var tmsLayer = new Cesium.TileMapServiceImageryProvider({
        url: currentProject.url,
        // maximumLevel:17,
      });
      // console.log(tmsLayer);
      // 设置阳光角度
      // 改变时间设置光照效果
      //UTC
      var utc = Cesium.JulianDate.fromDate(new Date("2030/04/18 08:00:00"));
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

    if (
      currentProject.modelUrl &&
      currentProject.modelLng &&
      currentProject.modelLat &&
      (currentProject.modelHeight || currentProject.modelHeight === 0) &&
      currentProject.modelscale
    ) {
      createModel(
        currentProject.modelUrl,
        currentProject.modelLng,
        currentProject.modelLat,
        currentProject.modelHeight,
        currentProject.modelscale
      );
    } else {
      console.log("加载模型失败，参数错误");
    }
  },
  //加载点云数据
  Dianyun() {
    //加载北京图像
    var tmsLayer = new Cesium.TileMapServiceImageryProvider({
      url: gisurl1.webIp_1 + "/beijing/beijing_map", //url为文件夹地址
      // maximumLevel:13,
    });
    viewer.scene.light.intensity = 14;
    viewer.scene.imageryLayers.addImageryProvider(tmsLayer);
    var mss = new Cesium.Matrix4.fromArray([
      1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0, -49.5,
      -49.5,
    ]);
    DianyunTileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: gisurl1.webIp_1 + "/Dianyun/tileset.json", //文件的路径
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
  //鼠标和键盘相关操作
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
              pick.primitive.Ttype == "点云模型") ||
            (viewer.scene.pickPositionSupported &&
              Cesium.defined(pick) &&
              pick.primitive.Ttype == "3dTile模型")
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
                "当前经纬度-有模型高度：" + lng + "," + lat + "," + height
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
            window.LonlatToFn &&
              window.LonlatToFn(
                JSON.stringify({
                  lon: Number(lng).toFixed(9),
                  lat: Number(lat).toFixed(9),
                  hei: Number(height).toFixed(9),
                })
              );
            console.log(
              "当前经纬度-无模型高度：" + lng + "," + lat + "," + height
            );
          }
          if (
            pickedNowBillboard &&
            pickedNowBillboard.primitive.image &&
            pickedNowBillboard.primitive.image != ""
          ) {
            // 点击了图标
            console.log("点击了图标");
            //启用实监听功能
            var $info = $("#Mark_1");
            var $defence = $("#defence");
            var changedC = {};
            var c = new Cesium.Cartesian2(event.position.x, event.position.y);
            function update(c, Tid) {
              if (
                Tid &&
                pickedNowBillboard?.id?.Tid &&
                Tid === pickedNowBillboard?.id.Tid
              ) {
                if (location.href.indexOf("centerSecond") != -1) {
                  var x = c.x - $info.width() / 2 + 252;
                  var y = c.y - $info.height() - 5;
                } else {
                  var x = c.x - $info.width() / 2;
                  var y = c.y - $info.height() - 5;
                }

                // $info.css(
                //   "transform",
                //   "translate3d(" + x + "px, " + (y - 25) + "px, 0)"
                // );
                $info.css({
                  left: x + "px",
                  top: y - 26 + "px",
                });
                $defence.css({
                  left: x + "px",
                  top: y - 26 + "px",
                });
              }
            }
            if (
              pickedNowBillboard &&
              pickedNowBillboard.primitive &&
              typeof pickedNowBillboard.primitive != "undefined" &&
              pickedNowBillboard.primitive._actualPosition
            ) {
              console.log(pickedNowBillboard.id);
              console.log(
                "pickedNowBillboard.primitive : " + pickedNowBillboard.primitive
              );
              changedC = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                viewer.scene,
                pickedNowBillboard.primitive._actualPosition
              );
              viewer.scene.postRender.addEventListener(function () {
                if (
                  pickedNowBillboard &&
                  pickedNowBillboard.primitive &&
                  typeof pickedNowBillboard.primitive != "undefined" &&
                  pickedNowBillboard.primitive._actualPosition
                ) {
                  var changedC =
                    Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                      viewer.scene,
                      pickedNowBillboard.primitive._actualPosition
                    );
                  if (c && changedC && c.x && changedC.x && c.y && changedC.y) {
                    if (c.x !== changedC.x || c.y !== changedC.y) {
                      update(changedC, pickedNowBillboard.id?.Tid);
                      c = changedC;
                    }
                  }
                }
              });
            }
          }
          if (
            pickedNowBillboard &&
            pickedNowBillboard.primitive.text &&
            pickedNowBillboard.primitive.text != ""
          ) {
            // 点击了图标
            console.log("点击了图标");
            //启用实监听功能
            var $info = $("#Mark_1");
            var $defence = $("#defence");
            var changedC = {};
            var c = new Cesium.Cartesian2(event.position.x, event.position.y);
            function update(c, Tid) {
              if (
                Tid &&
                pickedNowBillboard?.id?.Tid &&
                Tid === pickedNowBillboard?.id.Tid
              ) {
                if (location.href.indexOf("centerSecond") != -1) {
                  var x = c.x - $info.width() / 2 + 252;
                  var y = c.y - $info.height() - 5;
                } else {
                  var x = c.x - $info.width() / 2;
                  var y = c.y - $info.height() - 5;
                }

                // $info.css(
                //   "transform",
                //   "translate3d(" + x + "px, " + (y - 25) + "px, 0)"
                // );
                $info.css({
                  left: x + "px",
                  top: y - 26 + "px",
                });
                $defence.css({
                  left: x + "px",
                  top: y - 26 + "px",
                });
              }
            }
            if (
              pickedNowBillboard &&
              pickedNowBillboard.primitive &&
              typeof pickedNowBillboard.primitive != "undefined" &&
              pickedNowBillboard.primitive._backgroundBillboard._actualPosition
            ) {
              console.log(pickedNowBillboard.id);
              console.log(
                "pickedNowBillboard.primitive._backgroundBillboard._actualPosition : " +
                  pickedNowBillboard.primitive._backgroundBillboard
                    ._actualPosition
              );
              changedC = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                viewer.scene,
                pickedNowBillboard.primitive._backgroundBillboard
                  ._actualPosition
              );
              viewer.scene.postRender.addEventListener(function () {
                if (
                  pickedNowBillboard &&
                  pickedNowBillboard.primitive &&
                  typeof pickedNowBillboard.primitive != "undefined" &&
                  pickedNowBillboard.primitive._backgroundBillboard &&
                  pickedNowBillboard.primitive._backgroundBillboard
                    ._actualPosition
                ) {
                  var changedC =
                    Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                      viewer.scene,
                      pickedNowBillboard.primitive._backgroundBillboard
                        ._actualPosition
                    );
                  if (c && changedC && c.x && changedC.x && c.y && changedC.y) {
                    if (c.x !== changedC.x || c.y !== changedC.y) {
                      update(changedC, pickedNowBillboard.id?.Tid);
                      c = changedC;
                    }
                  }
                }
              });
            }
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
        //如果是新建点位 则绘制图标
        if (newPoint == 1) {
          GisMap.drawPoint(ClickNowLngLonHeight, "新建点位");
        }
        if (newPoint == 2) {
          GisMap.drawPoint(ClickNowLngLonHeight, "修改点位");
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
        console.log("屏幕坐标:", event.position);
        //如果点击了标注
        var pick = viewer.scene.pick(event.position);
        //选中某模型   pick选中的对象
        if (pick && pick.id && pick.id.label) {
          console.log(pick);
          //必须点击广告牌标注才显示Div弹层
          // if (pick.id && pick.primitive && pick.primitive._imageId) {
          if (
            pick.id &&
            pick.primitive &&
            (pick.primitive._imageId || pick.primitive._text)
          ) {
            // 打开Div弹层
            // 就是外站不是要求月更五个视频吗，我
            // MarkOpen = true;
            if (pick.id.Ttype) {
              if (pick.id.Ttype == "报警") {
                console.log(pick.id);
                GisMap.UIConfing(pick.id.Tid, pick.id.Ttype, pick.id.Tname);
              } else {
                if (pick.id.Ttype_type) {
                  GisMap.UIConfing(
                    pick.id.Tid,
                    pick.id.Ttype,
                    "",
                    pick.id.Ttype_type
                  );
                } else {
                  GisMap.UIConfing(pick.id.Tid, pick.id.Ttype);
                }
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
  //双击事件
  MouseKeyChangeDOUBLE() {
    new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas).setInputAction(
      (event) => {
        console.log("双击事件：" + event);
        // //摄像机接触lookAt
        camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
      },
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
  },
  //删除Geojson或json数据
  GeojsonRemove(obj) {
    if (viewer.dataSources.length > 0) {
      viewer.dataSources.remove(obj);
    }
  },
  FlyTo() {
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
      complete: function complete() {
        camera.lookAt(
          center,
          new Cesium.HeadingPitchRange(heading, pitch, range)
        );
        camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
      },
    });
  },
};
//初始化Gis应用
Gisinit.init();

var currentProject = projectListMap[top.location.hostname];
console.log(currentProject);
if (currentProject && currentProject.isLoadingModel) {
  //加载模型和地图
  Gisinit.ModelMapDatas(currentProject);
} else {
  //加载点云数据
  // Gisinit.Dianyun();
}

//鼠标和键盘相关操作
Gisinit.MouseKeyChange();