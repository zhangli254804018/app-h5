<template>
	<view class="content withdraw-record">
		<view class="info-box">
			<view>余额(元)</view>
			<view class="money">{{ total }}</view>
		</view>
		
		<view class="tui-flex tab-bar tui-center">
			<view :class="['tui-col-6', 'tui-center', cond.type === 1 ? 'active' : '']" @tap="cond.type = 1">
				<view class="text">转账</view>
			</view>
			<view :class="['tui-col-6', 'tui-center', cond.type === 2 ? 'active' : '']" @tap="cond.type = 2">
				<view class="text">提现</view>
			</view>
		</view>
		
		<!-- <view class="data-table"> -->
			<view class="data-table__header tui-flex tui-center">
				<view class="tui-col-4" v-show="cond.type === 1">对方账号</view>
				<view class="tui-col-4" v-show="cond.type === 1">金钱</view>
				<view class="tui-col-4" v-show="cond.type === 2">金钱/手续费</view>
				<view class="tui-col-4" v-show="cond.type === 2">状态</view>
				<view class="tui-col-4">日期</view>
			</view>
			<view class="data-table__body">
				<mescrollList ref="mescrollRef" @downCallback="downCallback" @upCallback="upCallback" :downOption="downOption" :upOption="upOption">
					<view class="tui-flex tui-center" v-for="(item, index) in dataList" :key="index">
						<view class="tui-col-4" v-if="cond.type === 1">{{item.account}}</view>
						<view class="tui-col-4" v-if="cond.type === 1">{{item.payAmount}}</view>
						<view class="tui-col-4" v-if="cond.type === 2">{{item.amount || 0}}/{{item.feeAmount || 0}}</view>
						<view class="tui-col-4" v-if="cond.type === 2">
							<view v-if="item.status === 0">审批中</view>
							<view v-else-if="item.status === 1">审批成功</view>
							<view v-else-if="item.status === 2">出款中</view>
							<view v-else-if="item.status === 3">出款成功</view>
							<view v-else-if="item.status === -1">退回</view>
						</view>
						<view class="tui-col-4">{{item.createTime}}</view>
					</view>
				</mescrollList>
			</view>
			<view class="data-table__tip">
				<view>共有{{listTotal}}条记录(只显示最近300条记录)</view>
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
				listTotal: 0,
				total: 99999,
				mySelf: 99999,
				loading: false,
				cond: {
					current: 1,
					size: 50,
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
					this.$api.myWithdrawList(this.cond).then(res => {
						console.log('myWithdrawList------>', res)
						if (this.cond.current > 1) {
							this.dataList = [...this.dataList, ...res.list]
						} else {
							this.dataList = res.list
						}
						if (res && res.length > 0) {
							this.cond.current++
						}
						this.listTotal = res.total
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

.withdraw-record {
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	background-color: #fafafa;
	/* #ifdef MP-ALIPAY || MP-BAIDU */
	height: 100vh;
	/* #endif */
	padding: 0 20rpx;
	
	.info-box {
		padding: 50rpx 0 80rpx;
		font-size: 32rpx;
		color: rgb(55,55,55);
		text-align: center;
		
		.money {
			margin-top: 20rpx;
			font-size: 46rpx;
		}
	}
	
	.tab-bar {
		text-align: center;
		border-bottom: 1px solid rgba(#eee, .5);
		padding-bottom: 20rpx;
		margin-bottom: 20rpx;
		line-height: 60rpx;
		height: 50rpx;
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
