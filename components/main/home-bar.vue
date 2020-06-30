<template>
	<view class="main-home-bar">
		<view class="tab-bar">
			<view class="bar-btn" :class="[tabIndex == 0? 'active' :'']" @tap="ontab(0)">
				<view class="bar-view">
					<image class="img-bar" src="~@/static/img/main/navbar-home-active.png" mode="scaleToFill" v-if="tabIndex == 0"></image>
					<image class="img-bar" src="~@/static/img/main/navbar-home-notactive.png" mode="scaleToFill" v-else></image>
				</view>
				<view class="txt">首页</view>
			</view>
			<view class="bar-btn" :class="[tabIndex == 1? 'active' :'']" @tap="ontab(1)">
				<view class="bar-view">
					<image class="img-bar img-person" src="~@/static/img/main/navbar-vip-active.png" mode="scaleToFill" v-if="tabIndex == 1"></image>
					<image class="img-bar" src="~@/static/img/main/navbar-vip-notactive.png" mode="scaleToFill" v-else></image>
				</view>
				<view class="txt">会员</view>
			</view>
			<view class="bar-btn" :class="[tabIndex == 2? 'active' :'']" @tap="ontab(2)">
				<view class="bar-view">
					<image class="img-bar img-task" src="~@/static/img/main/navbar-task-active.png" mode="scaleToFill" v-if="tabIndex == 2"></image>
					<image class="img-bar" src="~@/static/img/main/navbar-task-notactive.png" mode="scaleToFill" v-else></image>
				</view>
				<view class="txt">任务</view>
			</view>
			<view class="bar-btn" :class="[tabIndex == 3? 'active' :'']" @tap="ontab(3)">
				<view class="bar-view">
					<image class="img-bar img-recode" src="~@/static/img/main/navbar-record-active.png" mode="scaleToFill" v-if="tabIndex == 3"></image>
					<image class="img-bar" src="~@/static/img/main/navbar-record-notactive.png" mode="scaleToFill" v-else></image>
				</view>
				<view class="txt">记录</view>
			</view>
			<view class="bar-btn" :class="[tabIndex == 4? 'active' :'']" @tap="ontab(4)">
				<view class="bar-view">
					<image class="img-bar img-mine" src="~@/static/img/main/navbar-my-active.png" mode="scaleToFill" v-if="tabIndex == 4"></image>
					<image class="img-bar" src="~@/static/img/main/navbar-my-notactive.png" mode="scaleToFill" v-else></image>
				</view>
				<view class="txt">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'home-bar',
		created: function() {
			var that = this;
			if (this.fullScreen) {
				uni.getSystemInfo({
					success: function(e) {
						that.swiperHeight = e.screenHeight - 44
					}
				})
			}
		},
		mounted: function() {

		},
		props: {
			tabIndex: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {
				flag: true,
				cardCur: 0,
				swiperHeight: 300
			}
		},
		computed: {

		},
		methods: {
			change: function(e) {
				this.$emit('change', e)
			},
			ontab(item) {
				console.log('ontab------>', item)
				const _index = item
				if (this.tabIndex == _index) {
					return
				}
				switch (_index) {
					case 0:
						uni.navigateTo({
							url: '/pages/main/main'
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/pages/member/member'
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/task/task'
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/order/order'
						})
						break;
					case 4:
						uni.navigateTo({
							url: '/pages/user/user'
						})
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	$themeColor:rgb(200, 165, 86);
	$themeRedColor:rgb(255, 42, 48);
	$themeBlackColor:rgb(55, 55, 55);
	$themeGreyColor:#a2a2a2;
	$themeGoldColor:rgb(191, 165, 109);

	//底部bar
	.main-home-bar {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;

		.tab-bar {
			display: flex;
			align-items: center;
			background-color: $themeBlackColor;
			padding: 12rpx 0;

			.bar-btn {
				flex: 1;
				text-align: center;

				.bar-view {
					width: 70rpx;
					height: 50rpx;
					position: relative;
					margin: auto;
					margin-bottom: 8rpx;
				}

				.img-bar {
					width: 70rpx;
					height: 50rpx;
				}

				.txt {
					color: #fff;
					font-size: 28rpx;
				}

				&.active {
					.txt {
						color: $themeGoldColor;
						font-size: 24rpx;
					}

					.img-bar {
						width: 70rpx;
						height: 74rpx;
						position: absolute;
						bottom: 0;
						left: 0;

						&.img-person {
							width: 102rpx;
							height: 74rpx;
							left: -10rpx;
						}
					}
				}
			}
		}
	}
</style>
