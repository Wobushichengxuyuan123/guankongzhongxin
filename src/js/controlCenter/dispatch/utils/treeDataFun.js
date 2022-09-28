export const treeDataHandleFun = {
// const treeDataHandleFun = {
  filterEmptyEquipment: function (array = [], index = 0, props = []) {
    return array.filter((v1) => {
      if (v1[props[index]] && v1[props[index]].length !== 0) {
        if (index == props.length - 1) {
          return true;
        }
        let aliasIndex = index;
        aliasIndex++;
        // new add filter not isc_user
        // if (props[index] == 'personList') {
        //   v1[props[index]] = v1[props[index]].filter(personInfo => {
        //     return personInfo.iscLoginName;
        //   });
        // }
        if (!v1.children) {
          v1.children = v1[props[index]] = treeDataHandleFun.filterEmptyEquipment(v1[props[index]],aliasIndex,props);
        } else {
          // old
          v1[props[index]] = treeDataHandleFun.filterEmptyEquipment(v1[props[index]],aliasIndex,props);
        }
        if (v1[props[index]].length !== 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
  },
  // already have children
  mixinNewProps: function (array = [],sourceKeyProps = [],sourceTitleProps = []) {
    return array.map((v) => {
      if (v.children && v.children.length !== 0) {
        v.children = treeDataHandleFun.mixinNewProps(v.children,sourceKeyProps,sourceTitleProps);
      }
      if (!v.children || v.children.length == 0) {
        let firstEqu = (v.equipmentList&&v.equipmentList[0])||{...v};
        v.sipNum = firstEqu.communicationAccount||firstEqu.account || firstEqu.portableSoldierNo || firstEqu.equipmentCode || firstEqu.individualNumber;
        v.sipTypeTxt = firstEqu.typeName || null;
        v.sipType = firstEqu.typeCode || null;
        v.status = firstEqu.status || 0;
        v.callStatus = firstEqu.callStatus || "";
        v.cmtEventId = firstEqu.cmtEventId || "";
        v.personId = firstEqu.communicationAccount||firstEqu.account || firstEqu.personId||firstEqu.equipmentId;
      }
      for (let i = 0; i < sourceKeyProps.length; i++) {
        let v2 = sourceKeyProps[i];
        if (v[v2]) {
          v["key"] = v[v2];
          break;
        } else {
          v["key"] = v[sourceKeyProps[i+1]];
        }
      }
      for (let i = 0; i < sourceTitleProps.length; i++) {
        let v2 = sourceTitleProps[i];
        if (v[v2]) {
          v["title"] = v[v2];
          break;
        }
      }
      return v;
    });
  },
  // add children
  mixinChildrenProps: function(array=[],index=0,props=[]) {
    return array.map(v => {
      if (index<=props.length&&v[props[index]]&&v[props[index]].length!==0) {
        let tem_index = index
        tem_index++
        v.children = v[props[index]] = treeDataHandleFun.mixinChildrenProps(v[props[index]],tem_index,props)
      }
      return v
    })
  },
  filterEmptyChildren: function(array=[]) {
    return array.filter(v => {
      return v.children&&v.children.length!==0
    })
  },
  createSinglePersonArray: function(array = [],backArr = []) {
    for (let i = 0; i < array.length; i++) {
      const e = array[i];
      if (!e.children||e.children.length===0) {
        backArr.push(e)
      } else {
        treeDataHandleFun.createSinglePersonArray(e.children,backArr)
      }
    }
  },
  createBasePersonInfo: function({ personId, sipNum, sipTypeTxt="", sipType="", status="0", callStatus="", cmtEventId="", key=sipNum, title=sipNum, name=sipNum, personLeaf=true,muteStatus="0"}) {
    let baseInfo = {
      key,
      props: {
        personId,
        sipNum,sipTypeTxt,
        sipType,status,
        callStatus,cmtEventId,
        title,personLeaf,name,
        muteStatus
      }
    }
    return baseInfo
  },
  // 针对通讯组,没人员列表,起的补丁
  specialCreatePersonList: function(array=[]) {
    array.forEach(v => {
      // v['personList'] = [];
      // let _id = [];
      // let _name = [];
      // if (v['personId'].length!==0) {
      //     _id = v['personId'].split(',')
      // }
      // if (v['personName'].length!==0) {
      //     _name = v['personName'].split(',')
      // }
      // _id.forEach((v2,i2) => {
      //   v['personList'].push({
      //     personId: v2,
      //     personName: _name[i2]
      //   })
      // })
      delete v['personId']
      delete v['personName']
    })
  },
  // 针对通讯设备,多组织机构,分散人员,起的补丁
  specialMergePersonList: function(array=[]) {
    let orgIdObj = {}
    let newArr = []
    array.forEach(v => {
      let obj = {
        typeCode: v.typeCode,
        personName: v.communicationName,
        personId: v.personId,
        communicationName: v.communicationName,
        communicationAccount: v.communicationAccount
      }
      if (!orgIdObj[v.orgId]) {
        orgIdObj[v.orgId] = {};
        orgIdObj[v.orgId]['accountList'] = [];
        orgIdObj[v.orgId]['orgId'] = v.orgId;
        orgIdObj[v.orgId]['orgName'] = v.orgName;
        orgIdObj[v.orgId]['accountList'].push(obj)
      } else {
        orgIdObj[v.orgId]['accountList'].push(obj)
      }
    })
    for (const key in orgIdObj) {
      const element = orgIdObj[key];
      newArr.push(element)
    }
    return newArr;
  }
};
