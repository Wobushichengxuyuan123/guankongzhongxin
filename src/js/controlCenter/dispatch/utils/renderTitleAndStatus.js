import { findCurrentTabPane } from "./middleData";
export const renderTreeLeafSipSvg = (sipType) => {
  // 帽子：typeCode：S7010，手环:S8010，单兵: S6010 , 调度台DDT, 否则：未知设备？
  sipType += ""
  switch(sipType) {
    case "danbing":
      return (
        <svg
        t="1656493130897"
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3628"
        width="25"
        height="25"
      >
        <path
          d="M703.326316 110.484211c-140.126316 0-258.694737 99.705263-282.947369 234.442105l-2.694736 8.08421c-2.694737 10.778947 5.389474 18.863158 16.168421 21.557895 10.778947 2.694737 18.863158-5.389474 21.557894-16.168421V350.315789c5.389474-37.726316 21.557895-72.757895 43.11579-102.4 18.863158 13.473684 45.810526 24.252632 72.757895 32.336843-5.389474 26.947368-8.084211 51.2-10.778948 72.757894 0 10.778947 8.084211 18.863158 16.168421 21.557895h2.694737c10.778947 0 18.863158-8.084211 18.863158-16.168421 2.694737-18.863158 5.389474-43.115789 10.778947-67.368421 24.252632 2.694737 51.2 5.389474 70.063158 5.389474v80.842105h-18.863158c-10.778947 0-18.863158 8.084211-18.863158 18.863158 0 10.778947 8.084211 18.863158 18.863158 18.863158h18.863158v83.536842h-21.557895c-10.778947 0-18.863158 10.778947-18.863157 18.863158 0 10.778947 8.084211 18.863158 18.863157 18.863158h18.863158v94.315789c-5.389474-2.694737-8.084211-5.389474-13.473684-8.08421-8.084211-8.084211-18.863158-5.389474-26.947368 0-5.389474 8.084211-5.389474 18.863158 0 24.252631-2.694737 2.694737-2.694737 5.389474-5.389474 8.084211-2.694737 10.778947 5.389474 18.863158 16.168421 21.557894 16.168421 2.694737 29.642105 2.694737 45.810526 2.694737 156.294737 0 282.947368-129.347368 282.947369-285.642105 13.473684-153.6-113.178947-282.947368-272.168421-282.947368z m199.410526 431.157894c-18.863158-13.473684-45.810526-24.252632-72.757895-29.642105 8.084211-37.726316 10.778947-72.757895 13.473685-97.010526h107.789473c-5.389474 48.505263-21.557895 91.621053-48.505263 126.652631z m-121.263158 0c-13.473684 35.031579-32.336842 67.368421-59.28421 88.926316v-94.315789c18.863158 0 40.421053 2.694737 59.28421 5.389473z m37.726316 8.084211c24.252632 5.389474 45.810526 13.473684 59.284211 21.557895-29.642105 29.642105-64.673684 51.2-102.4 61.978947 18.863158-24.252632 35.031579-53.894737 43.115789-83.536842z m24.252632-172.463158c0-24.252632-2.694737-59.284211-10.778948-94.31579 26.947368-5.389474 53.894737-16.168421 72.757895-32.336842 26.947368 35.031579 43.115789 78.147368 45.810526 126.652632h-107.789473z m35.031579-153.6c-13.473684 10.778947-35.031579 18.863158-59.284211 24.252631C808.421053 215.578947 794.947368 185.936842 773.389474 161.684211c40.421053 10.778947 78.147368 32.336842 105.094737 61.978947zM722.189474 161.684211c29.642105 21.557895 48.505263 56.589474 61.978947 91.621052-18.863158 2.694737-40.421053 5.389474-61.978947 5.389474V161.684211z m-194.021053 61.978947C557.810526 194.021053 592.842105 172.463158 633.263158 161.684211c-21.557895 24.252632-35.031579 56.589474-45.810526 86.231578-26.947368-8.084211-45.810526-16.168421-59.284211-24.252631zM684.463158 161.684211v97.010526c-18.863158 0-40.421053-2.694737-61.978947-5.389474 13.473684-35.031579 32.336842-70.063158 61.978947-91.621052z m37.726316 134.736842c16.168421 0 43.115789-2.694737 70.063158-5.389474 8.084211 35.031579 10.778947 67.368421 10.778947 88.926316h-80.842105V296.421053z m83.536842 118.568421c0 21.557895-2.694737 53.894737-10.778948 88.926315-26.947368-5.389474-53.894737-5.389474-70.063157-5.389473v-83.536842h80.842105z"
          fill="#101010"
          p-id="3629"
        ></path>
        <path
          d="M218.273684 730.273684h309.894737c18.863158 0 35.031579-16.168421 35.031579-35.031579v-199.410526c0-18.863158-16.168421-35.031579-35.031579-35.031579H218.273684c-18.863158 0-35.031579 16.168421-35.031579 35.031579v199.410526c0 18.863158 16.168421 35.031579 35.031579 35.031579z m2.694737-231.747368h304.505263v194.021052H220.968421v-194.021052z"
          fill="#101010"
          p-id="3630"
        ></path>
        <path
          d="M611.705263 759.915789c8.084211-10.778947 10.778947-21.557895 10.778948-35.031578v-261.389474c0-32.336842-26.947368-59.284211-59.284211-59.284211H180.547368c-32.336842 0-59.284211 26.947368-59.28421 59.284211v261.389474c0 13.473684 5.389474 24.252632 10.778947 35.031578l-86.231579 91.621053c-16.168421 18.863158-13.473684 32.336842-10.778947 40.421053 5.389474 10.778947 18.863158 18.863158 32.336842 18.863158h603.621053c13.473684 0 26.947368-8.084211 32.336842-18.863158 2.694737-8.084211 5.389474-21.557895-10.778948-40.421053l-80.842105-91.621053z m-452.715789-296.421052c0-10.778947 10.778947-21.557895 21.557894-21.557895h382.652632c10.778947 0 21.557895 10.778947 21.557895 21.557895v261.389474c0 10.778947-10.778947 21.557895-21.557895 21.557894H180.547368c-10.778947 0-21.557895-10.778947-21.557894-21.557894v-261.389474z m212.88421 412.294737H78.147368l86.231579-91.621053c5.389474 2.694737 10.778947 2.694737 16.168421 2.694737h382.652632c5.389474 0 10.778947 0 16.168421-2.694737l86.231579 91.621053H371.873684z"
          fill="#101010"
          p-id="3631"
        ></path>
      </svg>
      )
    case "ddt":
    case "DDT":
      return (
        <svg t="1639711187685" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="10401" width="25" height="25">
        <path d="M442.532554 412.838202l-1.806225 276.352552h30.705839v-115.598453h207.715971l-211.328423-164.366551z"
          fill="#333333" p-id="10402"></path>
        <path
          d="M544.584314 210.540908l-348.601586 236.615585 5.418677 74.055259h65.024131v305.252166h534.642847v-312.47707h66.830355v-63.217904l-323.314424-240.228036z m-12.643581 518.386815c-100.729602 0-182.428809-81.706432-182.428809-182.42881 0-100.758502 81.699207-182.428809 182.428809-182.428809 100.744052 0 182.428809 81.677532 182.42881 182.428809 0 100.744052-81.684757 182.428809-182.42881 182.42881z"
          fill="#333333" p-id="10403"></path>
      </svg>
      )
      break;
    case "S7010":
      return (
        <svg t="1636283675217" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="5317" width="20" height="20">
          <path
            d="M611.5 484.005V314.527c0-12.22-9.908-22.125-22.125-22.125-12.22 0-22.125 9.905-22.125 22.125v169.477c0 12.217 9.905 22.125 22.125 22.125 12.217 0.001 22.125-9.907 22.125-22.124m-132.75 0V314.527c0-12.22-9.908-22.125-22.125-22.125-12.22 0-22.125 9.905-22.125 22.125v169.477c0 12.217 9.905 22.125 22.125 22.125 12.217 0.001 22.125-9.907 22.125-22.124M235.375 638.88h575.25c12.217 0 22.125-9.908 22.125-22.125 0-12.22-9.908-22.125-22.125-22.125h-575.25c-12.22 0-22.125 9.905-22.125 22.125 0 12.217 9.905 22.125 22.125 22.125"
            p-id="5318">
          </path>
          <path
            d="M832.75 598.727v-4.1c-0.047-140.492-93.637-259.161-222.224-297.103-4.688-32.112-31.995-56.819-65.401-56.897h-44.25c-33.409 0.077-60.715 24.784-65.404 56.897-128.586 37.943-222.177 156.612-222.221 297.104v4.1c-25.698 9.166-44.186 33.424-44.25 62.275 0.082 36.654 29.718 66.293 66.375 66.375h575.25c36.654-0.082 66.291-29.721 66.373-66.375-0.065-28.851-18.552-53.109-44.248-62.276z m-22.125 84.401h-575.25c-12.025-0.022-22.103-10.1-22.127-22.125 0.024-12.025 10.102-22.103 22.127-22.125a22.267 22.267 0 0 0 15.642-6.48c4.12-4.12 6.483-9.819 6.483-15.645v-22.125c-0.048-125.391 87.066-230.808 204.227-258.577 9.945-2.359 17.021-11.308 17.021-21.528v-7.52c0.024-12.025 10.102-22.103 22.127-22.125h44.25c12.023 0.022 22.101 10.1 22.125 22.125v7.52c0 10.222 7.073 19.169 17.021 21.528C701.431 363.82 788.546 469.234 788.5 594.628v22.125a22.276 22.276 0 0 0 6.48 15.645 22.268 22.268 0 0 0 15.645 6.48c12.023 0.022 22.101 10.1 22.125 22.125-0.025 12.025-10.103 22.103-22.125 22.125z"
            p-id="5319">
          </path>
        </svg>
      )
      break;
    case "S8010":
      return (
        <svg t="1636283795465" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="5445" width="20" height="20">
          <path
            d="M590.1056 778.1568A188.1728 188.1728 0 0 1 515.2 793.6c-26.6112 0-51.9424-5.504-74.9056-15.4432L450.816 844.8h128.768l10.5216-66.6432z m-223.6096-57.0112A187.9872 187.9872 0 0 1 326.4 604.8v-134.4a188.0064 188.0064 0 0 1 41.3568-117.9392l24.2368-153.4464C394.3744 183.9232 407.5136 172.8 422.9504 172.8h184.4992c15.4368 0 28.576 11.1232 30.9568 26.2144l24.2368 153.4464A188.0064 188.0064 0 0 1 704 470.4v134.4c0 43.8912-14.976 84.2816-40.096 116.3456l-25.4976 161.44c-2.3808 15.0912-15.52 26.2144-30.9568 26.2144H422.9504c-15.4368 0-28.576-11.1232-30.9568-26.2144l-25.4976-161.44z m222.528-424.5696L579.584 236.8H450.816l-9.44 59.776A188.1984 188.1984 0 0 1 515.2 281.6c26.1952 0 51.1424 5.3376 73.824 14.976zM518.4 448a32 32 0 1 0 0-64 32 32 0 0 0 0 64z m0 117.0304a32 32 0 1 0 0-64 32 32 0 0 0 0 64z m0 117.024a32 32 0 1 0 0-64 32 32 0 0 0 0 64z"
            fill="#5C646F" p-id="5446">
          </path>
        </svg>
      )
      break;
    case "S6010":
      return (
        <svg t="1636283828084" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="5576" width="20" height="20">
          <path
            d="M716.8 1024H307.2c-42.496 0-76.8-34.304-76.8-76.8V76.8c0-42.496 34.304-76.8 76.8-76.8h409.6c42.496 0 76.8 34.304 76.8 76.8v870.4c0 42.496-34.304 76.8-76.8 76.8zM307.2 51.2c-14.336 0-25.6 11.264-25.6 25.6v870.4c0 14.336 11.264 25.6 25.6 25.6h409.6c14.336 0 25.6-11.264 25.6-25.6V76.8c0-14.336-11.264-25.6-25.6-25.6H307.2z"
            p-id="5577">
          </path>
          <path
            d="M448 89.6h128v25.6h-128zM512 934.4c-35.328 0-64-28.672-64-64s28.672-64 64-64 64 28.672 64 64-28.672 64-64 64z m0-102.4c-20.992 0-38.4 17.408-38.4 38.4s17.408 38.4 38.4 38.4 38.4-17.408 38.4-38.4-17.408-38.4-38.4-38.4z"
            p-id="5578">
          </path>
        </svg>
      )
      break;
    default:
      return (
        <svg t="1636548956571" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="3324" width="20" height="20">
          <path
            d="M512 51.2c254.08 0 460.8 206.72 460.8 460.8 0 254.08-206.72 460.8-460.8 460.8-254.08 0-460.8-206.72-460.8-460.8C51.2 257.92 257.92 51.2 512 51.2M512 0C229.248 0 0 229.248 0 512c0 282.752 229.248 512 512 512 282.752 0 512-229.248 512-512C1024 229.248 794.752 0 512 0L512 0 512 0zM512 0M477.888 640c-0.256 0-0.32-14.4-0.32-18.88 0-26.496 3.776-48.704 11.264-67.968 5.504-14.528 14.4-28.8 26.624-43.584 9.024-10.752 25.216-26.24 48.576-46.848 23.36-20.608 38.592-36.992 45.568-49.28C616.512 401.152 620.096 387.84 620.096 373.312c0-26.24-10.24-49.344-30.72-69.184-20.48-19.84-45.696-29.824-75.456-29.824-28.736 0-52.736 9.024-72 27.008C422.592 319.36 409.984 347.52 403.968 385.728L334.656 377.472c6.272-51.264 24.832-90.496 55.68-117.76C421.184 232.448 461.952 218.88 512.704 218.88c53.76 0 96.64 14.656 128.64 43.904 32 29.248 48 64.64 48 106.112 0 24-5.632 46.144-16.896 66.368-11.264 20.224-33.28 44.864-65.984 73.856C584.448 528.64 570.112 542.976 563.392 552.256 556.608 561.536 551.616 570.752 548.416 582.784 545.152 594.88 543.232 640 542.784 640L477.888 640 477.888 640zM479.872 768.384l0-64.192 64.192 0 0 64.192L479.872 768.384 479.872 768.384z"
            p-id="3325">
          </path>
        </svg>
      )
      break;
  }
}
export const renderTreeLeafMuteSvg = (muteFlag) => {
  // 0：非禁言，1：禁言
  muteFlag += ""
  switch(muteFlag) {
    case "0":
      return (
        <svg t="1636452679824" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="1000" width="20" height="20">
          <path
            d="M512 128a128 128 0 0 0-128 128v256a128 128 0 0 0 256 0V256a128 128 0 0 0-128-128z m0-64a192 192 0 0 1 192 192v256a192 192 0 1 1-384 0V256a192 192 0 0 1 192-192z m-32 832v-64A288.64 288.64 0 0 1 192 544V512a32 32 0 1 1 64 0v32A223.36 223.36 0 0 0 480 768h64A223.36 223.36 0 0 0 768 544V512a32 32 0 1 1 64 0v32A288.64 288.64 0 0 1 544 832v64h64a32 32 0 1 1 0 64h-192a32 32 0 1 1 0-64z"
            p-id="1001">
          </path>
        </svg>
      )
      break;
    case "1":
      return (
        <svg t="1636452850661" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="1263" width="20" height="20">
          <path
            d="M682 455V311l-76 76v68c-0.1 50.7-42 92.1-94 92-19.1 0.1-36.8-5.4-52-15l-54 55c29.1 22.4 65.9 36 106 36 93.8 0 170-75.1 170-168z"
            p-id="1264">
          </path>
          <path
            d="M833 446h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254-63 0-120.7-23-165-61l-54 54c48.9 43.2 110.8 72.3 179 81v102H326c-13.9 0-24.9 14.3-25 32v36c0.1 4.4 2.9 8 6 8h408c3.2 0 6-3.6 6-8v-36c0-17.7-11-32-25-32H547V782c165.3-17.9 294-157.9 294-328 0-4.4-3.6-8-8-8z m13.1-377.7l-43.5-41.9c-3.1-3-8.1-3-11.2 0.1l-129 129C634.3 101.2 577 64 511 64c-93.9 0-170 75.3-170 168v224c0 6.7 0.4 13.3 1.2 19.8l-68 68c-10.5-27.9-16.3-58.2-16.2-89.8-0.2-4.4-3.8-8-8-8h-60c-4.4 0-8 3.6-8 8 0 53 12.5 103 34.6 147.4l-137 137c-3.1 3.1-3.1 8.2 0 11.3l42.7 42.7c3.1 3.1 8.2 3.1 11.3 0L846.2 79.8l0.1-0.1c3.1-3.2 3-8.3-0.2-11.4zM417 401V232c0-50.6 41.9-92 94-92 46 0 84.1 32.3 92.3 74.7L417 401z"
            p-id="1265">
          </path>
        </svg>
      )
      break;
    default:
      break;
  }
}
export const renderTitleClassName = (item) => {
  let baseClass = 'treeLeaf ';
  let tem_class = '';
  if (!item.status) {
    item.status = 0
  }
  let status = item.status + '';
  switch(status) {
    case "0":
      tem_class = 'offline';
      break;
    case "1":
      tem_class = 'online';
      break;
    case "2":
      tem_class = 'busy';
      break;
    case "3":
      tem_class = 'online';
      break;
    default:
      tem_class = 'offline';
      break;
  }
  baseClass += tem_class
  return baseClass
}
export const renderTitleTxtStatus = (status) =>{
  // 0: 离线（offline），1：在线（online），2，繁忙（busy）
  status += "";
  switch (status) {
    case "0":
      return '离线'
      break;
    case "1":
      return '在线'
      break;
    case "2":
      return '繁忙'
      break;
    case "3":
      return '在线'
      break;
    default:
      return '离线'
      break;
  }
}
export const initSipNumOffline = (sipNumArr) => {
  let resArr = []
  sipNumArr.forEach(v => {
    resArr.push({
      online: 0, //离线
      sip: v
    })
  })
  return resArr
}
export const updateSipNumStatus = (treeData=[],sumSipNumStatus=[]) => {
  treeData.forEach(v => {
    if (v.children) {
      updateSipNumStatus(v.children,sumSipNumStatus)
    } else {
      let findRes = sumSipNumStatus.find(item => {
        return item.sip==v.personId
      })
      if (findRes) {
        v.status = findRes.online;
      }
    }
  })
  return treeData
}
export const updateSipNumCallStatus = (middleTabPaneActiveKey="", middleTabData=[],connectStatus={},type="makeAudioCall") => {
  /* 
    1- 我们要改变当前组的，该成员的cmtEventId
    2- 将数组返回
  */
  let tabPane = findCurrentTabPane(middleTabPaneActiveKey,middleTabData)
  if (type === 'makeAudioCall') {
    // 分配cmtEventId
    tabPane.content.some(v => {
      if (v.sipNum == connectStatus.sipNum) {
        v.cmtEventId = connectStatus.cmtEventId
        return true
      }
    })
  } else if(type === 'onEventConnected') {
    // "0"：挂断，"1"：连接，"2"：通话
    tabPane.content.some(v => {
      if (v.cmtEventId == connectStatus.cmtEventId) {
        v.callStatus = "2"
        // v.status = "2"
        return true
      }
    })
  } else if(type === 'onEventDisconnected') {
    // "0"：挂断，"1"：连接，"2"：通话
    tabPane.content.some(v => {
      if (v.cmtEventId == connectStatus.cmtEventId) {
        v.callStatus = "0"
        // v.status = "1"
        return true
      }
    })
  }
  // console.log(middleTabData,182);
  return middleTabData
}
export const updateSipNumMuteStatus = (treeData=[],cmtRes=null) => {}