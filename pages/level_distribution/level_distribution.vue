<template>
	<view class="content team-report">
		<view class="filter-bar">
			<picker class="time-filter" mode="date" :value="cond.beginTime" :start="startDate" :end="endDate" @change="bindBeginTimeChange">
				<view class="uni-input">{{cond.beginTime || '请选择开始时间'}}</view>
			</picker>
			<view class="and">至</view>
			<picker class="time-filter" mode="date" :value="cond.beginTime" :start="startDate" :end="endDate" @change="bindEndTimeChange">
				<view class="uni-input">{{cond.beginTime || '请选择结束时间'}}</view>
			</picker>
			<view class="btn-filter">查询</view>
		</view>
		<view class="row tui-flex">
			<view class="tui-col-6">
				<view class="key">团队余额(元)</view>
				<view class="value">99999</view>
			</view>
			<view class="tui-col-6">
				<view class="key">团队流水(元)</view>
				<view class="value">99999</view>
			</view>
		</view>
		<view class="row tui-flex">
			<view class="tui-col-6">
				<view class="key">团队总充值(元)</view>
				<view class="value">99999</view>
			</view>
			<view class="tui-col-6">
				<view class="key">团队总提现(元)</view>
				<view class="value">99999</view>
			</view>
		</view>
		<view class="row row-bb tui-flex">
			<view class="tui-col-3">
				<view class="key">首充人数(人)</view>
				<view class="value">99999</view>
			</view>
			<view class="tui-col-3">
				<view class="key">首推人数(人)</view>
				<view class="value">99999</view>
			</view>
			<view class="tui-col-3">
				<view class="key">团队人数(人)</view>
				<view class="value">99999</view>
			</view>
			<view class="tui-col-3">
				<view class="key">新增人数(人)</view>
				<view class="value">99999</view>
			</view>
		</view>
		<view class="tui-flex tab-bar">
			<view :class="['tui-col-4', cond.tag === 1 ? 'active' : '']" @tap="cond.tag = 1">
				一级(0/1)
			</view>
			<view :class="['tui-col-4', cond.tag === 2 ? 'active' : '']" @tap="cond.tag = 2">
				二级(0/0)
			</view>
			<view :class="['tui-col-4', cond.tag === 3 ? 'active' : '']" @tap="cond.tag = 3">
				三级(0/0)
			</view>
		</view>

		<view class="list-box">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<view class="list-item" v-for="(item, index) in dataList" :key="index">{{ item }}</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import mescrollList from "@/components/main/mescroll-list";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {
		mapState
	} from 'vuex'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			mescrollList
		},
		data() {
			return {
				cond: {
					tag: 1,
					current: 1,
					beginTime: '',
					endTime: ''
				},
				loading: false,
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
				},
				isLoading: false
			}
		},
		computed: {
			...mapState(['forcedLogin', 'hasLogin', 'userName']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad() {

		},
		methods: {
			bindBeginTimeChange(e) {
				this.cond.beginTime = e.target.value
			},
			bindEndTimeChange(e) {
				this.cond.endTime = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//加载数据
			loadPage() {
				return new Promise((resolve, reject) => {
					this.$api.appTaskList(this.cond).then(res => {
						console.log('appTaskList------>', res)
						const temp = []
						for (let i = 0, j = res.length; i < j; i++) {
							temp.push('178****0100 可用余额: 5.00 青铜会员卡')
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
				this.$refs.mescrollRef.mescroll.endSuccess(this.dataList.length, !this.isLoading);
			}

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
	.team-report {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #fafafa;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
		padding: 0 20rpx;

		.filter-bar {
			margin: 20rpx 0;
			color: rgb(78, 78, 78);

			.time-filter {
				font-size: 20rpx;
				line-height: 40rpx;
				background-color: #eee;
				border-radius: 20rpx;
				display: inline-block;
				padding: 4rpx 20rpx;
			}

			.and {
				display: inline-block;
				width: 60rpx;
				text-align: center;
				font-size: 24rpx;
				line-height: 40rpx;
			}

			.btn-filter {
				margin: 4rpx 0;
				float: right;
				color: rgb(101, 85, 62);
				font-size: 20rpx;
				width: 150rpx;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-image: url(../../static/img/level_distribution/1.png);
			}
		}

		.row {
			font-size: 24rpx;
			color: rgba(78, 78, 78, 0.7);
			text-align: center;
			padding: 20rpx 0;
			border-top: 1px solid rgba(197, 176, 138, .4);

			&.row-bb {
				border-bottom: 1px solid rgba(197, 176, 138, .4);
				margin-bottom: 20rpx;
			}

			.tui-col-6+.tui-col-6,
			.tui-col-3+.tui-col-3 {
				border-left: 1px solid rgba(197, 176, 138, .4);
			}

			.key {
				margin-bottom: 20rpx;
			}

			.value {
				color: rgb(78, 78, 78);
				font-size: 30rpx;
			}

			.tui-col-3 .key {
				font-size: 20rpx;
			}
		}

		.tab-bar {
			text-align: center;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 24rpx;
			color: rgb(78, 78, 78);
			background-color: #eee;
			margin-bottom: 20rpx;

			.active {
				color: #fff;
				background-color: rgb(225, 193, 145);
			}
		}

		.list-box {
			flex: 1;
			overflow: auto;

			.list-item {
				font-size: 22rpx;
				color: rgb(78, 78, 78);
				line-height: 30rpx;
				margin-bottom: 10rpx;
			}
		}
	}
</style>
