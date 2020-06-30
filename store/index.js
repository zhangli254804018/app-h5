import Vue from 'vue'
import Vuex from 'vuex'
import {
	setLocalStorage,
	getLocalStorage
} from '../utils/index.js'
import Cookies from 'js-cookie'
import {
	getLanguage
} from '@/lang/index'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		prePath: '',
		token: getLocalStorage('token'),
		userInfo: {},
		prefix: "http://app.huoju12.com",
		language: getLanguage(),
		payInfo: getLocalStorage('payInfo'),
		accountInfo: getLocalStorage('accountInfo') || {
			info: {},
			parent: {},
			extInfo: {}
		},
		vipInfoTab:{},
		tabInfo:{}
	},
	getters: {
		language: state => state.language
	},
	mutations: {
		LOGIN_OUT(state) {
			state.userName = "";
			state.hasLogin = false;
			state.userInfo = {}
			setLocalStorage('token', '');
		},
		SET_TOKEN(state, token) {
			state.token = token;
			setLocalStorage('token', token);
		},
		LOGIN(state, userInfo) {
			state.userInfo = {
				...state.userInfo,
				...userInfo
			}
			state.hasLogin = userInfo ? true : false
		},
		SET_PRE_PATH(state, path) {
			state.prePath = path
		},
		SET_PREFIX(state, prefix) {
			state.prefix = prefix || state.prefix;
		},
		SET_LANGUAGE(state, language) {
			state.language = language
			// Cookies.set('language', language)
			setLocalStorage('language', language)
		},
		SET_PAY_INFO(state, payInfo) {
			state.payInfo = payInfo
			setLocalStorage('payInfo', payInfo)
		},
		SET_ACCOUNT_INFO(state, accountInfo) {
			state.accountInfo = accountInfo
			setLocalStorage('accountInfo', accountInfo)
		},
		SET_TAB_INFO(state, tabInfo) {
			state.tabInfo = tabInfo
			setLocalStorage('tabInfo', tabInfo)
		}
	},
	actions: {
		//设置登录信息
		login({
			commit,
			state
		}, params) {
			commit('LOGIN', params)
		},
		//设置当前需要返回的路径路由
		setPrePath({
			commit,
			state
		}, params) {
			commit('SET_PRE_PATH', params)
		},
		//设置站点ip
		setPrefix({
			commit,
			state
		}, params) {
			commit('SET_PREFIX', params)
		},
		//设置当前登录后的token
		setToken({
			commit,
			state
		}, params) {
			console.log('setToken------>', params)
			commit('SET_TOKEN', params)
		},
		setLanguage({
			commit
		}, language) {
			commit('SET_LANGUAGE', language)
		},
		setPayInfo({
			commit
		}, params) {
			commit('SET_PAY_INFO', params)
		},
		setAccountInfo({
			commit
		}, params) {
			commit('SET_ACCOUNT_INFO', params)
		},
		setTabInfo({
			commit
		}, params) {
			commit('SET_TAB_INFO', params)
		},
	}
})

export default store
