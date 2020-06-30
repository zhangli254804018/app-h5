
export function setLocalStorage(name, value) {
	const data = {}
	if (typeof value == 'object') {
		data.type = 'object'
	} else if (typeof value == 'string') {
		data.type = 'string'
	} else if (typeof value == 'number') {
		data.type = 'number'
	}
	data.data = value
	try {
		uni.setStorageSync(name, data)
	} catch (err) {
	}
}
export function getLocalStorage(name) {
	let res = ''
	try {
		res = uni.getStorageSync(name)
	} catch (err) {
	}
	if (res) {
		// res = JSON.parse(res)
		return res.data
	}
	return null
}
export function timeChange(time) {
	const date = new Date(that.groupBuying.startTime)
	let year = date.getFullYear()
	let month =
		date.getMonth() + 1 > 9 ?
		date.getMonth() + 1 :
		'0' + (date.getMonth() + 1)
	let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()

	let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
	let minite =
		date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
	let second =
		date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
	return {
		year,
		month,
		day,
		hour,
		minite,
		second
	}
}

export function getUrlQuery(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	var r = decodeURIComponent(window.location.search.substr(1)).match(reg)
	if (r != null) return unescape(r[2])
	return null
}

export function checkMobile(phone) {
	// var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
	var myreg = /^(1[0-9]{10})$/
	return myreg.test(phone)
}
export function checkPhone(phone) {
	// var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
	// var myreg = /^\d{7}$|^\d{8}$/
	var myreg = /^0\d{10}$/
	return myreg.test(phone)
}
export function checkPhoneHK(phone) {
	// 00852
	// var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
	var myreg = /^(2|3|5|6|7|8|9)\d{7}$/
	return myreg.test(phone)
}
export function checkPhoneMC(phone) {
	// 00853
	// var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
	var myreg = /^6\d{7}$/
	return myreg.test(phone)
}
export function checkPhoneTW(phone) {
	// 00886
	// var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
	var myreg = /^9\d{8}$/
	return myreg.test(phone)
}

export function checkID(id, type) { //身份证校验
	var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/;
	if (type == 15) {
		reg =
			/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
	}
	if (reg.test(String(id).toLocaleUpperCase()) === false) {
		return false
	}
	return true
}

export function delUrlParams(ref) {
	const url = window.location.href
	// 如果不包括此参数
	if (url.indexOf(ref) == -1) return url
	var arr_url = url.split('?')
	var base = ''
	var arr_param = []

	if (arr_url.length === 3) {
		base = arr_url[0] + '?' + arr_url[1]
		arr_param = arr_url[2].split('&')
	} else {
		base = arr_url[0]
		arr_param = arr_url[1].split('&')
	}

	var index = -1
	for (let i = 0; i < arr_param.length; i++) {
		var paired = arr_param[i].split('=')
		if (paired[0] == ref) {
			index = i
			break
		}
	}
	if (index == -1) {
		return url
	} else {
		arr_param.splice(index, 1)
		return base + '?' + arr_param.join('&')
	}
}

export function checkUrlParams(ref) {
	const url = window.location.href
	// 如果不包括此参数
	if (url.indexOf(ref) == -1) {
		return false
	}
	var arr_param = url.substring(url.indexOf(ref), url.indexOf('#'))
	var paired = arr_param.split('=')
	if (paired[1]) {
		return paired[1]
	} else {
		return false
	}
}

//新增新增分数过滤为元展示
export const formatNumber = (n, r) => {
	if (n) {
		if (r) n = Number(n) * Number(r)
		return (n / 100).toString().indexOf('.') > -1 ?
			parseFloat(n / 100).toFixed(2) :
			parseFloat(n / 100)
	} else {
		return n
	}
}

export function isWeixn() {
	var ua =
		navigator.userAgent.toLowerCase() ||
		window.navigator.userAgent.toLowerCase()
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true
	} else {
		return false
	}
}

/* 
	@param num 为数字
	ex. return 100,00,00等
*/
export function formatCurrency(num) {
	if (num) {
		//将num中的$,去掉，将num变成一个纯粹的数据格式字符串
		num = num.toString().replace(/\$|\,/g, '')
		//如果num不是数字，则将num置0，并返回
		if ('' == num || isNaN(num)) {
			return 'Not a Number ! '
		}
		//如果num是负数，则获取她的符号
		var sign = num.indexOf('-') > 0 ? '-' : ''
		//如果存在小数点，则获取数字的小数部分
		var cents = num.indexOf('.') > 0 ? num.substr(num.indexOf('.')) : ''
		cents = cents.length > 1 ? cents : '' //注意：这里如果是使用change方法不断的调用，小数是输入不了的
		//获取数字的整数数部分
		num = num.indexOf('.') > 0 ? num.substring(0, num.indexOf('.')) : num
		//如果没有小数点，整数部分不能以0开头
		if ('' == cents) {
			if (num.length > 1 && '0' == num.substr(0, 1)) {
				return 'Not a Number ! '
			}
		}
		//如果有小数点，且整数的部分的长度大于1，则整数部分不能以0开头
		else {
			if (num.length > 1 && '0' == num.substr(0, 1)) {
				return 'Not a Number ! '
			}
		}
		//针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
		/*
		  也可以这样想象，现在有一串数字字符串在你面前，如果让你给他家千分位的逗号的话，你是怎么来思考和操作的?
		  字符串长度为0/1/2/3时都不用添加
		  字符串长度大于3的时候，从右往左数，有三位字符就加一个逗号，然后继续往前数，直到不到往前数少于三位字符为止
		 */
		for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
			num =
				num.substring(0, num.length - (4 * i + 3)) +
				',' +
				num.substring(num.length - (4 * i + 3))
		}
		//将数据（符号、整数部分、小数部分）整体组合返回
		return sign + num + cents
	} else {
		return num
	}
}

