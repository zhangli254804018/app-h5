<template>
	<view class="content">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<!-- banner -->
			<view class="main-banner">
				<uniSwiper :swiperList="swiperList" style="width:100%" :imageKey="swiperOptions.imageKey" :interval="swiperOptions.interval"
				 :nextMargin="swiperOptions.nextMargin" :previousMargin="swiperOptions.previousMargin" :displayMultipleItems="swiperOptions.displayMultipleItems"
				 :swiperType="swiperOptions.swiperType"></uniSwiper>
			</view>
			<!-- 跑马灯 -->
			<view class="main-maque" v-if="appIndexConfigInfo.marquees &&appIndexConfigInfo.marquees.length > 0">
				<image class="main-maque-icon" src="~@/static/img/main/radio.png"></image>
				<view class="main-maque-view">
					<swiper class="maque-swiper" vertical="true" autoplay="true" circular="true" interval="3000" duration="1000"
					 skip-hidden-item-layout="true">
						<swiper-item class="swiper-item" @tap="checkText" v-for="(item,index) in appIndexConfigInfo.marquees" :key="index">
							<view class="swiper-title">{{item}}</view>
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
					</view>
					<view class="item-content">
						<view class="item-list">
							<view class="icome-item">
								<view class="item-dd">
									本周收益(元)
								</view>
								<view class="item-ll">
									{{myIndexStatInfo.weekIncome}}
								</view>
							</view>
							<view class="icome-item">
								<view class="item-dd">
									昨日收益(元)
								</view>
								<view class="item-ll">
									{{myIndexStatInfo.yesterdayIncome}}
								</view>
							</view>
							<view class="icome-item">
								<view class="item-dd">
									今日收益(元)
								</view>
								<view class="item-ll">
									{{myIndexStatInfo.totalIncome}}
								</view>
							</view>
							<view class="icome-item">
								<view class="item-dd">
									总收益(元)
								</view>
								<view class="item-ll">
									{{myIndexStatInfo.totalIncome}}
								</view>
							</view>
							<view class="icome-item">
								<view class="item-dd">
									本月收益(元)
								</view>
								<view class="item-ll">
									{{myIndexStatInfo.monthIncome}}
								</view>
							</view>
							<view class="icome-item">
								<view class="item-dd">
									上月收益(元)
								</view>
								<view class="item-ll">
									{{myIndexStatInfo.lastMonthIncome}}
								</view>
							</view>
							<view class="icome-item">
								<view class="item-dd">
									今日已做任务
								</view>
								<view class="item-ll">
									{{myIndexStatInfo.todayDoTask}}
								</view>
							</view>
							<view class="icome-item">
								<view class="item-dd">
									可用余额
								</view>
								<view class="item-ll">
									{{myIndexStatInfo.amount}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 任务 -->
			<view class="main-task" v-if="appIndexConfigInfo.taskTypes && appIndexConfigInfo.taskTypes.length > 0">
				<view class="task-container">
					<view class="task-list" v-for="(item,index) in appIndexConfigInfo.taskTypes" :key="index">
						<view class="task-media">
							<view class="item-logo">
								<image class="img-logo" src="~@/static/img/main/all-vip.png" mode="scaleToFill"></image>
							</view>
							<view class="item-platm">
								<image class="img-platm" :src="item.iconLink" mode="scaleToFill"></image>
								<!-- <image class="img-platm" src="~@/static/img/weixin.png" mode="scaleToFill"></image> -->
								<view class="platm-content">
									<view class="title">{{item.typeName}}</view>
									<view class="desc">转发朋友圈</view>
								</view>
							</view>
						</view>
						<view class="task-content">
							<view class="content-platm">
								<image class="img-ads" :src="item.backgroundLink" mode="scaleToFill"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="task-more" @tap="onTask">
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
					<view class="ranking-item" :class="[index%2 == 1 ?'cur' :'']" v-for="(item,index) in taskTalent" :key="index">
						<view class="item-bg">
							<image class="img-ranking-l" src="~@/static/img/main/ranking-l.png" mode="scaleToFill"></image>
						</view>
						<view class="item-content">
							<view class="item-top">
								<image class="img-top" src="~@/static/img/main/top1.png" mode="scaleToFill"></image>
								<view class="level">{{item.topIndex}}</view>
							</view>
							<view class="item-avator">
								<!-- <image class="img-avator" src="~@/static/img/main/ranking-headdecorate-top2-3.png" mode="scaleToFill"></image> -->
								<image class="img-avator" src="../../static/img/main/13.png" mode="scaleToFill"></image>
							</view>
							<view class="item-desc">
								<view class="title">
									用户{{item.phone}}
								</view>
								<view class="task">
									今日任务{{item.doTask}}个
								</view>
								<view class="dot">
									获得
								</view>
								<view class="price">
									¥{{item.amount}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
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
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
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
				swiperOptions: {
					nextMargin: '0rpx',
					previousMargin: '0rpx',
					imageKey: 'imgLink',
					displayMultipleItems: 1,
					swiperType: true,
					interval: 5000,
					bannerHeight: 180
				},
				rankOptions: {
					nextMargin: '0',
					previousMargin: '0',
					imageKey: 'img',
					displayMultipleItems: 1,
					swiperType: true,
					interval: 5000,
				},
				appIndexConfigInfo: {
					ads: [],
					marquees: []
				},
				swiperList: [],
				taskTalent: [],
				myIndexStatInfo: {},
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
		components: {
			ArcbarChart,
			uniSwiper,
			homeBar
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		async onLoad() {
			this.initData();
			this.myIndexStat()
			this.$store.dispatch('setPrePath', '/pages/main/main');
		},
		methods: {
			onTask(){
				uni.navigateTo({
					url:'/pages/task/task'
				})
			},
			async downCallback() {
				await this.initData().catch(err => {})
				await this.myIndexStat().catch(err => {})
				setTimeout(() => {
					this.$refs.mescrollRef.mescroll.resetUpScroll();
				}, 300)
			},
			//初始化数据
			initData() {
				return new Promise((resolve, reject) => {
					this.$api.appIndexConfig().then(res => {
						console.log('appIndexConfig----->', res)
						this.appIndexConfigInfo = res
						this.swiperList = this.appIndexConfigInfo.ads.map(item => {
							return {
								...item,
								// imgLink: 'http://pic9.nipic.com/20100823/2531170_162544700240_2.jpg'
							}
						});
						this.taskTalent = [...this.appIndexConfigInfo.taskTalent];
						// this.taskTalent = taskTalent.splice(0,2,[])
						this.taskTalent.splice(0, 2, this.taskTalent[1], this.taskTalent[0])
						resolve()
					}).catch(err => {
						reject(err)
					})
				})
			},
			//请求个人收益模块接口
			myIndexStat() {
				return new Promise((resolve, reject) => {
					this.$api.myIndexStat().then(res => {
						this.myIndexStatInfo = res
						const taskTotal = Number(this.myIndexStatInfo.todayNotDoTask + this.myIndexStatInfo.todayDoTask);
						this.titleAs.subtitle.name = `${res.todayNotDoTask}单`
						this.dataAs.series[0] = {
							...this.dataAs.series[0],
							data: (this.myIndexStatInfo.todayDoTask / taskTotal).toFixed(2)
						}
						resolve()
					}).catch(err => {
						reject(err)
					})
				})
			},
			checkText() {

			}
		},
	}
</script>

<style lang="scss">
	@import './main.scss';
</style>
