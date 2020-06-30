<template>
	<view class="content login-content">
		<view class="login-form">
			<image class="logo" src="../../static/img/login/logo-L.png"></image>
			<view class="form-content">
				<view class="form-item form-account">
					<image class="item-icon" src="../../static/img/login/cell-phone-number.png"></image>
					<input type="text" value="" placeholder="请输入账号" v-model.trim="queryForm.account" />
				</view>
				<view class="form-item form-password">
					<image class="item-icon" src="../../static/img/login/password.png"></image>
					<input type="password" value="" placeholder="请输入密码" v-model.trim="queryForm.passwd" />
				</view>
				<view class="form-item form-captcha">
					<image class="item-icon" src="../../static/img/login/Verification-Code.png"></image>
					<input type="text" value="" placeholder="请输入图形验证码" v-model.trim="queryForm.captcha" />
					<image class="captcha" :src="getCaptcha.img" mode="scaleToFill" @tap="initData"></image>
				</view>
			</view>
			<view class="form-submit">
				<view class="submnit-btn" @tap="onSubmit">
					登陆
				</view>
			</view>
			<view class="register-tip">
				<view class="btn-login" @tap="toReg">
					注册账户
				</view>
			</view>
			<view class="version">版本1.0.17</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		toMd5LowerCase
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				queryForm: {
					"account": "13538921724",
					"passwd": "123456", //密码(小写md5)
					"captchaToken": "", //密码(小写md5)
					"captcha": "" //验证码
				},
				getCaptcha: {}
			}
		},
		computed: mapState(['prePath']),
		onLoad() {
			this.$store.dispatch('LOGIN_OUT')
			//初始化获取token和验证码
			this.initData()
		},
		methods: {
			initData() {
				this.$api.getCaptcha().then(res => {
					const {
						captchaToken,
						img
					} = res
					this.getCaptcha = res;
					this.getCaptcha.img = `data:image/png;base64,${img}`;
					this.queryForm.captchaToken = captchaToken;
				})
			},
			errToast(title) {
				return new Promise((resolve, reject) => {
					uni.showToast({
						icon: "none",
						mask: true,
						title: title || '请输入',
					})
					this.errMsg = title || '请输入'
					resolve()
				})
			},
			toReg() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			async onSubmit() {
				let userInfo = {};
				const params = {
					...this.queryForm
				}
				if (!params.account) {
					this.errToast('请输入账号')
					return
				}
				// if (params.captcha !== this.getCaptcha.code) {
				// 	this.errToast('请输入正确的验证码')
				// 	return
				// }
				if (!params.passwd) {
					this.errToast('请输入密码')
					return
				}
				//将密码加密&小写
				params.passwd = toMd5LowerCase(params.passwd)
				this.$api.getLogin(params).then(res => {
					this.$store.dispatch('login', res);
					console.log('prePath------>',this.prePath);
					uni.redirectTo({
						url: this.prePath || '/pages/main/main'
					});
				}).catch(err => {
					this.initData()
				})
			}
		},
	}
</script>

<style lang="scss">
	.login-content {
		background-size: cover;
		background-repeat: no-repeat;
		background-position: top;
		// background-image: url(../../static/img/login/background.png);
		background-color: #eee;

		.version {
			font-size: 22rpx;
			color: rgb(93, 93, 93);
			padding: 50rpx 0;
			text-align: center;
		}

		.logo {
			position: absolute;
			top: -(398 / 1.8 + 40) + rpx;
			left: 50%;
			margin-left: -(398 / 1.8 / 2) + rpx;
			width: (444 / 1.8) + rpx;
			height: (398 / 1.8) + rpx;
		}

		.login-form {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #f6f6f6;
			border-radius: 100rpx 100rpx 0 0;
			padding-top: 60rpx;
			box-shadow: 0 -10rpx 30rpx rgba(#000, .33);

			.register-tip {
				text-align: center;
				font-size: 22rpx;
				color: rgb(93, 93, 93);
				margin-bottom: 200rpx;

				.btn-login {
					display: inline-block;
					text-decoration: underline;
				}
			}

			.form-submit {
				margin: 0 auto 40rpx;
				width: 570rpx;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				font-size: 32rpx;
				color: rgb(93, 93, 93);
				background-size: cover;
				background-repeat: no-repeat;
				background-image: url(../../static/img/login/golden-button.png);
			}

			.form-content {
				margin: 0 auto 150rpx;
				width: 570rpx;

				.form-item {
					position: relative;
					margin: 0 15rpx 40rpx;
					height: 50rpx;
					padding-left: 70rpx;

					input {
						height: 50rpx;
						font-size: 28rpx;
						color: rgba(46, 46, 46, .5);
						border-bottom: 2rpx solid rgba(150, 138, 100, .91);
					}

					.item-icon {
						position: absolute;
						top: 0;
						left: 0;
						width: 50rpx;
						height: 50rpx;
					}
				}

				.form-captcha {
					padding-right: 145rpx;

					.captcha {
						position: absolute;
						top: 0;
						right: 0;
						height: 50rpx;
						width: 143rpx;
					}
				}
			}
		}
	}
</style>
