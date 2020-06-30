<template>
	<view class="content">
		<!-- banner -->
		<view class="main-banner">
			<uniSwiper :swiperList="swiperList" style="width:100%" :imageKey="swiperOptions.imageKey" :interval="swiperOptions.interval"
			 :nextMargin="swiperOptions.nextMargin" :previousMargin="swiperOptions.previousMargin" :displayMultipleItems="swiperOptions.displayMultipleItems"
			 :swiperType="swiperOptions.swiperType"></uniSwiper>
		</view>
		<!-- 跑马灯 -->
		<view class="main-maque">
			<image class="main-maque-icon" src="~@/static/img/main/radio.png"></image>
			<view class="main-maque-view">
				<swiper class="maque-swiper" vertical="true" autoplay="true" circular="true" interval="3000" duration="1000"
				 skip-hidden-item-layout="true">
					<swiper-item class="swiper-item" @tap="checkText" v-for="(item,index) in swiperList" :key="index">
						<view class="swiper-title">{{item.title}}</view>
						<image class="swiper-hot" src="~@/static/img/main/hot.png"></image>
					</swiper-item>
				</swiper>
			</view>
		</view> 
		<!-- 收益 -->
		<view class="main-income">
			<view class="icome-head">
				<image class="item-icon" src="~@/static/img/main/data.png"></image>
				<view class="item-title">收益(非事实数据)</view>
			</view>
			<view class="icome-content">
				<view class="item-cicle">
					<ArcbarChart :dataAs="dataAs" :extraAs="extraAs" :titleAs="titleAs" width="200" height="200" />
			<!-- 		<view class="item-cicle__text">
						<view>
							<view class="tip">今日剩余单数</view>
							<view class="value">3单</view>
						</view>
					</view> -->
				</view>
				<view class="item-content">
					<view class="item-list">
						<view class="icome-item">
							<view class="item-dd">
								本周收益(元)
							</view>
							<view class="item-ll">
								12
							</view>
						</view>
						<view class="icome-item">
							<view class="item-dd">
								昨日收益(元)
							</view>
							<view class="item-ll">
								12
							</view>
						</view>
						<view class="icome-item">
							<view class="item-dd">
								今日收益(元)
							</view>
							<view class="item-ll">
								12
							</view>
						</view>
						<view class="icome-item">
							<view class="item-dd">
								总收益(元)
							</view>
							<view class="item-ll">
								12
							</view>
						</view>
						<view class="icome-item">
							<view class="item-dd">
								本月收益(元)
							</view>
							<view class="item-ll">
								12
							</view>
						</view>
						<view class="icome-item">
							<view class="item-dd">
								上月收益(元)
							</view>
							<view class="item-ll">
								12
							</view>
						</view>
						<view class="icome-item">
							<view class="item-dd">
								今日已做任务
							</view>
							<view class="item-ll">
								12
							</view>
						</view>
						<view class="icome-item">
							<view class="item-dd">
								可用余额
							</view>
							<view class="item-ll">
								12
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 任务 -->
		<view class="main-task">
			<view class="task-container">
				<view class="task-list">
					<view class="task-media">
						<view class="item-logo">
							<image class="img-logo" src="~@/static/img/main/all-vip.png" mode="scaleToFill"></image>
						</view>
						<view class="item-platm">
							<image class="img-platm" src="~@/static/img/weixin.png" mode="scaleToFill"></image>
							<view class="platm-content">
								<view class="title">微信</view>
								<view class="desc">转发朋友圈</view>
							</view>
						</view>
					</view>
					<view class="task-content">
						<view class="content-platm">
							<image class="img-ads" src="http://img1.juimg.com/160118/330724-16011QR35957.jpg"
							 mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<view class="task-list">
					<view class="task-media">
						<view class="item-logo">
							<image class="img-logo" src="~@/static/img/main/all-vip.png" mode="scaleToFill"></image>
						</view>
						<view class="item-platm">
							<image class="img-platm" src="~@/static/img/weixin.png" mode="scaleToFill"></image>
							<view class="platm-content">
								<view class="title">微信</view>
								<view class="desc">转发朋友圈</view>
							</view>
						</view>
					</view>
					<view class="task-content">
						<view class="content-platm">
							<image class="img-ads" src="http://img1.juimg.com/160118/330724-16011QR35957.jpg"
							 mode="scaleToFill"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="task-more">
				<view class="task-more-btn">
					更多任务>>
				</view>
			</view>
		</view>
		<!-- 排行榜 -->
		<view class="main-ranking">
			<view class="ranking-bg">
				<image class="img-ranking-bg" src="~@/static/img/main/vip-floor.png" mode="scaleToFill"></image>
			</view>
			<view class="ranking-content">
				<view class="ranking-item" :class="[index%2 == 1 ?'cur' :'']" v-for="(item,index) in swiperList" :key="index">
					<view class="item-bg">
						<image class="img-ranking-l" src="~@/static/img/main/ranking-l.png" mode="scaleToFill"></image>
					</view>
					<view class="item-content">
						<view class="item-top">
							<image class="img-top" src="~@/static/img/main/top1.png" mode="scaleToFill"></image>
						</view>
						<view class="item-avator">
							<image class="img-avator" src="~@/static/img/main/ranking-headdecorate-top2-3.png" mode="scaleToFill"></image>
						</view>
						<view class="item-desc">
							<view class="title">
								用户134834**34
							</view>
							<view class="task">
								今日任务3个
							</view>
							<view class="dot">
								获得
							</view>
							<view class="price">
								¥99.99
							</view>
						</view>
					</view>
				</view>
				<!-- <uniSwiper :swiperList="swiperList" style="width:100%" :swiperClass="'rankSwiper'" :slotScopes="true" :imageKey="rankOptions.imageKey"
				 :interval="rankOptions.interval" :nextMargin="rankOptions.nextMargin" :previousMargin="rankOptions.previousMargin"
				 :displayMultipleItems="rankOptions.displayMultipleItems" :swiperType="rankOptions.swiperType">
					<view class="ranking-item" slot="swiperSlot">
						<view class="item-bg">
							<image class="img-ranking-l" src="~@/static/img/main/ranking-l.png" mode="scaleToFill"></image>
						</view>
						<view class="item-content">
							<view class="item-top">
								<image class="img-top" src="~@/static/img/main/top1.png" mode="scaleToFill"></image>
							</view>
							<view class="item-avator">
								<image class="img-avator" src="~@/static/img/main/ranking-headdecorate-top2-3.png" mode="scaleToFill"></image>
							</view>
							<view class="item-desc">
								<view class="title">
									用户134834**34
								</view>
								<view class="task">
									今日任务3个
								</view>
								<view class="dot">
									获得
								</view>
								<view class="price">
									¥99.99
								</view>
							</view>
						</view>
					</view>
				</uniSwiper> -->
			</view>
		</view>
		<!-- 底部bar  -->
		<homeBar />	
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import ArcbarChart from '@/components/stan-ucharts/ArcbarChart.vue'
	import uniSwiper from '@/components/main/uni-swiper'
	import homeBar from '@/components/main/home-bar'
	export default {
		data() {
			return {
				dataAs: {
					//柱状图Compent  //label应为series value 应为
					series: [{
						data: 0.29,
						color: 'rgb(200, 165, 86)'
					}]
				},
				titleAs: {
					title: {
						name: '今日剩余单数',
						fontSize: 12,
						color: '#666'
					},
					subtitle: {
						name: '3单',
						fontSize: 18,
						color: 'rgb(200, 165, 86)'
					}
				},
				extraAs: {
					extra: {
						arcbar: {
							type: 'circle', //整圆类型进度条图					
							startAngle: 1.5, //整圆类型只需配置起始角度即可	
							width: 5
						}
					}
				},
				swiperList: [{
					img: 'http://img1.juimg.com/160118/330724-16011QR35957.jpg',
					url: 'baidu.com',
					title: 'bashjahsjateste'
				}, {
					img: 'http://pic39.nipic.com/20140321/8857347_232251363165_2.jpg',
					url: 'baidu.com',
					title: 'bashjahsjateste',
				}, {
					img: 'http://img1.juimg.com/160118/330724-16011QR35957.jpg',
					url: 'baidu.com',
					title: 'bashjahsjateste',
				}, {
					img: 'http://pic9.nipic.com/20100823/2531170_162544700240_2.jpg',
					url: 'baidu.com',
					title: 'bashjahsjateste',
				}, {
					img: 'http://pic9.nipic.com/20100823/2531170_162544700240_2.jpg',
					url: 'baidu.com',
					title: 'bashjahsjateste',
				}],
				swiperOptions: {
					nextMargin: '0rpx',
					previousMargin: '0rpx',
					imageKey: 'img',
					displayMultipleItems: 1,
					swiperType: true,
					interval: 5000,
				},
				mequeOptions: {
					nextMargin: '10rpx',
					previousMargin: '10rpx',
					textKey: 'title',
					displayMultipleItems: 1,
					swiperType: true,
					interval: 5000,
					vertical: true,
					imageKey: '',
					textTip: true,
				},
				rankOptions: {
					nextMargin: '0',
					previousMargin: '0',
					imageKey: 'img',
					displayMultipleItems: 1,
					swiperType: true,
					interval: 5000,
				}
			}
		},
		components: {
			ArcbarChart,
			uniSwiper,
			homeBar
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		async onLoad() {
			this.$store.dispatch('setPrePath', '/pages/main/main');
			// if (!this.hasLogin) {
			// 	uni.reLaunch({
			// 		url: '/pages/login/login'
			// 	});				
			// }
		},
		methods: {
			//初始化数据
			initData() {

			},
			checkText() {

			}
		},
	}
</script>

<style lang="scss">
	@import './main.scss';
</style>
