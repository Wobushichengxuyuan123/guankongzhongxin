/* eslint-disable no-undef */
(function () {
  // function loadCss(url) {
  //   var head = document.getElementsByTagName('head')[0];
  //   var link = document.createElement('link');
  //   link.type = 'text/css';
  //   link.rel = 'stylesheet';
  //   link.media = "print";//打印的css(显示于屏幕的css---->media="screen")
  //   link.href = url;//文件的真实路径(eg:link.href = "css/A4print.css"; )
  //   head.appendChild(link);
  // }
  // loadCss('/Gisweb/js/xian/css/yixian.css')
  // loadCss('/Gisweb/js/xian/css/colorpicker.css')
  var toolHtml = `
  <div class="yixianCon_List">绘制工具</div>
  <div class="yixianCon_LC">
    <div class="yixianCon_Btn Btn1">开始绘制</div>
    <div class="yixianCon_Btn Btn2">删除绘制</div>
    <div class="yixianCon_Btn Btn3">保存</div>
  </div>
  <div class="yixianCon_LC2">
    <div class="yixianCon_sett yixianCon_List2">
      <div class="yixianCon_sett_color">
        <p>区域颜色：</p>
        <p class="yixianCon_sett_colorF" id="yixianCon_sett_colorF"></p>
      </div>
      <div class="yixianCon_sett_opacity">
        <p>透明度：</p>
        <strong>
          <span class="yixianCon_sett_sto">0.2</span>
        </strong>
        <ul class="yixianCon_sett_opacity_ul">
          <li value="0">0</li>
          <li value="0.1">0.1</li>
          <li value="0.2">0.2</li>
          <li value="0.4">0.3</li>
          <li value="0.6">0.4</li>
          <li value="0.6">0.6</li>
          <li value="0.6">0.8</li>
          <li value="0.6">1.0</li>
        </ul>
      </div>
    </div>
  </div>
  `
  $('#yixianCon').html(toolHtml);
  // 拾色器启用
  var a = Colorpicker.create({
    el: "yixianCon_sett_colorF",
    color: "rgba(255, 0, 0, 0.7)",
    change: function (elem, rgba) {
      elem.style.backgroundColor = rgba;
    },
  });

  var polygonArr;// 多边形坐标数据集
  var polygonInfo; // 多边形颜色信息
  // 开始绘制
  $(".Btn1").on("click", function () {
    //   颜色值数据梳理
    var C1 = $(".yixianCon_sett_colorF")
      .css("background-color")
      .slice(
        5,
        $(".yixianCon_sett_colorF").css("background-color").length - 1
      );
    var C2 = C1.split(",");
    var C3 = [];
    for (var i = 0; i < C2.length - 1; i++) {
      C3.push(Number(C2[i]) / 255);
    }
    console.log(C3);
    var data = {
      color: C3,
      opacity: $(".yixianCon_sett_opacity > strong span").text(),
    };
    console.log(data);
    drawObj.draw('polygon', data, function (coord, config) {
      console.log(coord);
      polygonArr = coord;
      polygonInfo = config;
    })
    // window.PushData("yixianQuYu" + "@" + JSON.stringify(data));
  });
  // 删除绘制
  $(".Btn2").on("click", function () {
    // window.PushData("yixianQuYu_del" + "@" + "del");
    drawObj.clearDrawEntities()
  });
  // 保存
  $(".Btn3").on("click", function () {
    // window.PushData("yixianQuYu_save" + "@" + "save");
    if (Array.isArray(polygonArr) && polygonArr.length) {
      // 笛卡尔坐标转经纬度坐标
      var APS = polygonArr.map(v => {
        // 1.三维坐标到地理坐标的转换
        var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(v);
        // 2.地理坐标到经纬度坐标的转换
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        var lng = Cesium.Math.toDegrees(cartographic.longitude);
        var height = cartographic.height;
        return `${lng},${lat},${height}`;
      })
      console.log(APS);
      console.log(camera);
      var data = {
        roll: Cesium.Math.toDegrees(camera.pitch),
        pitch: Cesium.Math.toDegrees(camera.pitch),
        heading: Cesium.Math.toDegrees(camera.heading),
        position: camera.position,
        APS,
        aeraColor: polygonInfo.color,
        aeraOpacity: polygonInfo.opacity,
      }
      Ajax.saveLocationArea({
        mapJson: JSON.stringify(data),
        coordinate: APS.join(';')
      })
    } else {
      alert('未绘制区域或请清除后重新绘制')
    }
  });
  //  选择透明度
  $(".yixianCon_sett_sto").on("click", function () {
    $(".yixianCon_sett_opacity_ul").fadeIn();
  });
  $(".yixianCon_sett_opacity_ul > li").on("click", function () {
    $(".yixianCon_sett_opacity_ul").hide();
    $(".yixianCon_sett_sto").text($(this).text());
  });

  // 隐藏拾色器
  function ColorpickerClose(data) {
    console.log(data);
    $(".colorpicker-mask").parent().css("display", "none");
  }

  // 获取区域数据
  setTimeout(() => {
    Ajax.getLocationArea()
  }, 4000);
}())