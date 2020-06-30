import Vue from 'vue'
import App from './App'
import store from './store'
import api from './utils/api.js'
import i18n from './lang'

// 在main.js注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
Vue.component('mescroll-body', MescrollBody)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api

App.mpType = 'app'

uni.$store = store

//打印环境的变量
console.log(process.env)

const app = new Vue({
	store,
	i18n,
	...App
})
app.$mount()
