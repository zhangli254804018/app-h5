// 配置全局的请求数据接口封装
import {
	setLocalStorage,
	getLocalStorage
} from './index.js'
import Vue from 'vue'
const requestApi = function({
	url,
	method = "POST",
	data = {},
	showLoading = true,
	showToast = false,
	contentType = "application/json"
}) {
	return new Promise((resolve, reject) => {
		if (showLoading) {
			uni.showLoading({
				title: '加载中',
				mask: true
			})
		}
		let prefix = uni.$store.state.prefix;
		let _url = url.indexOf('http') > -1 ? url : (prefix + url);
		let _data = { 
			...data,
			language: uni.$store.state.language
		}
		uni.request({
			url: _url,
			data: contentType == "application/json" ? JSON.stringify(_data) : _data,
			header: {
				"content-type": contentType, //|| "application/x-www-form-urlencoded" || "application/json"
				"token": uni.$store.state.token || '',
				"language": uni.$store.state.language,
				// "language": uni.$store.state.language || ''
			},
			method: method,
			success: function(res) {
				let data = res.data;
				console.log('响应拦截器的数据返回----->', res , _data);
				const token = data.data && data.data.token || ''
				console.log('token---->',token)
				if (token) {
					uni.$store.dispatch('setToken', token);
				}
				if (showLoading) {
					uni.hideLoading();
				}
				if (data.code == 0) {
					resolve(data.data)
					return
				} else if (data.code == 1002) {
					uni.$store.dispatch('setToken', '');
					uni.reLaunch({
						url: '/pages/login/login'
					})
				} else if (showLoading && data.code !== 0 || showToast) {
					data.msg && uni.showToast({
						title: data.msg,
						icon: "none"
					})
				}
				reject(data)
				return
			},
			fail: function(res) {
				uni.hideLoading()
				uni.showModal({
					title: '提示',
					content: '网络请求失败，请稍后重试！',
					showCancel: false
				})
			},
			complete: function() {}
		})
	})
}


module.exports = {
	requestApi: requestApi
}
