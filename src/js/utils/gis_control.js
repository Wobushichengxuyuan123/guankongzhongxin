let gisControl = {
  /**
   * @namespace 子菜单menu控制地球的开关
   * @param {String} flag - 'none'/'block'
   */
  menuSwitchGis: function(flag='none') {
    let gisDomList = document.querySelectorAll('.gis_control');
    let Layerui = document.querySelector('#Layerui');
    Layerui&&(Layerui.style.display = flag);
    if (gisDomList.length!==0) {
      gisDomList.forEach(v => {
        v.style.display = flag;
      })
    }
  },
  /**
   * @namespace gis地球的开关
   * @params {Object} routerComponentThis - 路由组件的this
   */
  switchGis: function switchGis(routerComponentThis) {
    let that = routerComponentThis;
    function isClose(location){
      let gisDomList = document.querySelectorAll(".gis_control");
      let Layerui = document.querySelector('#Layerui');
      let reg = /(\/video)|(\/patrol\/statisticalAnalysis)/ig
      let _name = location.pathname;
      let flag = reg.test(_name);
      if (flag) {
        Layerui&&(Layerui.style.display = "none")
      } else {
        Layerui&&(Layerui.style.display = "block")
      }
      if (gisDomList.length!==0) {     
        gisDomList.forEach((v) => {
          if (flag) {
            v.style.display = "none";
          } else {
            v.style.display = "block";
          }
        });
      }
    }
    isClose(that.props.location)
    that.props.history.listen((location) => {
      isClose(location)
    });
  },
};
export default gisControl;
