<template>
	<view class="content">
		<view class="member-content">
			<view class="memeber-banner">
				<image class="img-member" src="../../static/img/vip/1.png" mode="scaleToFill"></image>
			</view>
			<view class="member-head">
				<view class="head-content">
					<view class="head-media">
						<view class="media-title">
							<view class="dt">
								等级:
							</view>
							<view class="dd">
								{{vipInfo.myVipTitle}}
							</view>
						</view>
						<view class="media-title media-task">
							<view class="dt">
								每日任务数:
							</view>
							<view class="dd">
								{{vipInfo.todayNotDoTask}}
							</view>
						</view>
					</view>
					<view class="head-vip" v-if="vipInfo.list && vipInfo.list.length>0">
						<view class="vip-level" v-for="(item,index) in vipInfo.list" :key="index">
							<image class="img-vip" :src="item.icon" mode="scaleToFill"></image>
							<view class="level">
								{{item.title}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="member-list" v-if="vipInfo.list && vipInfo.list.length>0">
				<view class="member-item" :class="item.class" v-for="(item,index) in vipInfo.list" :key="index">
					<view class="item-cover">
						<image class="img-cover" :src="item.img" mode="scaleToFill"></image>
					</view>
					<view class="item-content">
						<view class="item-media">
							<view class="title">
								{{item.title}}
							</view>
							<view class="task">
								每日多领取
								<view class="num">{{item.dayTaskCount}}</view>
								次任务
							</view>
							<view class="btn-level">
								<view class="btn-item" @tap="onVip(item)">
									立即升级
								</view>
							</view>
						</view>
						<view class="item-price">
							<view class="num">{{item.rechargeAmount}}</view>
							<view class="unit">元/年</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<homeBar :tabIndex="1" />
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import homeBar from '@/components/main/home-bar'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				leveIconList: [{
						// title: "普通会员",
						icon: require('../../static/img/vip/qingtong.png'),
						img: require('../../static/img/vip/qingtong2.png'),
						class: 'vip-0',
						vip: 0
					},
					{
						// title: "青铜会员",
						icon: require('../../static/img/vip/qingtong.png'),
						img: require('../../static/img/vip/qingtong2.png'),
						class: 'vip-1',
						vip: 1
					},
					{
						// title: "白银会员",
						icon: require('../../static/img/vip/baiyin.png'),
						img: require('../../static/img/vip/baiyin2.png'),
						class: 'vip-2',
						vip: 2
					},
					{
						// title: "铂金会员",
						icon: require('../../static/img/vip/qingtong.png'),
						img: require('../../static/img/vip/qingtong2.png'),
						class: 'vip-3',
						vip: 3
					},
					{
						// title: "水晶会员",
						icon: require('../../static/img/vip/shuijin.png'),
						img: require('../../static/img/vip/shuijin2.png'),
						class: 'vip-4',
						vip: 4
					},
				],
				//vip
				vipInfo: {
					todayNotDoTask: 0,
					myVip: 0,
					list: [],
					myVipTitle: ""
				},
				// mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {

				},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
					// page: {
					// 	size: 10 // 每页数据的数量,默认10
					// },
					// noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
			}
		},
		computed: mapState(['tabInfo']),
		onLoad() {
			//获取数据
			this.initData()
		},
		components: {
			homeBar
		},
		methods: {
			async downCallback() {
				this.initData()
				setTimeout(() => {
					this.$refs.mescrollRef.mescroll.resetUpScroll();
				}, 300)
			},
			//请求数据
			initData() {
				this.$api.vipInfoTab().then(res => {
					this.$store.dispatch('setTabInfo', res)
					console.log('vipInfoTab------>', res)
					let list = res && res.list
					list = list.map((item, index) => {
						return {
							...item,
							...this.leveIconList[index]
						}
					})
					const vipItem = list.find(item => {
						return item.vip == res.myVip
					})
					this.vipInfo = {
						...res,
						myVipTitle: vipItem && vipItem.title,
						list: list
					}
					console.log('this.vipInfo----->', this.vipInfo)
				})
			},
			//点击升级
			onVip(item) {
				//提交支付参数
				console.log('vip----->', item)
				uni.navigateTo({
					url: `/pages/pay/payChannel?vip=${item.vip}`
				})
			},
		}
	}
</script>

<style lang="scss">
	.mescroll-body-view {
		width: 100%;
		position: relative;
		top: 0;
	}

	.content {
		padding-bottom: 140rpx;
		background-color: #2b2d35;
		position: relative;
	}

	.member-content {
		position: relative;


		.memeber-banner {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 100%;

			.img-member {
				width: 100%;
				height: 938rpx;
			}
		}

		.member-head {
			position: relative;
			margin: auto;
			margin-top: 600rpx;

			.head-content {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 12rpx 5rpx 12rpx 20rpx;

				.head-media {
					width: 220rpx;

					// flex: 1;
					.media-title {
						display: flex;
						align-items: center;
						font-size: 24rpx;
						color: #fff;

						.dd {
							font-size: 24rpx;
						}
					}
				}

				.head-vip {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					// justify-content: flex-end;
					flex: 1;
					// width: 400rpx;

					.vip-level {
						width: 141rpx;
						height: 40rpx;
						position: relative;
						margin: 10rpx 12rpx;

						.img-vip {
							width: 141rpx;
							height: 40rpx;
						}

						.level {
							position: absolute;
							left: 0;
							top: 0;
							right: 0;
							font-size: 24rpx;
							color: #fff;
							text-align: center;
							z-index: 1;
						}
					}
				}
			}
		}

		.member-list {
			.member-item {
				position: relative;
				width: 710rpx;
				height: 211rpx;
				margin: auto;
				padding: 12px;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				margin-top: 14rpx;

				&.vip-4 {
					.item-content {
						.item-media {
							.title {
								color: #FFFFFF;
							}

							.task {
								color: #FFFFFF;
							}
						}

						.item-price {
							.unit {
								color: #FFFFFF;
							}
						}
					}
				}

				.item-cover {
					position: absolute;
					top: 0;
					left: 0;

					.img-cover {
						width: 710rpx;
						height: 211rpx;
					}
				}

				.item-content {
					flex: 1;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.item-media {
						font-size: 28rpx;
						color: #fff;
						flex: 1;

						.title {
							font-size: 38rpx;
							color: rgb(95, 95, 95);
						}

						.task {
							display: flex;
							align-items: center;
							color: rgb(95, 95, 95);
							font-size: 28rpx;
							margin-bottom: 8rpx;
						}

						.btn-level {
							.btn-item {
								display: inline-block;
								padding: 5rpx 24rpx;
								background-color: #fff;
								color: rgb(95, 95, 95);
								border-radius: 30rpx;
								font-size: 24rpx;
							}
						}
					}

					.item-price {
						display: flex;
						align-items: center;

						.num {
							font-size: 80rpx;
							color: #fff;
							text-shadow: 3rpx 3rpx 3rpx #eee;
							margin-right: 12rpx;
						}

						.unit {
							color: rgb(95, 95, 95);
						}
					}
				}


			}
		}
	}
</style>
