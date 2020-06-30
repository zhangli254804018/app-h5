<template>
	<view class="content">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="" title="导航栏组件" @clickLeft="clickLeft"></uni-nav-bar> -->
		<view class="account_type">
			<view class="type_text">账号类型:</view>
			<radio-group class="radio_box" @change="radioChange">
				<label class="radio_item" v-for="(item, index) in items" :key="item.value">
					<view>
						<radio color="#BDA781" style="transform:scale(0.7)" :value="item.value" :checked="index === current" />
					</view>
					<view>{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="operation_explain">
			<view class="operation_text">操作说明:</view>
			<view class="operation_link">查看教程</view>
		</view>
		<view class="add_img">
			<view class="add_text">添加截图:</view>
			<sunui-upimg @change="getImageInfo" :upload_auto="auto" ref="upimg" :url="uploadOption.url" :extra="uploadOption.extra"></sunui-upimg>
			<!-- <view class="add_img_compon" @click="upLoadimg">
				<image src="../../static/img/account/upload.png" mode="scaleToFill"></image>
			</view> -->
		</view>
		<view class="bind_submit">
			<view class="button_bgImg">
				<image src="../../static/img/account/btn.png" mode="scaleToFill"></image>
			</view>
			<view class="submit-button">提 交</view>
		</view>
		<view class="bind_tips">
			<view class="bind_title">提示:</view>
			<view class="tips_text">
				<view class="text_item">请您绑定自己的抖音主页面，谢谢合作</view>
				<view class="text_item">点击右下角我的页面->账号绑定->添加自己的抖音账号截图</view>
				<view class="text_item">由于审核人数比较多，语句需要时间60分钟</view>
				<view class="text_item add_wx">
					如需加快审核进度，请点击添加微信:
					<text class="weChat-text">384U3iruhrqh</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	var _self;
	import sunUiUpimg from '@/components/main/sunui-upimg';
	export default {
		data() {
			return {
				testData: '',
				items: [{
						value: '0',
						name: '抖音',
						checked: 'true'
					},
					{
						value: '1',
						name: '微信'
					}
				],
				current: 0,
				auto: true,
				uploadOption: {
					extra: {
						type: 'douying'
					},
					url: uni.$store.state.prefix + '/api/huoju/app/system/fileUpload'
				}
			};
		},
		mounted() {
			// 服务器预览图片链接地址
			// this.$refs.upimg.upload_before_list = [
			// 	{
			// 		path: 'uni.$store.state.prefix + /api/huoju/app/system/fileUpload'
			// 	}
			// ];
		},
		components: {
			// 使用上传图片的组件
			'sunui-upimg': sunUiUpimg
		},
		computed: mapState(['userName']),
		onLoad() {},
		methods: {
			clickLeft(){
				uni.navigateBack()
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			upLoadimg: function() {
				this.auto = true
				this.$refs.upimg.upload();
			},
			getImageInfo(e) {
				// 上传图片或者删除图片返回信息
				console.log('返回图片信息------->', e);
			}
		}
	};
</script>

<style lang="scss">
	.content {
		background-color: #fff;
		// height: 100vh;
		padding: 0rpx 21rpx;
	}

	.account_type {
		display: flex;
		// margin: 0 21rpx;
		align-items: center;
		border-bottom: 1rpx solid #ccc;
		padding: 39rpx 0rpx 21rpx 0rpx;

		.type_text {
			margin-right: 29rpx;
			font-size: 24rpx;
		}

		.radio_box {
			display: flex;
			align-items: center;

			.radio_item {
				align-items: center;
				display: flex;
				margin-right: 31rpx;
				font-size: 24rpx;
			}
		}
	}

	.operation_explain {
		display: flex;
		margin: 19rpx 0rpx 33rpx 0rpx;

		.operation_text {
			color: rgb(78, 78, 78);
			margin-right: 20rpx;
			font-size: 24rpx;
		}

		.operation_link {
			color: rgb(8, 156, 211);
			font-size: 24rpx;
			border-bottom: 1px solid rgb(8, 156, 211);
		}
	}

	.add_img {
		// display: flex;

		.add_text {
			width: 168rpx;
			color: rgb(78, 78, 78);
			font-size: 24rpx;
			margin-right: 20rpx;
		}

		.add_img_compon {
			width: 100rpx;
			height: 100rpx;

			image {
				object-fit: cover;
				width: 100%;
				height: 100%;
			}
		}
	}

	.bind_submit {
		// margin-top: 130rpx;
		margin: 110rpx 0rpx 46rpx 0rpx;
		position: relative;

		.button_bgImg {
			width: 240rpx;
			height: 70rpx;

			image {
				object-fit: cover;
				width: 100%;
				height: 100%;
			}
		}

		.submit-button {
			position: absolute;
			top: 20rpx;
			left: 88rpx;
			font-size: 24rpx;
		}
	}

	.bind_tips {
		display: flex;

		.bind_title {
			color: rgb(255, 0, 0);
			font-size: 24rpx;
			width: 70rpx;
		}

		.tips_text {
			font-size: 24rpx;

			.text_item {
				font-size: 24rpx;
				color: rgb(255, 0, 0);
				margin-bottom: 10rpx;
			}

			.add_wx {
				display: inline-block;

				.weChat-text {
					// float: left;
					color: rgb(8, 156, 211);
					margin-left: 10rpx;
					border-bottom: 1rpx solid rgb(8, 156, 211);
				}
			}
		}
	}
</style>
