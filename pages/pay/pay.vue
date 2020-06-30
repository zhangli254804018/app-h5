<template>
	<view class="content">
		<view class="pay-container">
			<view class="pay-contnet">
				<view class="pay-form">
					<view class="form-item">
						<view class="form-dt">
							收款账号
						</view>
						<view class="form-dd">
							<input type="text" value="" placeholder="请输入账号" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-dt">
							收款账号
						</view>
						<view class="form-dd">
							<input type="text" value="" placeholder="请输入账号" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-dt">
							收款人
						</view>
						<view class="form-dd">
							<input type="text" value="" placeholder="请输入收款人" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-dt">
							存入金额
						</view>
						<view class="form-dd">
							<input type="text" value="" placeholder="请输入账号" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-dt">
							汇款人姓名
						</view>
						<view class="form-dd">
							<input type="text" value="" placeholder="请输入汇款人姓名" />
						</view>
					</view>
				</view>
				<view class="pay-submit">
					<view class="submit-btn">
						提交
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				testData: ''
			}
		},
		computed: mapState(['userName']),
		onLoad() {

		}
	}
</script>

<style lang="scss">

</style>
