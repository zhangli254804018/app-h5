const ajax = require("./request.js")
let prefix = "http://app.huoju12.com";

// 接口文档地址:https://tgateway2.weein.cn/work_tel_api/index.html#api-CommissionController-withdraw
// 原型地址:http://pdd.maduoduo.com.cn/product/tuijianren/#g=1&p=%E6%8E%A8%E8%8D%90%E4%BA%BA


//App站点接口-ok
function appSite(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/appSite`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: true
	});
}

//获取密钥
///api/huoju/app/exclude/captcha
function getCaptcha(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/exclude/captcha`,
		method: "post",
		data: payload,
		showLoading: false,
	});
}

//登录
///api/huoju/app/exclude/login
function getLogin(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/exclude/login`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: true
	});
}

//注册是发送短信验证码-ok
///api/huoju/app/exclude/sendPhoneCode
function sendPhoneCode(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/exclude/sendPhoneCode`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: true
	});
}

//注册账号
function register(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/exclude/register`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: true
	});
}

//忘记密码
function forgetPassword(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/exclude/forgetPassword`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: true
	});
}

//我在首页tab的数据统计接口-ok
function myIndexStat(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/myIndexStat`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: true
	});
}

//首页公共数据接口
function appIndexConfig(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/appIndexConfig`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: true
	});
}

//首页公告
function listNoticeInfo(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/listNoticeInfo`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: false
	});
}

//vip列表
function vipInfoTab(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/vipInfoTab`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: false
	});
}

//根据vip显示充值列表
function payChannleList(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/payChannleList`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: false
	});
}

///api/huoju/app/appTaskConfig
//任务的广告和分类接口
function appTaskConfig(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/appTaskConfig`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: false
	});
}


///api/huoju/app/appTaskList
//任务列表
function appTaskList(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/appTaskList`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: false
	});
}

///api/huoju/app/recieveTask
//任务领取
function recieveTask(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/recieveTask`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: false
	});
}

///api/huoju/app/system/fileUpload
//图片上传
// type  task||douying||pay
// file   文件
function fileUpload(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/system/fileUpload`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: false
	});
}

///api/huoju/admin/system/ipPosition
//ip翻译接口
function ipPosition(payload) {
	return ajax.requestApi({
		url: `/api/huoju/admin/system/ipPosition`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: false
	});
}

///api/huoju/app/userRecordTabList
//我的记录列表
// taskStatus  0  // '任务状态0进行中,1审批中,2完成,-1失败',
// "current":"1",
// size:50
function userRecordTabList(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/userRecordTabList`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: false
	});
}

// 提交领取的任务
// {{hostapp}}/api/huoju/app/submitTaskUserRecord
function submitTaskUserRecord(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/submitTaskUserRecord`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: false
	});
}

// 我的信息
// {{hostapp}}/api/huoju/app/myAccountInfo
function myAccountInfo(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/myAccountInfo`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: false
	});
}

// 修改用信息-一个接口对应4个接口
// {{hostapp}}/api/huoju/app/updateAccountInfo
// 修改头像
// { "updateType":"1","avatar":"0自定义,大于0的就是系统头像","avatarLink":"这是自定义头像地址,默认头像为空"}
// 设置基本信息
// {"updateType":"2", "gender":"1 女 2男","idCard":"身份证","weichat":"微信号","qq":""}
// 修改支付宝信息
// { "updateType":"3","alipayName":"支付宝姓名","alipayAccount":"支付宝账号"}
// 修改银行卡信息
// { "updateType":"4","bankTitle":"银行名称","bankUsername":"姓名","bankAccount":"账号"}

function updateAccountInfo(payload) {
	return ajax.requestApi({
		url: `/api/huoju/app/updateAccountInfo`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: false
	});
}

//帮助中心接口
///api/huoju/app/listHelpInfo
function listHelpInfo(){
	return ajax.requestApi({
		url: `/api/huoju/app/listHelpInfo`,
		method: "post",
		// data: payload,
		showLoading: false,
		showToast: false
	});
}

//帮助中心接口
///api/huoju/app/listHelpInfo
function myWithdrawList(payload){
	return ajax.requestApi({
		url: `/api/huoju/app/myWithdrawList`,
		method: "post",
		data: payload,
		showLoading: false,
		showToast: false
	});
}



module.exports = {
	getLogin,
	getCaptcha,
	appSite,
	myIndexStat,
	appIndexConfig,
	listNoticeInfo,
	sendPhoneCode,
	forgetPassword,
	register,
	vipInfoTab,
	payChannleList,
	appTaskConfig,
	appTaskList,
	recieveTask,
	fileUpload,
	ipPosition,
	userRecordTabList,
	submitTaskUserRecord,
	myAccountInfo,
	listHelpInfo,
	myWithdrawList
}
