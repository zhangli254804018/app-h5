<template>
	<view class="content invite">
		<view class="tui-header-bg">
			<image src="@/static/img/credit/bg.png" class="tui-header-img" mode="scaleToFill"></image>
			<view class="header">
				<view class="mb1 tip">我的分享地址</view>
				<view class="mb1 share-link">{{shareLink}}</view>
				<view class="mb1 btn" @click="clipboard(shareLink)">复制二维码链接</view>
				<view class="mb1 tip">我的分享地址</view>
				<view class="mb2 qrcode">
					<canvas style="width: 150rpx;height: 150rpx;" canvas-id="qrcode"></canvas>
				</view>
				<view>
					<view class="btn" @click="reflesh">刷新二维码图片</view>
					<view class="btn" @click="saveCode">保存二维码</view>
				</view>
			</view>
		</view>
		
		<view class="tui-flex data-list">
			<!-- <view ></view> -->
			<view class="col" v-for="(item, index) in imgs" :key="index">
				<image class="cover" :src="item" mode="scaleToFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	const thorui = require("@/components/tui-clipboard/tui-clipboard.js")
	import QR from "@/libs/weapp-qrcode.js"
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				shareLink: 'https://baidu.com',
				qrcode: '',
				imgs: [
					require('@/static/img/credit/bg.png'),
					require('@/static/img/credit/bg.png'),
					require('@/static/img/credit/bg.png'),
					require('@/static/img/credit/bg.png')
				]
			}
		},
		computed: {
			...mapState(['userName'])
		},
		onLoad() {
			setTimeout(() => {
				this.createQrCode()
			}, 50)
		},
		watch: {
			shareLink() {
				this.createQrCode()
			}
		},
		methods: {
			createQrCode() {
				new QR('qrcode', {
					text: this.shareLink,
					width: 75,
					height: 75,
					colorDark: "#333",
					colorLight: "transparent"
				})
			},
			// 保存二维码
			saveCode() {
				uni.getImageInfo({
					src: this.qrcode,
					success: function(image) {
						console.log('图片信息：', JSON.stringify(image));
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function() {
								console.log('save success');
								uni.showToast({
									title: '图片保存成功',
									icon: 'none',
									duration: 2200
								});
							}
						});
					}
				})
			},
			// 刷新
			reflesh() {
				console.log(QR)
			},
			// 复制
			clipboard(value) {
				thorui.getClipboardData(value, (res) => {
					// #ifdef H5 || MP-ALIPAY
					uni.showToast({
						title: res ? '复制成功' : '复制失败',
						icon: 'none',
						duration: 2200
					});
					// #endif
				},event)
			}
		}
	}
</script>

<style lang="scss">
	.invite {
		.tui-header-bg {
			position: relative;
			width: 100%;
			margin: 0;
			margin-bottom: 50rpx;
			
			.tui-header-img {
				width: 100%;
			}
			
			.header {
				position: absolute;
				top: 50%;
				left: 0;
				width: 100%;
				transform: translate(0, -50%);
				z-index: 3;
				font-size: 24rpx;
				color: rgb(78,78,78);
				text-align: center;
					
				.mb1 {
					margin-bottom: 10rpx;
				}
		
				.mb2 {
					margin-bottom: 20rpx;
				}
				
				.btn {
					font-size: 20rpx;
					display: inline-block;
					background-color: #fff;
					height: 30rpx;
					line-height: 30rpx;
					border-radius: 30rpx;
					padding: 4rpx 20rpx;
					
					& + .btn {
						margin-left: 35rpx;
					}
				}
				
				.share-link {
					font-size: 22rpx;
					text-decoration: underline;
					color: rgb(8,156,211);
				}
				
				.qrcode {
					margin: 0 auto 20rpx;
					width: 150rpx;
					height: 150rpx;
				}
			}
		}
		.data-list {
			flex-flow: wrap;
			margin-right: 20rpx;
			margin-left: -5rpx;
			font-size: 0;
			
			.col {
				flex: 1;
				min-width: 1 / 3 * 100%;
				width: 1 / 3 * 100%;
				max-width: 1 / 3 * 100%;
				overflow: hidden;
				margin-bottom: 25rpx;
				
				.cover {
					width: 219rpx;
					height: 360rpx;
					padding-left: 25rpx;
				}
			}
		}
	}
</style>
