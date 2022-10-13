
/**
 * @alias 指挥调度的reducer
 */
declare function dispatchReducer(): any;



/**
 * @alias 指挥调度初始化store函数
 * @param store - 传入根项目的store
 */
declare function fnInitStore(store: any): any;



/**
 * @alias 改变指挥调度的主题色
 * @param R - 数值(0~255)，red
 * @param G - 数值(0~255)，green
 * @param B - 数值(0~255)，blue
 * @param A - 数值(0~255，默认255，可选),Alpha
 */
declare function fnChangeDispatchTheme(R: Number,G: Number,B: Number,A?: Number): any;




declare interface reduxUtils{
	/**
	 * 
	 * @param sipInfo - 注册融合通讯sip的相关信息
	 */
	setIscRelationMemberInfo(sipInfo: Object): any;
}
/**
 * @alias 直接与指挥调度的redux沟通的函数集
 */
declare const redux_utils: reduxUtils;




/**
 * @alias 指挥调度React组件
 */
declare var Dispatch;



export {
	dispatchReducer,
	fnInitStore,
	fnChangeDispatchTheme,
	redux_utils,
	Dispatch
}