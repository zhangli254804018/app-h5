<template>
	<view class="content">
		<view class="recharge-container">
			<view class="recharge-contnet">
				<view class="recharge-form">					
					<view class="form-item">
						<view class="form-dt">
							收款账号
						</view>
						<view class="form-dd">
							<input type="text" disabled value="" placeholder="请输入账号" v-model.trim="rechargeForm.bankAccount"/>
						</view>
					</view>
					<view class="form-item">
						<view class="form-dt">
							收款人
						</view>
						<view class="form-dd">
							<input type="text" disabled value="" placeholder="请输入收款人" v-model.trim="rechargeForm.bankUsername"/>
						</view>
					</view>
					<view class="form-item">
						<view class="form-dt">
							存入金额
						</view>
						<view class="form-dd">
							<input type="text" value="" placeholder="请输入账号" v-model.trim="rechargeForm.amount"/>
						</view>
					</view>
					<view class="form-item">
						<view class="form-dt">
							汇款人姓名
						</view>
						<view class="form-dd">
							<input type="text" value="" placeholder="请输入汇款人姓名" v-model.trim="rechargeForm.name"/>
						</view>
					</view>
				</view>
				<view class="recharge-question">
					<view class="title">
						如有问题
					</view>
					<view class="wechat">
						请联系客服
					</view>
				</view>
				<view class="recharge-submit">
					<view class="submit-btn">
						提交
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				rechargeForm: {
					bankAccount:'',
					bankUsername:'',
					amount:'',
					name:''
				},			
			}
		},
		computed: mapState(['payInfo']),
		onLoad() {
			console.log('获取充值--->', this.payInfo)
			this.rechargeForm = {
				...this.rechargeForm,
				...this.payInfo
			}
		},
		methods: {
			//充值
			onRecharge() {

			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #fff;
	}

	.recharge-container {
		.recharge-contnet {
			.recharge-question{
				margin: 30rpx 20rpx 20rpx;
				text-align: center;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				text-align: center;
				justify-content: center;
				.wechat{
					margin-left: 12rpx;
					color: #089cd3;
					text-decoration: underline;
				}
			}
			.recharge-form {
				.form-item {
					display: flex;
					align-items: center;
					margin: 20rpx;
					font-size: 28rpx;
					padding: 20rpx;
					border-bottom: 1rpx solid #eee;
					.form-dt {
						width: 200rpx;
					}

					.form-dd {
						flex: 1;
					}
				}
			}
			.recharge-submit{
				margin-top: 30rpx;
				.submit-btn{
					width: 570rpx;
					height: 90rpx;
					margin: auto;
					font-size: 32rpx;
					line-height: 80rpx;
					background-image: url(../../static/img/login/golden-button.png);
					background-size: 100% 100%;
					text-align: center;
					color: #fff;
				}
			}
		}
	}
</style>
