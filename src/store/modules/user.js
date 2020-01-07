import Vue from 'vue'
import { login, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import store from '@/store'
import router from '@/router'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
				setTimeout(() => {
					const info = {
						id: '207acd61a3c1bd506d7e9a4535359f8a',
						token: '207acd61a3c1bd506d7e9a4535359f8a',
						realname: '关耳听风',
						username: 'admin',
						createDate: 1576166400000,
						lastLoginTime: 1576166400000,
						roles: {
							id: 1,
							roleDesc: '超级管理员',
							roleName: 'super_admin',
							permissions: [
								{
									'id': 1,
									'permName': '查询订单',
									'permTag': 'showOrder',
									'url': '/showOrder'
								},
								{
									'id': 2,
									'permName': '添加订单',
									'permTag': 'addOrder',
									'url': '/addOrder'
								},
								{
									'id': 3,
									'permName': '修改订单',
									'permTag': 'updateOrder',
									'url': '/updateOrder'
								},
								{
									'id': 4,
									'permName': '删除订单',
									'permTag': 'deleteOrder',
									'url': '/deleteOrder'
								},
								{
									'id': 1,
									'permName': '查询订单',
									'permTag': 'showOrder',
									'url': '/showOrder'
								},
								{
									'id': 2,
									'permName': '添加订单',
									'permTag': 'addOrder',
									'url': '/addOrder'
								}
							]
						}
					}
					const TOKEN = info.token;
					Vue.ls.set(ACCESS_TOKEN, TOKEN, 7 * 24 * 60 * 60 * 1000);
					commit('SET_TOKEN', TOKEN);
					// 存储用户 + 权限信息，用于处理刷新等内容丢失问题
					Vue.ls.set('USER_INFO', info);
					store.dispatch('GetInfo').then(() => {
						resolve()
					}).catch(error => {
						reject(error)
					})
					resolve()
				}, 1000)
      })
    },

    // 重新获取相关用户信息，处理动态权限路由相关信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
				// 进行权限数据处理
				const info = Vue.ls.get('USER_INFO')
				const role = {
					id: info.id,
					permissionList: info.roles.permissions
				};
				role.permissionList.push(info.roles.roleName)
				commit('SET_ROLES', role)
				commit('SET_INFO', info)
				commit('SET_NAME', { name: info.realname })
				commit('SET_AVATAR', './avatar2.jpg')
				store.dispatch('GenerateRoutes', { roles: role }).then(() => {
					// 根据roles权限生成可访问的路由表
					// 动态添加可访问路由表
					router.addRoutes(store.getters.addRouters);
					resolve();
				})
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
          Vue.ls.remove('ACCESS_ROLES')
          Vue.ls.remove('USER_INFO')
        })
      })
    }

  }
}

export default user
