<template>
	<div class="main">
		<a-form
				id="formLogin"
				class="user-layout-login"
				ref="formLogin"
				:form="form"
				@submit="loginSubmit">
			<a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="账户或密码错误" />
			<a-form-item>
				<a-input
						allowClear
						size="large"
						type="text"
						v-decorator="['username', formRules.username]"
						placeholder="请输入账号"
				>
					<a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
				</a-input>
			</a-form-item>

			<a-form-item>
				<a-input
						allowClear
						size="large"
						type="password"
						placeholder="请输入密码"
						v-decorator="['password', formRules.password]"
				>
					<a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
				</a-input>
			</a-form-item>

			<a-form-item style="margin-top:24px">
				<a-button
						size="large"
						type="primary"
						htmlType="submit"
						class="login-button"
						:loading="state.loginBtn"
						:disabled="state.loginBtn"
				>确定</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script>
	import md5 from 'md5'
	import { mapActions } from 'vuex'
	import { timeFix } from '@/utils/util'

	export default {
		data () {
			return {
				loginBtn: false,
				isLoginError: false,
				form: this.$form.createForm(this, { name: 'formLogin' }),
				formRules: {
					username: { rules: [{ required: true, message: '登录账号不能为空!' }], validateTrigger: 'blur' },
					password: { rules: [{ required: true, message: '登录密码不能为空!' }], validateTrigger: 'blur' },
				},
				state: {
					loginBtn: false,
				}
			}
		},
		methods: {
			...mapActions(['Login', 'Logout']),
			loginSubmit (e) {
				e.preventDefault()
				const { form: { validateFields }, state, Login } = this

				state.loginBtn = true
				validateFields((err, values) => {
					if (!err) {
						const params = { ...values }
						console.log(params)
						Login(params)
						.then((res) => this.loginSuccess(res))
						.catch(err => this.requestFailed(err))
						.finally(() => {
							state.loginBtn = false
						})
					} else {
						setTimeout(() => {
							state.loginBtn = false
						}, 100);
					}
				})

			},
			loginSuccess (res) {
				this.$router.push({ path: '/' })
				// 延迟 1 秒显示欢迎信息
				setTimeout(() => {
					this.$notification.success({
						message: '欢迎',
						description: `${timeFix()}，欢迎回来`
					})
				}, 1000)
				this.isLoginError = false
			},
			requestFailed (err) {
				this.isLoginError = true
				this.$notification['error']({
					message: '错误',
					description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
					duration: 4
				})
			}
		}
	}
</script>

<style lang="less" type="text/less" scoped>
	.user-layout-login {
		label {
			font-size: 14px;
		}

		button.login-button {
			padding: 0 15px;
			font-size: 16px;
			height: 40px;
			width: 100%;
		}
	}
</style>
