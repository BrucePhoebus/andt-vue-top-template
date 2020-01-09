import Vue from 'vue'
import axios from 'axios'
import QS from 'qs'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
})

// 添加post请求默认请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
		switch (error.response.status) {
			case 403:
				notification.error({
					message: '提示',
					description: '拒绝访问！'
				})
				break;
			case 401:
				if (!(data.result && data.result.isLogin)) {
					notification.error({
						message: '提示',
						description: '未授权访问！'
					})
					if (token) {
						store.dispatch('Logout').then(() => {
							setTimeout(() => {
								window.location.reload()
							}, 1500)
						})
					}
				}
				break;
			case 408:
				notification.error({
					message: '提示',
					description: '请求超时！'
				})
				break;
			case 500:
				notification.error({
					message: '提示',
					description: '服务异常，请稍后重试！'
				})
				break;
			default:
				notification.error({
					message: '提示',
					description: error.response.status + data.message,
					style: {
						maxHeight: '300px',
					},
				})
				break;
		}
  }
  return Promise.reject(error)
}

// 请求拦截
service.interceptors.request.use(config => {
  if (config.url.indexOf('fileUpload') !== -1) {
  	config.timeout = 3600000;
	} else if (config.method === 'get' || config.url.indexOf('login') === 1) {
  	config.data = QS.stringify(config.data)
  } else {
		config.data = { data: config.data }
	}
  return config
}, err)

// 响应处理
service.interceptors.response.use((response) => {
  if (parseInt(response.data.code) === 200) {
    // code == 200表示后端处理成功
    return response.data;
  } else if (parseInt(response.data.code) === 2009) {
    // code == 2009表示未登录
		if (Vue.ls.get(ACCESS_TOKEN)) {
			store.dispatch('Logout').then(() => {
				window.location.reload()
			})
		}
	} else {
    // 出现异常
    notification.error({
      message: 'code：' + response.data.code,
      description: response.data.message,
      duration: 5
    })
  }
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
