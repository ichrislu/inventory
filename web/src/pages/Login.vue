<template>
	<section>
		<el-card>
			<el-row class="title"><h1>欢迎,请登录</h1></el-row>
			<el-row class="login">
				<el-form ref="loginForm" :model="loginFrom" label-width="80px" :rules="loginRules">
					<el-form-item label="账号" prop="Username">
						<el-input v-model="loginFrom.Username" prefix-icon="el-icon-user" placeholder="任意账号密码即可"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="Password">
						<el-input v-model="loginFrom.Password" prefix-icon="el-icon-lock"></el-input>
					</el-form-item>
				</el-form>
			</el-row>
			<el-row class="btns">
				<el-button @click="login" v-loading="loading">登录</el-button>
				<el-button @click="restLoginForm('loginForm')">重置</el-button>
			</el-row>
		</el-card>
	</section>
</template>

<script>
import { loginApi } from '../api/loginApi'
export default {
	data() {
		return {
			loading: false,
			loginFrom: {
				Username: '',
				Password: ''
			},
			loginRules: {
				Username: [
					{ required: true, message: '请输入账号', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				Password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		login() {
			this.loading = true

			let params = Object.assign({}, this.loginFrom)
			let token = ''
			loginApi(params)
				.then(res => {
					this.loading = false

					window.sessionStorage.setItem('asscenToken', JSON.stringify(res.data))
					this.$router.push('/category')
				})
				.catch(req => {
					// console.log(req);
					this.loading = false
				})

			// loginApi(params).then( res => {
			// 	console.log(res);

			// }).catch( req => {
			// 	console.log(req);

			// })
		},
		restLoginForm(formName) {
			if (this.$refs[formName] !== undefined) {
				this.$refs[formName].resetFields()
			}
			window.sessionStorage.clear()
		}
	}
	// created() {
	// 	this.login()
	// }
}
</script>

<style scoped>
section {
	position: relative;
	width: 100%;
	height: 900px;
}

.el-card {
	position: absolute;
	background-color: #e3eaf9;
	width: 600px;
	height: 400px;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

.title {
	text-align: center;
	margin-top: 50px;
}

.login {
	position: absolute;
	top: 40%;
	left: 20%;
}

.btns {
	position: absolute;
	bottom: 10%;
	right: 28%;
}

.el-button {
	margin: 0 15px;
}
</style>
