<template>
	<view class="content">
		<view class="bank_card">您的银行卡信息</view>
		<view class="card_info_item">
			<view class="item_title">银行名称</view>
			<input type="text" value="" placeholder="未输入银行名称.请设置" v-model.trim="cardInfo.bankName" />
			<view class="fast_choice">快速选择</view>
		</view>
		<view class="card_info_item">
			<view class="item_title">开户银行</view>
			<input type="text" value="" placeholder="未输入开户银行.请设置" v-model.trim="cardInfo.bankHousehold" />
		</view>
		<view class="card_info_item">
			<view class="item_title">银行卡号</view>
			<input type="text" value="" placeholder="未输入银行卡号.请设置" v-model.trim="cardInfo.cardNum" />
		</view>
		<view class="card_info_item">
			<view class="item_title">收款人名称</view>
			<input type="text" value="" placeholder="未输入收款人.请设置" v-model.trim="cardInfo.CollectionName" />
		</view>
		<view class="card_info_item">
			<view class="item_title">备注信息</view>
			<input type="text" value="" placeholder="未输入备注信息.请设置" v-model.trim="cardInfo.remarks" />
		</view>
		<view class="bind_submit">
			<view class="button_bgImg">
				<image src="../../static/img/account/btn.png" mode="scaleToFill"></image>
			</view>
			<view class="submit-button">保存</view>
		</view>
		<view class="tips_bank">
			*您好，为了保证会员体现通畅，系统暂不支持农村信用社，农村商业银行，建议您绑定常用4大银行或者其他银行，请认真填写以上信息，谢谢！
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			testData: '',
			cardInfo: {
				bankName: '', //银行名称
				bankHousehold: '', //开户银行
				cardNum: '', //银行卡号
				CollectionName: '', //收款人名称
				remarks: '' //备注
			}
		};
	},
	computed: mapState(['userName']),
	onLoad() {}
};
</script>

<style lang="scss">
.content {
	padding: 27rpx 50rpx;
}
.bank_card {
	padding: 8rpx 15rpx;
	font-size: 28rpx;
	color: #686868;
	background-color: #dedede;
	border-radius: 22rpx;
}
.card_info_item {
	display: flex;
	align-items: center;
	margin-top: 30rpx;
	.item_title {
		// margin-left: 15rpx;
		margin: 0 25rpx 0 15rpx;
		font-size: 28rpx;
		color: #5f5f5f;
		width: 144rpx;
	}
	input {
		font-size: 28rpx;
		// color: #d9d9d9;
	}
	.fast_choice {
		border-bottom: 1rpx solid #000000;
		margin-left: 30rpx;
	}
}
.bind_submit {
		// margin-top: 130rpx;
		margin-top: 50rpx;
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
			top: 16rpx;
			left: 88rpx;
			font-size: 24rpx;
		}
	}
.tips_bank {
	color: red;
	font-size: 24rpx;
	margin-top: 70rpx;
}
</style>