//獲取地址欄的參數
export const parseUrlQuery = function(url, type) {
	url = url || location.href

	var query = {},
		i,
		params,
		param
	var href = url.indexOf('?') > -1 ? url.split('?')[0] : url
	if (typeof url === 'string' && url.length) {
		url = url.indexOf('#') > -1 ? url.split('#')[0] : url
		if (!type) {
			if (url.indexOf('?') > -1) url = url.split('?')[1]
			else return query
		}
		params = url.split('&')
		for (i = 0; i < params.length; i++) {
			param = params[i].split('=')
			query[param[0]] = param[1]
		}
	}
	return {
		url: url,
		query: query,
		params: params,
		href: href
	}
}

//转化为长连接
export const objectUrl = str => {
	var url = ''
	if (typeof str == 'object') {
		Object.keys(str).forEach((key, index, array) => {
			url += key + '=' + str[key] + (index < array.length - 1 ? '&' : '')
		})
		return url
	}
}


//获取字符串长度 包括中英文等
export const getStrLength = function(str) {
	///<summary>获得字符串实际长度，中文2，英文1</summary>
	///<param name="str">要获得长度的字符串</param>
	var realLength = 0,
		len = str.length,
		charCode = -1
	for (var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i)
		if (charCode >= 0 && charCode <= 128) realLength += 1
		else realLength += 2
	}
	return realLength
}

/*
    延迟方法 ——
        参数 ——
            idle: 延迟时间
            action: callback 回调函数
        返回 ——
            执行action函数

    使用方式 —— 
        delayBounceAction(300,callback)
*/
let delayBounceContainer
export const delayBounceAction = function(idle, action) {
	function delayBounces() {
		let ctx = this,
			args = arguments
		clearTimeout(delayBounceContainer)
		delayBounceContainer = setTimeout(function() {
			action.apply(ctx, args)
		}, idle)
	}
	return delayBounces()
}

// 经纪人姓名正则校验
export const checkBrokerName = function(str) {
	let reg = /^[\u4E00-\u9FA5A-Za-z]*(·[\u4E00-\u9FA5A-Za-z]*)*$/,
		errMsg = ''
	str = str.replace(/\s*/g, '')
	if (strlen(str) < 4) {
		errMsg = '姓名长度过短，请检查是否输入正确'
	} else if (!reg.test(str)) {
		errMsg = '姓名不可包含特殊字符/数字'
	} else {
		errMsg = ''
	}
	return errMsg
}

//判断字符长度，中文2个字符，英文占一个字符
export const strlen = function(str) {
	var len = 0
	for (var i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i)
		if (str[i] == '·') {
			len++
		} else if (
			(c >= 0x0001 && c <= 0x007e) ||
			(0xff60 <= c && c <= 0xff9f)
		) {
			//单字节加1
			len++
		} else {
			//中文字符加2
			len += 2
		}
	}
	return len
}

/*
    格式化时间,时间戳转化为时间格式 ——
        参数 ——
            value： 时间戳10位
            type:   为需要的时间格式 'yyyy-MM-dd hh:mm:ss'
        返回 ——
            格式化后的字符串

    使用方式 —— 
        {{data | format_time type}}
*/
export const format_time = (value, type) => {
	if (!value) return null
	let time
	if (value.constructor === Date) {
		time = value
	} else {
		time =
			value.toString().length > 10 ?
			new Date(parseInt(value)) :
			new Date(parseInt(value) * 1000)
	}
	let formatTime = type ? type : 'yyyy-MM-dd hh:mm:ss'
	let date = {
		'M+': time.getMonth() + 1,
		'd+': time.getDate(),
		'h+': time.getHours(),
		'm+': time.getMinutes(),
		's+': time.getSeconds(),
		'q+': Math.floor((time.getMonth() + 3) / 3),
		'S+': time.getMilliseconds()
	}
	if (/(y+)/i.test(formatTime)) {
		formatTime = formatTime.replace(
			RegExp.$1,
			(time.getFullYear() + '').substr(4 - RegExp.$1.length)
		)
	}
	for (let k in date) {
		if (new RegExp('(' + k + ')').test(formatTime)) {
			formatTime = formatTime.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ?
				date[k] :
				('00' + date[k]).substr(('' + date[k]).length)
			)
		}
	}
	return formatTime
}

import md5 from '@/js_sdk/ccdzhang-dokey/md5.js';
//将密码小写并且转md5
export const toMd5LowerCase = (val) => {
	if (val) {
		return md5(val).toLocaleLowerCase()
	} else {
		return val
	}
}

// /*获取当前路由*/
// let curPage = getCurPage();
// //在微信小程序或是app中，通过curPage.options；如果是H5，则需要curPage.$route.query（H5中的curPage.options为undefined，所以刚好就不需要条件编译了）
// let curParam = curPage.options || curPage.$route.query;
// //获取地址栏参数
// export function getCurPage(){
//     let pages = getCurrentPages();
//     let curPage = pages[pages.length-1];
//     return curPage
// }