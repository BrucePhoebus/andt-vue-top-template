import { axios } from '@/utils/request'

const api = {
	Login: '/login',
	Logout: '/logout',
	userInfo: '/userInfo',
}

/**
 * 登录注册模块API
 */
export function login (data) {
	return {
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
  return axios({
    url: api.Login,
    method: 'post',
    data
  })
}

export function logout (data) {
  return axios({
    url: api.Logout,
    method: 'post',
    data
  })
}

export function getUserInfo (params) {
  return axios({
    url: api.userInfo,
    method: 'get',
		params
  })
}
