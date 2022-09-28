/* eslint-disable default-case */
/* eslint-disable no-undef */
//判断是否可以删除区域
var drawAreaClose = false;
var drawObj = {
  /**
   * 根据类型绘制对象
   * @param type point、polyline、polygon
   */
  draw: function (type, config, callback) {
    //绘制点
    let tempEntities = [];
    let position = [];
    let tempPoints = [];
    // 开启深度检测
    viewer.scene.globe.depthTestAgainstTerrain = true;
    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    switch (type) {
      case "point":
        // 监听鼠标左键
        handler.setInputAction(function (movement) {
          // 从相机位置通过windowPosition 世界坐标中的像素创建一条射线。返回Cartesian3射线的位置和方向。
          let ray = viewer.camera.getPickRay(movement.position);
          // 查找射线与渲染的地球表面之间的交点。射线必须以世界坐标给出。返回Cartesian3对象
          position = viewer.scene.globe.pick(ray, viewer.scene);
          let point = drawObj.drawPoint(position);
          tempEntities.push(point);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        // 左键双击停止绘制
        handler.setInputAction(function () {
          handler.destroy(); //关闭事件句柄
          handler = null;
        }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        // 右击单击停止绘制
        handler.setInputAction(function () {
          handler.destroy(); //关闭事件句柄
          handler = null;
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        break;
      case "polyline":
        //鼠标移动事件
        handler.setInputAction(function (movement) {},
        Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        //左键点击操作
        handler.setInputAction(function (click) {
          var pick = viewer.scene.pick(click.position);
          console.log(pick);
          if (pick && pick.id && pick.id.label) {
            console.log(pick);
            //调用获取位置信息的接口
            let ray = viewer.camera.getPickRay(click.position);
            position = viewer.scene.globe.pick(ray, viewer.scene);
            tempPoints.push(position);
            let tempLength = tempPoints.length;
            //调用绘制点的接口
            let point = drawObj.drawPoint(tempPoints[tempPoints.length - 1]);
            tempEntities.push(point);
            if (tempLength > 1) {
              let pointline = drawObj.drawPolyline([
                tempPoints[tempPoints.length - 2],
                tempPoints[tempPoints.length - 1],
              ]);
              tempEntities.push(pointline);
            } else {
              // tooltip.innerHTML = "请绘制下一个点，右键结束";
            }
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        //右键点击操作
        handler.setInputAction(function (click) {
          tempPoints = [];
          handler.destroy(); //关闭事件句柄
          handler = null;
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        break;
      case "polygon":
        //鼠标移动事件
        handler.setInputAction(function (movement) {},
        Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        //左键点击操作
        handler.setInputAction(function (click) {
          console.log("拾取模型表面的位置");
          drawAreaClose = false;
          var scene = viewer.scene;
          var pickedObject = scene.pick(click.position); //判断是否拾取到模型
          if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
            var cartesian = viewer.scene.pickPosition(click.position);
            if (Cesium.defined(cartesian)) {
              // var cartographic = Cesium.Cartographic.fromCartesian(cartesian); //根据笛卡尔坐标获取到弧度
              // var lng = Cesium.Math.toDegrees(cartographic.longitude); //根据弧度获取到经度
              // var lat = Cesium.Math.toDegrees(cartographic.latitude); //根据弧度获取到纬度
              // var height = cartographic.height;//模型高度
              // console.log(lng, lat, height);
              tempPoints.push(cartesian);
              let point = drawObj.drawPoint(cartesian);
              tempEntities.push(point);
              let tempLength = tempPoints.length;
              if (tempLength > 1) {
                let pointline = drawObj.drawPolyline([
                  tempPoints[tempPoints.length - 2],
                  tempPoints[tempPoints.length - 1],
                ]);
                tempEntities.push(pointline);
              } else {
                // tooltip.innerHTML = "请绘制下一个点，右键结束";
              }
            }
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        //右键点击操作
        handler.setInputAction(function (click) {
          let cartesian = viewer.camera.pickEllipsoid(
            click.position,
            viewer.scene.globe.ellipsoid
          );
          if (cartesian) {
            let tempLength = tempPoints.length;
            if (tempLength < 3) {
              alert("请选择3个以上的点再执行闭合操作命令");
            } else {
              drawAreaClose = true;
              //闭合最后一条线
              let pointline = drawObj.drawPolyline([
                tempPoints[tempPoints.length - 1],
                tempPoints[0],
              ]);
              tempEntities.push(pointline);
              drawObj.drawPolygon(tempPoints, config);
              tempEntities.push(tempPoints);
              callback(tempEntities[tempEntities.length - 1], config);
              handler.destroy(); //关闭事件句柄
              handler = null;
            }
          }
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        break;
    }
  },
  drawPoint: function (position, config_) {
    let config = config_ ? config_ : {};
    return viewer.entities.add({
      name: "点几何对象",
      position: position,
      point: {
        color: config.color
          ? new Cesium.Color.fromCssColorString(config.color)
          : Cesium.Color.SKYBLUE,
        pixelSize: 5,
        outlineColor: config.outlineColor
          ? new Cesium.Color.fromCssColorString(config.outlineColor)
          : Cesium.Color.YELLOW,
        outlineWidth: 2,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
    });
  },
  drawPolyline: function (positions, config_) {
    if (positions.length < 1) return;
    let config = config_ ? config_ : {};
    return viewer.entities.add({
      name: "线几何对象",
      polyline: {
        positions: positions,
        width: config.width ? config.width : 5.0,
        material: new Cesium.PolylineGlowMaterialProperty({
          color: config.color
            ? new Cesium.Color.fromCssColorString(config.color)
            : Cesium.Color.GOLD,
        }),
        depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
          color: config.color
            ? new Cesium.Color.fromCssColorString(config.color)
            : Cesium.Color.GOLD,
        }),
        // clampToGround: true,
      },
    });
  },
  drawPolygon: function (positions, config_) {
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
      // classificationType: ClassificationType.TERRAIN
    });
  },
  clearDrawEntities: function () {
    this.tempEntities = [];
    // 清除之前的实体
    const entitys = viewer.entities._entities._array;
    console.log(entitys, "清除实体");
    let length = entitys.length;
    // 倒叙遍历防止实体减少之后entitys[f]不存在
    for (let f = length - 1; f >= 0; f--) {
      if (
        entitys[f]._name &&
        (entitys[f]._name === "点几何对象" ||
          entitys[f]._name === "线几何对象" ||
          entitys[f]._name === "面几何对象")
      ) {
        viewer.entities.remove(entitys[f]);
      }
    }
  },
  // drawLine: function (data) {
  //   const positions = data.map(v => {
  //     const position = Cesium.Cartesian3.fromDegrees(
  //       v.xCoordinate,
  //       v.yCoordinate,
  //       v.zCoordinate
  //     )
  //     drawObj.drawPoint(position);
  //     return position
  //   })
  //   console.log(positions);
  //   if (data.length > 1) {
  //     drawObj.drawPolyline(positions);
  //   } else {
  //     drawObj.clearDrawEntities();
  //   }
  // },
  drawLine: function (data) {
    drawObj.clearDrawEntities();
    if (data.length > 1) {
      const notPositions = data
        .filter((item) => !item.status)
        .map((v) => {
          const position = Cesium.Cartesian3.fromDegrees(
            Number(v.xCoordinate),
            Number(v.yCoordinate),
            Number(v.zCoordinate)
          );
          drawObj.drawPoint(position);
          return position;
        });
      const positions = data
        .filter((item) => item.status)
        .map((v) => {
          const position = Cesium.Cartesian3.fromDegrees(
            Number(v.xCoordinate),
            Number(v.yCoordinate),
            Number(v.zCoordinate)
          );
          drawObj.drawPoint(position, {
            color: "#D2691E",
            outlineColor: "#FFEBCD",
          });
          return position;
        });
      console.log(notPositions);
      console.log(positions);
      // 未巡检路径
      if (notPositions.length) {
        if (notPositions.length === data.length) {
          // 如果全部未巡检
          drawObj.drawPolyline(notPositions);
        } else {
          // 部分已巡检
          drawObj.drawPolyline(positions, {
            color: "red",
          });
          // 部分未巡检
          // 获取已巡检点位最后值
          const lastObj = data.filter((item) => item.status)[
            positions.length - 1
          ];
          const currentArr = [lastObj].map((v) => {
            const position = Cesium.Cartesian3.fromDegrees(
              Number(v.xCoordinate),
              Number(v.yCoordinate),
              Number(v.zCoordinate)
            );
            drawObj.drawPoint(position);
            return position;
          });
          // 连接已巡检和未巡检
          const newarr = currentArr.concat(...notPositions);
          drawObj.drawPolyline(newarr);
        }
      } else {
        // 全部已巡检
        drawObj.drawPolyline(positions, {
          color: "red",
        });
      }
    } else {
      drawObj.clearDrawEntities();
    }
  },
  drawArea: function (positions, positionInfo) {
    positions.map((v) => drawObj.drawPoint(v));
    drawObj.drawPolyline(positions);
    drawObj.drawPolyline([positions[positions.length - 1], positions[0]]);
    drawObj.drawPolygon(positions, {
      color: positionInfo.aeraColor,
      opacity: positionInfo.aeraOpacity,
    });
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
};
