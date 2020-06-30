<template>
	<view class="content day_report">
		<view class="info-box">
			<view class="total">总收益: {{ total }}</view>
			<view class="tui-flex">
				<view class="tui-col-3">
					<view class="key" style="margin-left: -8rpx;">自己任务收益(元)</view>
					<view class="value">{{mySelf}}</view>
				</view>
				<view class="tui-col-3">
					<view class="key" style="margin-left: -8rpx;">下级任务收益(元)</view>
					<view class="value">{{mySelf}}</view>
				</view>
				<view class="tui-col-3">
					<view class="key" style="margin-left: -8rpx;">下级充值收益(元)</view>
					<view class="value">{{mySelf}}</view>
				</view>
				<view class="tui-col-3">
					<view class="key">中奖收益(元)</view>
					<view class="value">{{mySelf}}</view>
				</view>
			</view>
		</view>
		<!-- <view class="data-table"> -->
			<view class="row data-table__header">
				<view class="col">数量</view>
				<view class="col">任务</view>
				<view class="col">下级</view>
				<view class="col">拉人</view>
				<view class="col">其他</view>
				<view class="col">消费</view>
				<view class="col">日期</view>
			</view>
			<view class="data-table__body">
				<mescrollList ref="mescrollRef" @downCallback="downCallback" @upCallback="upCallback" :downOption="downOption" :upOption="upOption">
					<view class="row" v-for="(item, index) in dataList" :key="index">
						<view class="col">{{item.a}}</view>
						<view class="col">{{item.b}}</view>
						<view class="col">{{item.c}}</view>
						<view class="col">{{item.d}}</view>
						<view class="col">{{item.e}}</view>
						<view class="col">{{item.f}}</view>
						<view class="col">{{item.g}}</view>
					</view>
				</mescrollList>
			</view>
			<view class="data-table__tip">
				<view>(一天一更新)</view>
				<view>详细数据看收入记录</view>
				<view>共有{{listLength}}条记录(只显示最近30天记录)</view>
			</view>
		<!-- </view> -->
	</view>
</template>

<script>
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
					current: 1
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
								a: 99,
								b: 99,
								c: 99,
								d: 99,
								e: 99,
								f: 99,
								g: '06-05'
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

.day_report {
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	background-color: #fafafa;
	/* #ifdef MP-ALIPAY || MP-BAIDU */
	height: 100vh;
	/* #endif */
	padding: 0 20rpx;
	
	.info-box {
		margin-top: 30rpx;
		margin-bottom: 42rpx;
		padding: 20rpx;
		border: 1px solid rgba(78,78,78,.2);
		border-radius: 8rpx;
		font-size: 18rpx;
		color: rgb(55,55,55);
		text-align: center;
		
		.key, .value{
			transform: scale(.8);
			white-space: nowrap;
		}
		
		.key {
			margin-bottom: 20rpx;
		}
		
		.total {
			margin-left: 10rpx;
			margin-bottom: 20rpx;
			font-size: 32rpx;
			color: rgb(200,165,86);
			text-align: left;
		}
	}
	
	.row {
		display: flex;
	}
	
	.col {
		flex: 1;
		font-size: 18rpx;
		color: rgb(55,55,55);
		text-align: center;
	}
	
	.data-table__header {
		font-size: 18rpx;
		color: rgb(55,55,55);
		text-align: center;
		margin-bottom: 25rpx;
	}
	
	.data-table__body {
		flex: 1;
		// background-color: #000;
		margin-bottom: 54rpx;
		overflow: auto;
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
