<template>
	<view class="content">
		<view class="help_item" v-for="(item,index) in helpList">
			<view class="help_title">{{item.title}}</view>
			<view class="help_info"v-for="(itemB,indexB) in item.list">
				<view class="help_item">{{itemB.title}}</view>
				<view class="help_to" @click="showHelp">></view>
			</view>
			<!-- <view class="help_info">
				<view clasv-for="(item,index) in helpList"s="help_item">关于综合标题的详细问题</view>
				<view class="help_to">></view>
			</view>
			<view class="help_info">
				<view class="help_item">关于综合标题的详细问题</view>
				<view class="help_to">></view>
			</view> -->
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			testData: '',
			helpList:[],
		};
	},
	computed: mapState(['userName']),
	onLoad() {
		this.$api.listHelpInfo().then(res => {
			console.log('help--帮助中心-->', res);
			this.helpList = res
		});
	},
	methods:{
		showHelp(){
			// uni.showModal({
			//     title: '提示',
			//     content: '这是一个模态弹窗',
			//     success: function (res) {
			//         if (res.confirm) {
			//             console.log('用户点击确定');
			//         } else if (res.cancel) {
			//             console.log('用户点击取消');
			//         }
			//     }
			// });
		}
	}
};
</script>

<style lang="scss">
.content {
	background-color: #fff;
	padding: 0rpx 50rpx;
}
.help_title {
	margin-top: 30rpx;
	background-color: #dedede;
	// width: 100%;
	font-size: 28rpx;
	border-radius: 30rpx;
	padding: 10rpx 40rpx;
}
.help_info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx 36rpx 30rpx 40rpx;
	border-bottom: 1rpx solid #ccc;
	.help_item {
		font-size: 28rpx;
	}
	.help_to {
		font-size: 28rpx;
	}
}
</style>
