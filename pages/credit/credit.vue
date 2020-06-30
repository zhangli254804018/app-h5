<template>
	<view class="content">
		<view class="banner_image">
			<image src="../../static/img/credit/bg.png" mode=""></image>
			<view class="charts_box">
				<view class="qiun-columns">
					<view class="qiun-charts"><canvas canvas-id="canvasGauge" id="canvasGauge" class="charts"></canvas></view>
				</view>
			</view>
		</view>
		<view class="credit_box_info">
			<view class="credit_top">
				<view class="credit_description">信用说明</view>
				<view class="credit_record" @tap="toRecord">信用记录</view>
			</view>
			<view class="credit_regulations">
				<view class="item_list">1.信用积分每星期评估一次</view>
				<view class="item_list">2.初始用户信用积分：60</view>
				<view class="item_list">3.如果检测到用户做任务上传虚假图片一天扣除1积分，扣除上限7积分</view>
				<view class="item_list">4.如果未检测到用户使用虚假图片增加1积分</view>
				<view class="item_list">5.信用积分低于50分将被限制体现</view>
				<view class="item_list">6.信用积分低于30接任务次数减半</view>
				<view class="item_list">7.信用积分小于等于0将被封号</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uCharts from '@/plugins/stan-ucharts/u-charts/u-charts.js';
var canvaGauge = null;
var _self;
export default {
	data() {
		return {
			testData: '',
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			gaugeWidth: 15,
			chartData: {
				categories: [
					{
						value: 0.2,
						color: '#CD403B'
					},
					{
						value:0.5,
						color:'#E0CC1F'
					},
					{
						value: 0.8,
						color: '#23AC38'
					},
					{
						value: 1,
						color: '#36ADD5'
					}
				],
				series: [
					{
						name: '信用积分',
						data: 0.85
					}
				]
			}
		};
	},
	computed: mapState(['userName']),
	onLoad() {
		_self = this;
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		// this.getServerData();
		this.showGauge('canvasGauge', this.chartData);
	},
	methods: {
		toRecord(){
			uni.navigateTo({
				url: `/pages/credit/record`
			})
		},
		getServerData() {
			// uni.request({
			// 	url: 'https://www.ucharts.cn/data.json',
			// 	data: {},
			// 	success: function(res) {
			// 		console.log(res.data.data);
			// 		let Gauge = { categories: [], series: [] };
			// 		//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			// 		Gauge.categories = res.data.data.Gauge.categories;
			// 		Gauge.series = res.data.data.Gauge.series;
			// 		_self.showGauge('canvasGauge', Gauge);
			// 	},
			// 	fail: () => {
			// 		_self.tips = '网络错误，小程序端请检查合法域名';
			// 	}
			// });
		},
		showGauge(canvasId, chartData) {
			canvaGauge = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'gauge',
				fontSize: 11,
				legend: false,
				title: {
					name: Math.round(chartData.series[0].data * 100),
					// name: chartData.series[0].data,
					// color: chartData.categories[1].color,
					color:'#fff',
					fontSize: 50 * _self.pixelRatio,
					offsetY: 60 * _self.pixelRatio //新增参数，自定义调整Y轴文案距离
				},
				subtitle: {
					name: chartData.series[0].name,
					color: '#fff',
					fontSize: 20 * _self.pixelRatio,
					offsetY: -70 * _self.pixelRatio //新增参数，自定义调整Y轴文案距离
				},
				extra: {
					gauge: {
						type: 'default',
						width: _self.gaugeWidth * _self.pixelRatio, //仪表盘背景的宽度
						startAngle: 0.75,
						endAngle: 0.25,
						startNumber: 0,
						endNumber: 100,
						splitLine: {
							fixRadius: 0,
							splitNumber: 10,
							width: _self.gaugeWidth * _self.pixelRatio, //仪表盘背景的宽度
							color: '#FFFFFF',
							childNumber: 5,
							childWidth: _self.gaugeWidth * 0.4 * _self.pixelRatio //仪表盘背景的宽度
						},
						pointer: {
							width: _self.gaugeWidth * 0.8 * _self.pixelRatio, //指针宽度
							color: 'auto'
						}
					}
				},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				dataLabel: true
			});
		}
	}
};
</script>

<style lang="scss">
.content {
	// height: 100vh;
	background-color: #fff;
}
.banner_image {
	height: 580rpx;
	width: 100%;
	position: relative;
	image {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
	.charts_box {
		position: absolute;
		top: 80rpx;
		left: 0rpx;
		.qiun-charts {
			width: 750rpx;
			height: 500rpx;
			// background-color: #ffffff;
			.charts {
				width: 750upx;
				height: 500upx;
			}
		}
	}
}
.credit_box_info {
	padding: 0rpx 20rpx;
	background-color: #fff;
	.credit_top {
		height: 79rpx;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		.credit_description {
			font-size: 24rpx;
		}
		.credit_record {
			font-size: 24rpx;
			color: rgb(78, 78, 78);
			border-bottom: 1rpx solid rgba(78, 78, 78, 0.5);
		}
	}
	.credit_regulations {
		.item_list {
			font-size: 22rpx;
			color: rgb(78, 78, 78);
			margin-top: 14rpx;
		}
	}
}
</style>
