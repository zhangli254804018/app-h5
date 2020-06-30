<template>
	<view class="content charge-record">
		<view class="tui-flex tab-bar tui-center">
			<view :class="['tui-col-6', 'tui-center', cond.type === 1 ? 'active' : '']" @tap="cond.type = 1">
				<view class="text">收入</view>
			</view>
			<view :class="['tui-col-6', 'tui-center', cond.type === 2 ? 'active' : '']" @tap="cond.type = 2">
				<view class="text">支出</view>
			</view>
			<view :class="['tui-col-6', 'tui-center', cond.type === 3 ? 'active' : '']" @tap="cond.type = 3">
				<view class="text">充值</view>
			</view>
		</view>
		
		
		<view class="info-box" v-show="cond.type !== 3">
			<view class="money">{{ total }}元</view>
		</view>
		
		<!-- <view class="data-table"> -->
			<view class="data-table__header tui-flex tui-center">
				<!-- 收入 -->
				<view class="tui-col-4" v-show="cond.type === 1">来源</view>
				<view class="tui-col-4" v-show="cond.type === 1">金额</view>
				<view class="tui-col-4" v-show="cond.type === 1">创建日期</view>
				<!-- 支出 -->
				<view class="tui-col-4" v-show="cond.type === 2">名称</view>
				<view class="tui-col-4" v-show="cond.type === 2">金额</view>
				<view class="tui-col-4" v-show="cond.type === 2">创建日期</view>
				<!-- 充值 -->
				<view class="tui-col-4" v-show="cond.type === 3">金钱</view>
				<view class="tui-col-4" v-show="cond.type === 3">状态</view>
				<view class="tui-col-4" v-show="cond.type === 3">日期</view>
			</view>
			<view class="data-table__body">
				<mescrollList ref="mescrollRef" @downCallback="downCallback" @upCallback="upCallback" :downOption="downOption" :upOption="upOption">
					<view class="tui-flex tui-center" v-for="(item, index) in dataList" :key="index">
						<!-- 收入 -->
						<template v-if="cond.type === 1">
							<view class="tui-col-4">{{item.form}}</view>
							<view class="tui-col-4">{{item.money1}}</view>
						</template>
						<!-- 支出 -->
						<template v-else-if="cond.type === 2">
							<view class="tui-col-4">{{item.name}}</view>
							<view class="tui-col-4">{{item.money2}}</view>
						</template>
						<!-- 充值 -->
						<template v-else-if="cond.type === 3">
							<view class="tui-col-4">{{item.money3}}</view>
							<view class="tui-col-4">{{item.type}}</view>
						</template>
						<view class="tui-col-4">{{item.date}}</view>
					</view>
				</mescrollList>
			</view>
			<view class="data-table__tip">
				<view>共有{{listLength}}条记录(只显示最近7天)</view>
			</view>
		<!-- </view> -->
	</view>
</template>

<script>
	import {format_time} from '@/utils'
	import mescrollList from "@/components/main/mescroll-list";
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			mescrollList
		},
		data() {
			return {
				total: 99999,
				mySelf: 99999,
				loading: false,
				cond: {
					current: 1,
					type: 1
				},
				dataList: [],
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
					},
				}
			}
		},
		computed: {
			...mapState(['userName']),
			listLength() {
				return this.dataList.length
			}
		},
		watch: {
			'cond.type'() {
				this.cond.current = 1
				this.dataList = []
				this.loadPage()
			}
		},
		onLoad() {
		
		},
		methods: {
			//加载数据
			loadPage() {
				return new Promise((resolve, reject) => {
					this.$api.appTaskList(this.cond).then(res => {
						console.log('appTaskList------>', res)
						const temp = []
						for(let i = 0, j = res.length; i < j; i++) {
							temp.push({
								form: '任务1',
								name: '水晶会员卡',
								money1: Math.floor(Math.random() * 1000),
								money2: Math.floor(Math.random() * 1000),
								money3: Math.floor(Math.random() * 1000),
								type: '审核中',
								date: format_time(new Date())
							})
						}
						if (this.cond.current > 1) {
							// this.dataList = [...this.dataList, ...res]
							this.dataList = [...this.dataList, ...temp]
						} else {
							// this.dataList = res
							this.dataList = temp
						}
						if (res && res.length > 0) {
							this.cond.current++
						}
						resolve(res)
					}).catch(err => {
						reject(err)
					})
				})
			},
			/*下拉刷新的回调*/
			async downCallback({
				ref
			}) {
				// 与 mescroll-body 的处理方式一致 > 
				if (this.loading) {
					return true
				};
				this.loading = true;
				this.cond.current = 1;
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
				setTimeout(() => {
					this.$refs.mescrollRef.mescroll.endSuccess(this.dataList.length, !this.loading);
				}, 300)
			},
			getInfos() {}
		}
	}
</script>

<style lang="scss">
/* #ifndef APP-PLUS */
page {
	width: 100%;
	min-height: 100%;
	max-height: 100%;
	display: flex;
}

/* #endif */

.charge-record {
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	background-color: #fafafa;
	/* #ifdef MP-ALIPAY || MP-BAIDU */
	height: 100vh;
	/* #endif */
	padding: 0 20rpx;
	
	.info-box {
		font-size: 80rpx;
		color: rgb(78,78,78);
		text-align: center;
		padding: 64rpx 0 72rpx;
	}
	
	.tab-bar {
		text-align: center;
		border-bottom: 1px solid rgba(#eee, .5);
		padding-bottom: 20rpx;
		// margin-bottom: 20rpx;
		line-height: 60rpx;
		height: 100rpx;
		font-size: 28rpx;
		color: rgb(78,78,78);
		
		.text {
			padding: 0 30rpx;
			border-bottom: 4rpx solid transparent;
		}
		
		.active {
			color: rgb(224,192,144);
			
			
			.text {
				border-bottom: 4rpx solid rgb(224,192,144);
			}
		}
	}
	
	.data-table__header {
		margin-top: 20rpx;
		font-size: 24rpx;
		color: rgb(78,78,78);
		text-align: center;
		margin-bottom: 25rpx;
	}
	
	.data-table__body {
		flex: 1;
		font-size: 18rpx;
		color: rgb(78,78,78);
		text-align: center;
		// background-color: #000;
		margin-bottom: 54rpx;
		overflow: auto;
		
		.tui-flex {
			margin-bottom: 16rpx;
		}
	}
	
	.data-table__tip {
		text-align: center;
		font-size: 16rpx;
		color: rgba(78,78,78,.5);
		padding-bottom: 20rpx;
		transform: scale(.8);
	}
}
</style>
