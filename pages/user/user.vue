<template>
	<view class="content">
		<view class="user-container">
			<view class="user-head">
				<view class="head-banner">
					<view class="head-cover">
						<image class="img-head-cover" src="../../static/img/mine/Line-head.png" mode="scaleToFill"></image>
					</view>
					<view class="head-avator">
						<image class="img-head-avator" :src="accountInfo.info.avatarLink" mode="scaleToFill" v-if="accountInfo.info.avatarLink"></image>
						<image class="img-head-avator" :src="defaultHeaderImg" mode="scaleToFill" v-else></image>
						<view class="avator-vip">
							<image class="img-vip" src="../../static/img/mine/vip.png" mode="scaleToFill"></image>
							<view class="level">{{accountInfo.info.myVipTitle}}</view>
						</view>
					</view>
					<view class="head-info">
						<view class="nickname">{{accountInfo.info.nickname}}</view>
						<view class="level">直属上级：{{accountInfo.parent.phone}}</view>
						<view class="invitecode">邀请码:{{accountInfo.info.userId}}</view>
					</view>
					<view class="head-mode">
						<view class="mode-item mode-wechat">
							<image class="img-item img-wechat" src="../../static/img/mine/head1.png" mode="scaleToFill"></image>
						</view>
						<view class="mode-item mode-setup" @tap="onprofile">
							<image class="img-item img-setup" src="../../static/img/mine/head2.png" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<view class="head-content">
					<view class="head-process">
						<view class="process-desc">
							<view class="process-dot dot-item dot-1">
								封号
							</view>
							<view class="process-dot dot-item dot-2">
								限制
							</view>
							<view class="process-dot dot-item dot-3">
								良好
							</view>
							<view class="process-dot dot-item dot-4">
								优秀
							</view>
						</view>
						<view class="process-level">
							<image class="img-process" src="../../static/img/mine/hole-green.png" mode="scaleToFill"></image>
							<image class="img-process-bg" src="../../static/img/mine/hole.png" mode="scaleToFill"></image>
						</view>
					</view>
					<view class="head-amount">
						<image class="img-amount" src="../../static/img/mine/wallet.png" mode="scaleToFill"></image>
						<view class="amount-content">
							<view class="title">
								金币余额
							</view>
							<view class="num">
								{{accountInfo.info.score}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="user-middle">
				<view class="invite-btn">
					<view class="item-btn" @tap="onInvite">
						<image class="img-label" src="../../static/img/mine/invite-l.png" mode="scaleToFill"></image>
						<view class="btn-label">
							<view class="title">
								邀请好友
							</view>
							<view class="sub-title">
								有钱躺着赚
							</view>
						</view>
					</view>
					<view class="item-btn" @tap="onTeam">
						<image class="img-label" src="../../static/img/mine/team-l.png" mode="scaleToFill"></image>
						<view class="btn-label">
							<view class="title">
								我的团队
							</view>
							<view class="sub-title">
								有钱一起赚
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="user-bottom">
				<view class="user-ability">
					<view class="ability-list">
						<view class="item-ability" v-for="(item,index) in tabList" :key="index" @tap="onTab(item)">
							<view class="item-content">
								<view class="item-media">
									<image class="img-abilty" :src="item.img" mode="scaleToFill"></image>
								</view>
								<view class="item-title">
									{{item.title}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<homeBar :tabIndex="4" />
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import homeBar from '@/components/main/home-bar'
	export default {
		data() {
			return {
				tabList: [{
						img: require('../../static/img/mine/personal.png'),
						title: '个人信息',
						path: '/pages/profile/profile',
					},
					{
						img: require('../../static/img/mine/account number.png'),
						title: '账号绑定',
						path: '/pages/bind_account/bind_account',
					},
					{
						img: require('../../static/img/mine/rijie.png'),
						title: '日报报表',
						path: '/pages/day_report/day_report',
					},
					{
						img: require('../../static/img/mine/shouyi.png'),
						title: '收益记录',
						path: '/pages/income/income',
					},
					{
						img: require('../../static/img/mine/yaoqinghaoyou.png'),
						title: '邀请好友',
						path: '/pages/invite/invite',
					},
					{
						img: require('../../static/img/mine/chongzhi.png'),
						title: '充值记录',
						path: '/pages/recharge/record',
					},
					{
						img: require('../../static/img/mine/tixian.png'),
						title: '提现记录',
						path: '/pages/withdraw/record',
					},
					{
						img: require('../../static/img/mine/tuandui.png'),
						title: '团队报表',
						path: '/pages/level_distribution/level_distribution',
					},
					{
						img: require('../../static/img/mine/bangzhushouce.png'),
						title: '帮助手册',
						path: '/pages/help/help',
					},
					// {
					// 	img: require('../../static/img/mine/faburenwu.png'),
					// 	title: '发布任务',
					// 	path: '/pages/publish/publish',
					// },
					{
						img: require('../../static/img/mine/xinyong.png'),
						title: '我的信用',
						path: '/pages/credit/credit',
					},
					{
						img: require('../../static/img/mine/tuichu.png'),
						title: '退出登录',
						path: '/pages/login/login',
					},
				],
				defaultHeaderImg: require("../../static/img/main/13.png"), //默认图地址
			}
		},
		computed: mapState(['accountInfo', 'tabInfo']),
		onLoad() {
			this.initData()
			// uni.setNavigationBarTitle({
			// 	title: 'my'
			// });
		},
		components: {
			homeBar
		},
		methods: {
			onprofile() {
				uni.navigateTo({
					url: '/pages/profile_detail/profile_detail'
				})
			},
			onInvite() {
				uni.navigateTo({
					url: '/pages/invite/invite'
				})
			},
			onTeam() {
				uni.navigateTo({
					url: '/pages/level_distribution/level_distribution'
				})
			},
			onTab(item) {
				if (item.path == '/pages/login/login') {
					uni.reLaunch({
						url: item.path
					})
				} else {
					uni.navigateTo({
						url: item.path
					})
				}
			},
			vipInfoTab() {
				return new Promise((resolve, reject) => {
					this.$api.vipInfoTab().then(res => {
						this.$store.dispatch('setTabInfo', res)
						resolve(res)
					}).catch(err => {
						reject(err)
					})
				})

			},
			async initData() {
				await this.vipInfoTab().catch(err => {});
				this.$api.myAccountInfo().then(res => {
					console.log('myAccountInfo---->', res)
					let accountInfo = res;
					try {
						let accountItem = this.tabInfo.list.find(item => {
							return item.vip == accountInfo.info.vip
						}) || {}
						accountInfo.info.myVipTitle = accountItem.title
					} catch (e) {
						//TODO handle the exception
					}
					// this.myAccountInfo = res
					this.$store.dispatch('setAccountInfo', accountInfo)
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: 120rpx;
	}

	.user-container {
		.user-head {
			.head-banner {
				position: relative;
				height: 380rpx;

				.head-mode {
					position: absolute;
					top: 30rpx;
					left: 0rpx;
					display: flex;
					flex-direction: column;

					.mode-item {
						font-size: 24rpx;
						color: #333;
						margin-bottom: 0rpx;
						padding: 5rpx 12rpx;

						.img-item {
							width: 40rpx;
							height: 40rpx;
						}
					}
				}

				.head-cover {
					position: absolute;
					top: 0;
					left: 0;

					.img-head-cover {
						width: 750rpx;
						height: 400rpx;
					}
				}

				.head-avator {
					position: relative;
					width: 486rpx*.4;
					height: 156rpx;
					margin: auto;
					padding-top: 40rpx;
					text-align: center;

					.img-head-avator {
						width: 156rpx;
						height: 156rpx;
						border-radius: 50%;
						margin: auto;
					}

					.avator-vip {
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						width: 486rpx*.4;
						height: 113rpx*.4;
						margin: auto;

						.img-vip {
							width: 486rpx*.4;
							height: 113rpx*.4;
							display: block;
						}

						.level {
							position: absolute;
							top: 0;
							left: 0;
							font-size: 22rpx;
							color: #fff;
							left: 0;
							right: 0;
							margin: auto;
							text-align: center;
							line-height: 30rpx;
						}
					}
				}

				.head-info {
					position: relative;
					text-align: center;
					padding: 20rpx 20rpx;

					.nickname {
						font-size: 32rpx;
						color: rgba(198, 172, 128, 1);
					}

					.level {
						font-size: 24rpx;
						color: rgba(77, 77, 77, .6);
					}

					.invitecode {
						font-size: 24rpx;
						color: rgba(77, 77, 77, .6);
					}
				}
			}

			.head-content {
				.head-process {
					position: relative;

					.process-desc {
						display: flex;
						position: absolute;
						top: -40rpx;
						left: 0;
						width: 100%;
						z-index: 2;

						.process-dot {
							font-size: 22rpx;
							color: #999;
							text-align: center;
							width: 180rpx;
							position: absolute;

							&:nth-child(1) {
								left: -10rpx;
							}

							&:nth-child(2) {
								left: 190rpx;
							}

							&:nth-child(3) {
								// display: none;
								left: 390rpx;
							}

							&:nth-child(4) {
								// display: none;
								left: 590rpx;
							}
						}
					}

					.process-level {
						position: relative;

						.img-process {
							width: 100%;
							height: 34rpx;
							position: absolute;
							left: 0;
							top: 0;
							z-index: 2;
						}

						.img-process-bg {
							width: 100%;
							height: 34rpx;
						}
					}
				}

				.head-amount {
					position: relative;
					height: 254rpx*.5;

					.img-amount {
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 254rpx*.5;
					}

					.amount-content {
						position: relative;
						text-align: center;
						padding-top: 20rpx;

						.title {
							font-size: 26rpx;
							color: rgba(49, 49, 49, .6);
						}

						.num {
							font-size: 50rpx;
							color: #fff;
						}
					}
				}
			}
		}

		.user-middle {
			position: relative;
			margin: 20rpx 60rpx;

			.invite-btn {
				display: flex;
				justify-content: center;
				background-color: #fff;
				padding: 20rpx 50rpx;
				border-radius: 20rpx;
				box-shadow: 5rpx 5rpx 5rpx 5rpx #eee;
				justify-content: space-between;

				.item-btn {
					display: flex;
					align-items: center;
					flex: 1;
					position: relative;

					&:nth-child(1) {
						margin-right: 40rpx;

						&::after {
							content: '';
							width: 1rpx;
							height: 60rpx;
							background-color: rgba(198, 170, 128, .5);
							display: block;
							position: absolute;
							right: -14rpx;
							top: 0;
							bottom: 0;
							margin: auto;
						}

					}

					.img-label {
						width: 60rpx;
						height: 60rpx;
						margin-right: 12rpx;
					}

					.btn-label {
						color: rgba(198, 170, 128, 1);

						.title {
							font-size: 30rpx;
						}

						.sub-title {
							font-size: 24rpx;
						}
					}
				}
			}
		}

		.user-bottom {
			.user-ability {
				.ability-list {
					display: flex;
					flex-wrap: wrap;
					width: 100%;

					.item-ability {
						width: 185rpx;
						height: 185rpx;
						background-color: #fff;
						border-right: 1px solid rgba(198, 170, 128, .5);
						border-bottom: 1px solid rgba(198, 170, 128, .5);
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;

						.item-media {
							.img-abilty {
								width: 60rpx;
								height: 60rpx;
							}
						}

						.item-title {
							font-size: 22rpx;
							color: rgba(198, 170, 128, 1);
						}
					}
				}
			}
		}
	}
</style>
