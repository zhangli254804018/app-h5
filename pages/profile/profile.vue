<template>
	<view class="content">
		<view class="banner_bg_img">
			<image src="../../static/img/profile/gonggao.png" mode="scaleToFill"></image>
			<view class="phone_style_box">
				<view class="head_portrait"><image class="head_portrait_img" src="../../static/img/profile/portrait.png" mode="scaleToFill"></image></view>
				<view class="head_text_button">头像</view>
				<view class="main_item_box">
					<view class="item_box">
						<image src="../../static/img/profile/shouji.png" mode="scaleToFill"></image>
						<view class="my_phone">
							<text>我的手机号码</text>
							<input type="text" value="" v-model.trim="myForm.phone" />
						</view>
					</view>
					<view class="item_box">
						<image src="../../static/img/profile/bank.png" mode="scaleToFill"></image>
						<view class="my_phone">
							<text>我的银行卡</text>
							<view class="my_Alipay" @tap="toBank">去设置</view>
						</view>
					</view>
					<view class="item_box">
						<image src="../../static/img/profile/zhifubao.png" mode="scaleToFill"></image>
						<view class="my_phone">
							<text>我的支付宝</text>
							<input type="text" value="" v-model.trim="myForm.alipayNum" />
						</view>
					</view>
					<view class="item_box">
						<image src="../../static/img/profile/wodexiangxixinxi.png" mode="scaleToFill"></image>
						<view class="my_phone">
							<text>我的详细信息</text>
							<input type="text" value="" v-model.trim="myForm.name" />
						</view>
					</view>
					<view class="item_box">
						<image src="../../static/img/profile/mimaguanli.png" mode="scaleToFill"></image>
						<view class="my_phone">
							<text>密码管理</text>
							<input class="pwdInput" type="password" value="" v-model.trim="myForm.passwd" />
							<image class="cancel_btn" src="../../static/img/profile/quxiao.png" mode="scaleToFill" @click="handleDelete"></image>
							<view class="keep-pwd">保存</view>
						</view>
					</view>
					<view class="item_box">
						<image src="../../static/img/profile/shezhizhifumima.png" mode="scaleToFill"></image>
						<view class="my_phone">
							<text>设置支付密码</text>
							<view class="set_up_pwd">未设置</view>
						</view>
					</view>
					<view class="item_box">
						<image src="../../static/img/profile/shanchuzhanghao.png" mode="scaleToFill"></image>
						<view class="delete"><text>删除账号</text></view>
					</view>
				</view>
				<view class="">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			testData: '',
			myForm: {
				phone: '13562481234',
				name: '刘梅清',
				alipayNum:'13562481234',//支付宝账号
				passwd: '121356'
			}
		};
	},
	computed: mapState(['userName']),
	onLoad() {},
	methods: {
		toBank() {
			uni.navigateTo({
				url: '/pages/profile/bank'
			})
		},
		handleDelete(){
			this.myForm.passwd='';
		}
	}
};
</script>

<style lang="scss">
.banner_bg_img {
	height: 100%;
	position: relative;
	image {
		position: absolute;
		top: -25rpx;
		width: 100%;
		height: 100%;
	}
}
.phone_style_box {
	background-color: #fff;
	position: absolute;
	top: 124rpx;
	width: 100%;
	height: 500rpx;
	border-radius: 120rpx;
	.head_portrait {
		position: absolute;
		top: 32rpx;
		left: 50%;
		width: 130rpx;
		height: 130rpx;
		transform: translate(-50%, -50%);
		.head_portrait_img {
			width: 130rpx;
			height: 130rpx;
			// object-fit: cover;
			// width: 100%;
			// height: 100%;
		}
	}
	.head_text_button {
		width: 74rpx;
		// height: 17rpx;
		font-size: 24rpx;
		background-color: #ac8f63;
		border-radius: 20rpx;
		text-align: center;
		padding: 5rpx 0;
		color: #fff;
		position: absolute;
		left: 50%;
		top: 22%;
		transform: translate(-50%, -50%);
	}
	.main_item_box {
		position: absolute;
		top: 142rpx;
		padding: 0rpx 70rpx 0rpx 70rpx;
		.item_box {
			// padding: 40rpx 0;
			display: flex;
			justify-content: start;
			align-items: center;
			position: relative;
			image {
				position: absolute;
				top: 36rpx;
				left: 0;
				width: 48rpx;
				height: 48rpx;
				// margin-right: 30rpx;
			}
			.delete {
				margin-left: 78rpx;
				display: flex;
				padding: 40rpx 0;
				width: 100%;
				text {
					display: inline-block;
					width: 200rpx;
					font-size: 28rpx;
				}
			}
			.my_phone {
				margin-left: 78rpx;
				display: flex;
				border-bottom: 1rpx solid rgba(173, 147, 108, 0.2);
				padding: 40rpx 0;
				width: 100%;
				text {
					display: inline-block;
					width: 200rpx;
					font-size: 28rpx;
				}
				input {
					font-size: 28rpx;
				}
				.pwdInput {
					width: 140rpx;
					margin-right: 60rpx;
				}
				.my_Alipay {
					color: #c1ae92;
					font-size: 28rpx;
				}
				.cancel_btn {
					width: 26rpx;
					height: 26rpx;
					position: absolute;
					top: 47rpx;
					left: 430rpx;
				}
				.keep-pwd {
					width: 100rpx;
					background-color: #ad936c;
					text-align: center;
					border-radius: 20rpx;
					color: #fff;
					font-size: 24rpx;
				}
				.set_up_pwd {
					color: #5da9a1;
					font-size: 28rpx;
				}
			}
		}
	}
}
</style>
