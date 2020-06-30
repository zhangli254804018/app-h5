<template>
	<view class="content">
		<!-- 	<mescrollList ref="mescrollRef" @downCallback="downCallback" @upCallback="upCallback" :upOption="upOption"> -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback"
		 @up="upCallback" :down="downOption" :up="upOption">
			<view class="task-container" v-slot>
				<view class="task-banner" v-if="taskInfo.ads && taskInfo.ads.length > 0">
					<swiper class="scroll_view_H" autoplay indicator-dots='true' bindchange='onADBannerChange' circular="true"
					 skip-hidden-item-layout="true">
						<swiper-item class='banner_swiper_item' v-for="(item,index) in taskInfo.ads" :key="index" @tap="onBannerItemClick(item)">
							<image lazy-load="true" class="banner_image" :src="item.imgLink" binderror='onBannerLoaderError' mode="scaleToFill"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="task-content">
					<view class="task-head">
						<view class="head-item" v-for="(item,index) in taskInfo.taskTypes" :key="index" @tap="onType(item)">
							<image class="img-cover" :src="item.backgroundLink" mode="scaleToFill"></image>
							<view class="item-content">
								<view class="item-title">
									<view class="name">
										{{item.typeName}}
									</view>
								</view>
								<view class="item-icon">
									<image class="img-icon" :src="item.iconLink" mode="aspectFill"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="task-list" v-if="taskList && taskList.length > 0">
						<view class="list-item" v-for="(item,index) in taskList" :key="index">
							<view class="item-media">
								<view class="media-icon">
									<image class="img-icon" :src="item.iconLink" mode="scaleToFill"></image>
								</view>
								<view class="media-title">
									{{item.typeName}}
								</view>
							</view>
							<view class="item-content">
								<view class="demand-item">
									<view class="name">
										{{item.title}}
									</view>
								</view>
								<view class="demand-item">
									<view class="name">
										需求方：{{item.nickname}}
									</view>
									<view class="status">
										{{item.typeName}}
									</view>
								</view>
								<view class="requirement-item">
									<view class="title">
										要求：
									</view>
									<view class="desc">
										{{item.taskDesc}}
									</view>
								</view>
							</view>
							<view class="item-obtain">
								<image class="img-cover" src="../../static/img/task/9.png" mode="scaleToFill"></image>
								<view class="obtain-content">
									<view class="amount">
										{{item.leftQuantity}}
									</view>
									<view class="name">
										领取
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="task-list" v-else>
						<!-- <tuiNoData></tuiNoData> -->
					</view>
				</view>
			</view>
		</mescroll-body>
		<homeBar :tabIndex="2" />
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import homeBar from '@/components/main/home-bar'
	import uniSwiper from '@/components/main/uni-swiper'
	import mescrollList from "@/components/main/mescroll-list";
	import tuiNoData from "@/components/main/tui-no-data";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	// import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				swiperOptions: {
					nextMargin: '0rpx',
					previousMargin: '0rpx',
					imageKey: 'imgLink',
					displayMultipleItems: 1,
					swiperType: false,
					interval: 5000,
					bannerHeight: 200
				},
				taskInfo: {
					ads: [],
					taskTypes: []
				},
				taskForm: {
					taskType: 1,
					current: 1,
					size: 20
				},
				taskList: [],
				mescroll: null,
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
				loading: false,
				isLoading: false
			}
		},
		computed: mapState(['hasLogin']),
		onLoad() {
			//获取初始化数据
			this.initData();
		},
		components: {
			homeBar,
			uniSwiper,
			mescrollList,
			tuiNoData,
		},
		methods: {
			//初始化数据
			initData() {
				return new Promise((resolve, reject) => {
					this.$api.appTaskConfig().then(res => {
						console.log('appTaskConfig----->', res)
						this.taskInfo = res
						resolve(res)
					}).catch(err => {
						reject(err)
					});
				});
			},
			onType(item) {
				console.log('onType------>', item);
				this.taskForm.current = 1;
				this.taskForm.taskType = item.taskType;
				this.downCallback()
			},
			onTab(item) {
				uni.navigateTo({
					url: item.path
				})
			},
			//加载数据
			loadPage() {
				return new Promise((resolve, reject) => {
					this.$api.appTaskList(this.taskForm).then(res => {
						console.log('appTaskList------>', res)
						if (this.taskForm.current > 1) {
							this.taskList = [...this.taskList, ...res]
						} else {
							this.taskList = res
						}
						if (res && res.length > 0) {
							this.taskForm.current++
							this.isLoading = false
						} else {
							this.isLoading = true
						}
						resolve(res)
					}).catch(err => {
						reject(err)
					})
				})
			},
			/*下拉刷新的回调*/
			async downCallback() {
				// 与 mescroll-body 的处理方式一致 > 
				if (this.loading) {
					return true
				};
				this.loading = true;
				this.taskForm.current = 1;
				await this.loadPage().catch(err => {});
				setTimeout(() => {
					this.$refs.mescrollRef.mescroll.resetUpScroll();
				}, 300)
				this.loading = false;
			},
			/*上拉加载的回调*/
			async upCallback({
				page,
				ref
			}) {
				console.log('upCallback----->', page);
				// 与 mescroll-body 的处理方式一致 > 
				if (this.loading) {
					return true
				};
				this.loading = true;
				await this.loadPage().catch(err => {});
				this.loading = false;
				this.$refs.mescrollRef.mescroll.endSuccess(this.taskList.length, !this.isLoading);
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: 120rpx;
	}

	.task-container {
		width: 100%;

		.task-banner {
			width: 100%;

			.scroll_view_H {
				width: 100%;
			}

			.banner_swiper_item {
				width: 100%;
			}

			.banner_image {
				width: 100%;
				height: 400rpx;
			}
		}
	}

	.task-content {
		.task-head {
			display: flex;
			align-items: center;
			padding: 20rpx 20rpx 0 20rpx;

			.head-item {
				position: relative;
				width: 157rpx;
				height: 73rpx;
				margin-right: 12rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 30rpx;
				box-shadow: 3rpx 3rpx 3rpx 3rpx #eee;

				.img-cover {
					position: absolute;
					top: 0;
					left: 0;
					width: 157rpx;
					height: 73rpx;
					border-radius: 30rpx;
				}

				.item-content {
					position: relative;
					display: flex;
					align-items: center;

					.item-title {
						font-size: 24rpx;
						color: #fff;
						padding: 3rpx 12rpx;
						text-shadow: 5rpx 5rpx 5rpx 5rpx #fff;
					}

					.item-icon {
						width: 60rpx;
						height: 60rpx;

						.img-icon {
							width: 60rpx;
							height: 60rpx;
						}
					}
				}
			}
		}

		.task-list {
			margin-top: 20rpx;

			.list-item {
				display: flex;
				align-items: center;
				margin: 20rpx;
				box-shadow: 5rpx 5rpx 5rpx 5rpx #eee;
				background-color: #fff;
				padding: 0;
				box-sizing: border-box;

				.item-media {
					padding: 0 36rpx;
					text-align: center;

					.media-icon {
						.img-icon {
							width: 76rpx;
							height: 76rpx;
						}
					}

					.media-title {
						font-size: 24rpx;
						color: rgb(173, 147, 108);
					}
				}

				.item-content {
					flex: 1;
					margin-left: 20rpx;
					font-size: 24rpx;

					.demand-item {
						display: flex;

						.name {
							color: rgb(55, 55, 55);
							margin-right: 12rpx;
						}

						.status {
							color: rgb(173, 147, 108);
						}
					}

					.requirement-item {
						display: flex;
					}
				}

				.item-obtain {
					font-size: 28rpx;
					position: relative;
					width: 164rpx;
					height: 206rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.img-cover {
						position: absolute;
						top: 0;
						left: 0;
						width: 164rpx;
						height: 206rpx;
					}

					.obtain-content {
						position: relative;
						text-align: center;
						padding: 50rpx 0;

						.amount {
							font-size: 36rpx;
							color: rgb(136, 136, 136);
						}

						.name {
							font-size: 36rpx;
							color: #fff;
						}
					}
				}
			}
		}

		.task-more {
			.more-btn {
				margin: 20rpx;
				padding: 20rpx 12rpx;
				background-color: #fff;
				font-size: 28rpx;
				text-align: center;
			}
		}
	}
</style>
