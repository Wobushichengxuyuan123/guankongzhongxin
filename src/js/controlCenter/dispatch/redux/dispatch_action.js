import {SetMidTableData,SetMidTabActive,SetMiddleTabData,AddStatus,UpdateStatus,AddGroup,DelGroup,UpdateGroup,SetIscRelationInfo, SetTreeData,SetAcceptTheCallInfo} from './constant';

//同步action，就是指action的值为Object类型的一般对象
export const AddStatusAction = data => ({type:AddStatus,data});
export const UpdateStatusAction = data => ({type:UpdateStatus,data});
export const AddGroupAction = data => ({type:AddGroup,data});
export const DelGroupAction = data => ({type:DelGroup,data});
export const UpdateGroupAction = data => ({type:UpdateGroup,data});
export const SetIscRelationMemberInfoAction = data => ({type:SetIscRelationInfo,data});
export const SetMiddleTabDataAction = data => ({type:SetMiddleTabData,data});
export const SetMidTabActiveAction = data => ({type:SetMidTabActive,data});
export const SetMidTableDataAction = data => ({type:SetMidTableData,data});
export const SetTreeDataAction = data => ({type:SetTreeData,data});
export const SetAcceptTheCallInfoAction = data => ({type:SetAcceptTheCallInfo,data});