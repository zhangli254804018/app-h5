<template>
	<view class="content">
		<view class="recode_table_header">
			<view class="recode_item recode_time">时间</view>
			<view class="recode_item recode_task">任务</view>
			<view class="recode_item recode_fraction">分数</view>
		</view>
		<view v-for="item in list" :key="item.value" class="recode_table_body">
			<view class="table_body_item body_item_time">
				{{item.time}}
			</view>
			<view class="table_body_item body_item_task">
				{{item.task}}
			</view>
			<view class="table_body_item body_item_fraction">
				{{item.fraction}}
			</view>
		</view>
		<view class="recode_tips">
			共有{{list.length}}条记录(只显示最近7天)
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			list:[
				{
					id:'1',
					time:'2020-06-26',
					task:'任务名称',
					fraction:'+1'
				},
				{
					id:'2',
					time:'2020-06-26',
					task:'任务名称',
					fraction:'+2'
				},
				{
					id:'3',
					time:'2020-06-26',
					task:'任务名称',
					fraction:'+1'
				},
			]
		};
	},
	computed: mapState(['userName']),
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss">
.content {
	// height: 100vh;
	background-color: #fff;
	padding: 40rpx 20rpx;
}
.recode_table_header {
	display: flex;
	// height: 80rpx;
	
	.recode_item {
		height: 80rpx;
		text-align: center;
		flex: 1;
		line-height: 80rpx;
		font-size: 28rpx;
		color: rgb(78,78,78);
	}
	.recode_time {
		background-color: #EA68A2;
	}
	.recode_task {
		background-color: #BFA56D;
	}
	.recode_fraction{
		background-color: #EA68A2;
	}
}
.recode_table_body {
	display: flex;
	.table_body_item {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 24rpx;
		color: rgb(78,78,78);
	}
	.body_item_fraction {
		color: rgb(173,147,108);
	}
}
.recode_tips {
	margin-top: 60rpx;
	width: 100%;
	text-align: center;
	font-size: 24rpx;
	color: #ccc;
}
</style>
