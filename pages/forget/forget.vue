<template>
	<view class="content register-content">
		<view class="register-form">
			<image class="logo" src="../../static/img/login/logo-L.png"></image>
			<view class="form-content">
				 <!-- { "account":"12312312312","passwd":"123456", "countryCode":"国家代号 默认86", "smsCode":"62507"} -->
				 <view class="form-item form-account">
					 <image class="item-icon" src="../../static/img/login/password.png"></image>
					 <input type="text" value="" placeholder="请输入确认密码" v-model.trim="queryForm.countryCode" />
				 </view>
				<view class="form-item form-account">
					<image class="item-icon" src="../../static/img/login/password.png"></image>
					<input type="text" value="" placeholder="请输入手机号" v-model.trim="queryForm.account" />
				</view>
				<view class="form-item form-password">
					<image class="item-icon" src="../../static/img/login/password.png"></image>
					<input type="password" value="" placeholder="请输入密码" v-model.trim="queryForm.passwd" />
				</view>
<!-- 				<view class="form-item form-password-confirm">
					<image class="item-icon" src="../../static/img/login/password.png"></image>
					<input type="text" value="" placeholder="请输入确认密码" v-model.trim="queryForm.countryCode" />
				</view> -->
				<view class="form-item form-captcha">
					<image class="item-icon" src="../../static/img/login/Verification-Code.png"></image>
					<input type="text" value="" placeholder="请输入图形验证码" v-model.trim="queryForm.captcha" />
					<image class="captcha" :src="getCaptcha.img" mode="scaleToFill" @tap="initData"></image>
				</view>
				<view class="form-item form-mobile-code">
					<image class="item-icon" src="../../static/img/login/password.png"></image>
					<input type="text" value="" placeholder="请输入手机验证码" v-model.trim="queryForm.smsCode" />
					<view class="send-btn" @tap="sendCode">
						<view class="send-msg" v-if="btn.time == 60">{{btn.captchaText}}</view>
						<view class="send-down-time" v-else>({{btn.time}})</view>
					</view>
				</view>
			</view>
			<view class="form-submit">
				<view class="submnit-btn" @tap="onSubmit">
					忘记密码
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
					"account": "", //手机号码
					"countryCode": "86", //国家代号 默认86
					"nickname": "", //姓名
					"passwd": "", //密码 md5小写
					"smsCode": "", //62507短信验证码
					// "inviteCode": "26051" //推荐人id
				},
				registerForm: {
					"countryCode": "86", //国家代号 默认86
					"account": "", //手机号
					"captchaToken": "", //图片的token
					"captcha": "", //图片验证码
					"type": "reg"
				},
				getCaptcha: {

				},
				btn: {
					captchaText: '发送',
					loginBtn: false,
					time: 60
				},
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onLoad() {
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
			sendCode() {
				if (this.btn.loginBtn) return
				this.registerForm = {
					...this.registerForm,
					account: this.queryForm.account,
					captchaToken: this.getCaptcha.captchaToken,
					captcha: this.queryForm.captcha
				}
				this.$api.sendPhoneCode(this.registerForm).then(res => {
					console.log('register----->', res)
					this.queryForm.smsCode = res.smsCode || '66551'
					this.downTime()
				}).catch(err => {
					this.initData()
				})
			},
			//提交注册
			async onSubmit() {
				// { "account":"手机号码","countryCode":"国家代号 默认+86", "nickname":"姓名","passwd":"密码 md5小写",  "smsCode":"62507短信验证码",
				//  "inviteCode":"推荐人id"}
				const queryForm = this.queryForm;
				try {
					await this.register()
					uni.redirectTo({
						url: '/pages/login/login'
					})
				} catch (e) {
					//TODO handle the exception
				}
			},
			register() {
				return new Promise((resolve, reject) => {
					const params = {
						...this.queryForm,
						passwd: toMd5LowerCase(this.queryForm.passwd)
					}
					this.$api.forgetPassword(params).then(res => {
						console.log('forgetPassword----->', res)
						resolve(res)
					}).catch(err => {
						this.initData()
						reject(err)
					})
				})
			},
			btnCountDown(s) {
				let sec = s ? parseInt(s) : 60;
				this.btn.captchaBtn = true;
				let timer1 = setInterval(() => {
					if (sec < 1) {
						this.btn.captchaBtn = false;
						this.btn.captchaText = '发送';
						this.btn.time = 60;
						this.btn.loginBtn = false;
						clearInterval(timer1);
						return;
					}
					sec--;
					// this.btn.captchaText = `${sec}s`	
					this.btn.time = sec;
					this.btn.loginBtn = true
				}, 1000);
			},
			//倒计时
			downTime(options = {
				timeStamp: 60
			}) {
				const timeStamp = options.timeStamp
				const nowStamp = new Date().getTime()
				if (parseInt(timeStamp) + 60 * 1000 > nowStamp) {
					this.btnCountDown(
						(parseInt(timeStamp) + 60 * 1000 - nowStamp) / 1000
					);
				} else if (timeStamp) {
					this.btnCountDown()
				}
			},
			toLogin() {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}
		},
	}
</script>

<style>
	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul {
		font-size: 15px;
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul>view {
		line-height: 25px;
	}
</style>


<style lang="scss">
	.register-content {
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

		.register-form {
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
				margin-bottom: 0rpx;

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
				margin: 0 auto 60rpx;
				width: 570rpx;

				.form-item {
					position: relative;
					margin: 0 15rpx 40rpx;
					height: 50rpx;
					padding-left: 70rpx;

					input {
						box-sizing: border-box;
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

				.form-mobile-code {
					display: flex;
					align-items: center;

					.send-btn {
						display: flex;
						font-size: 28rpx;

						.send-down-time {
							color: rgba(150, 138, 100, .91);
						}
					}
				}
			}
		}
	}
</style>
