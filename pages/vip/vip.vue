<template>
	<view class="content">
		<view class="vip-container">
			<view class="vip-content">
				
			</view>
		</view>
		<homeBar :tabIndex="4" />
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import homeBar from '@/components/main/home-bar'
	export default {
		data() {
			return {

			}
		},
		computed: mapState(['hasLogin']),
		onLoad() {

		},
		components: {
			homeBar
		},
		methods: {
			bindLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			onTab(item) {
				uni.navigateTo({
					url: item.path
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: 120rpx;
	}
</style>
