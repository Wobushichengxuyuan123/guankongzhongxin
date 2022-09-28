import React from 'react'
// import {ztConfig,companyConfig} from "@/js/utils/cmt-config.js";

export default function contItem(props) {
  // *如果单兵账号不等于当前用户账号则为左侧，
  const {sipNum,name,content,date} = props
  let flag = sipNum == window.dispatchCenterTel ? true : false
  let infoDivClassName = `infoDiv infoDiv_left ${flag ? 'infoDiv_right' : ''}`
  let wrapFatherClassName = `${ flag ? 'bubble-box-right arrow-right' : 'bubble-box-left arrow-left'} `
  return( 
    <li>
      <div className={infoDivClassName}>
        <div className="timer">
          <span>
            {date}
          </span>
        </div>
        <div className="user">
          <span>{
            flag ? '我' : (name || sipNum)
          }</span>
        </div>
        <div className={wrapFatherClassName}>
          <div className="wrap">
            <span>{content}</span>
          </div>
        </div>
      </div>
    </li>
  )
}
