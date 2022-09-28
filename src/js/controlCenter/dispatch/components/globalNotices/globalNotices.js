import { Button, notification } from 'antd';
// import cmtEvents from '../../utils/cmtEvents';
import './globalNotices.scss'
const openNotification = (msg) => {
  function clo(key,actionType) {
    notification.close(key)
    // cmtEvents.emit('acceptTheCallFeedBack',actionType)
  }
  const key = `open${Date.now()}`;
  const btn = (
    <div className='dispatch-notice-btns'>
      <Button id="answer" className="jixibtn topLight" onClick={() => clo(key,'answer')}>接听</Button>
      <Button id="answer_off" className="jixibtn topLight" onClick={() => clo(key,'hangUp')}>挂断</Button>
    </div>
  )
  notification.info({
    btn,
    key,
    duration: null,
    message: '来电话了',
    description: `号码为${msg.from}`,
    onClose:(key) => {
      console.log('is close',key);
      // cmtEvents.emit('acceptTheCallFeedBack','hangUp')
    }
  });
};
export default openNotification