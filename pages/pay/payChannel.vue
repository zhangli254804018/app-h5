<template>
	<view class="content">
		<view class="pay-channel-content">
			<view class="pay-channel-head">
				<view class="title">
					请选择付款渠道
				</view>
			</view>
			<view class="pay-channel-list">
				<view class="list-item" @tap="onPayonline(item)" v-if="payChannleInfo.online && payChannleInfo.online.length > 0"
				 v-for="(item,index) in payChannleInfo.online" :key="item.bankTitle">
					<view class="item-content">
						<view class="item-media">
							<image class="img-pay" src="../../static/img/pay/3.png" mode="scaleToFill" v-if="item.id == 2"></image>
							<image class="img-pay" src="../../static/img/task/7.png" mode="scaleToFill" v-else></image>
							<view class="item-desc">
								{{item.channelTitle}}
							</view>
						</view>
						<view class="item-enter">
							<image class="img-back" src="../../static/img/pay/2.png" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<view class="list-item" @tap="onPay(item)" v-if="payChannleInfo.bankInfo && payChannleInfo.bankInfo.length > 0"
				 v-for="(item,index) in payChannleInfo.bankInfo" :key="index">
					<view class="item-content">
						<view class="item-media">
							<image class="img-pay" src="../../static/img/pay/4.png" mode="scaleToFill"></image>
							<view class="item-desc">
								{{item.bankTitle}}
							</view>
						</view>
						<view class="item-enter">
							<image class="img-back" src="../../static/img/pay/2.png" mode="scaleToFill"></image>
						</view>
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
				vip: '',
				payChannleInfo: {
					online: [],
					bankInfo: []
				}
			}
		},
		computed: mapState(['userName']),
		onLoad(options) {
			this.vip = options.vip
			this.initData()
		},
		methods: {
			//获取初始化数据
			initData() {
				this.$api.payChannleList({
					vip: this.vip
				}).then(res => {
					console.log('payChannleInfo----->', res)
					this.payChannleInfo = {
						...this.payChannleInfo,
						...res
					}
				})
			},
			onPayonline(item) {
				console.log('onPayonline----->', item)
			},
			//加载支付方法
			onPay(item) {
				console.log('onPay----->', item)
				this.$store.dispatch('setPayInfo', item)
				uni.navigateTo({
					url: `/pages/recharge/recharge`
				})
			},
		}
	}
</script>

<style lang="scss">
	.pay-channel-content {
		.pay-channel-head {
			margin: 20rpx;
			padding: 12rpx 40rpx;
			background-color: #bfbfbf;
			border-radius: 60rpx;

			.title {
				font-size: 28rpx;
			}
		}

		.pay-channel-list {
			.list-item {
				padding: 20rpx 20rpx 20rpx 30rpx;
				margin: 20rpx;
				background-color: #fff;
				border-radius: 12rpx;
				box-shadow: 3rpx 3rpx 3rpx 3rpx #eee;

				.item-content {
					display: flex;
					align-items: center;

					.item-media {
						display: flex;
						align-items: center;
						flex: 1;

						.img-pay {
							width: 60rpx;
							height: 60rpx;
						}

						.item-desc {
							margin-left: 20rpx;
							font-size: 28rpx;
						}
					}

					.img-back {
						width: 15rpx;
						height: 27rpx;
					}
				}
			}
		}
	}
</style>
