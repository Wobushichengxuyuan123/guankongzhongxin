import { triggerType } from '../trigger';

let btnSwitch = window.parent._forceCloseBtnPower;
if (btnSwitch===false) {
  btnSwitch = 'hide-btn';
} else {
  btnSwitch = 'show-btn'
}
function btnPowerControl(flag) {
  if (flag =='show-btn') {
    Object.keys(triggerType).forEach(v => {
      window[v + '-btn'] = true
    })
  }
};
btnPowerControl(btnSwitch);
