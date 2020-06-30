<template>
	<view>
		<web-view style="width: 100%;height: 100%;" :src="url" :webview-styles="webviewStyles" @message="bindGetMsg"
		 @onPostMessage="postMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				backUrl: '',
				share_title: '',
				share_image: '',
				type: '',
				act_id: '',
				webviewStyles: {
					progress: {
						color: "#FF3333"
					}
				}
			}
		},
		methods: {
			// 方法
			onsuccess() {
				uni.hideNavigationBarLoading(); //完成停止加载
			},
			onerror() {
				uni.hideNavigationBarLoading(); //完成停止加载
			},
			bindGetMsg(e) {
				console.log(e.detail)
				const detail = e.detail || {}
				uni.setNavigationBarTitle({
					title: detail.title
				});
			},
			postMessage(e) {
				console.log(e.detail)
			}
		},
		onLoad(options) {
			uni.showNavigationBarLoading(); //在标题栏中显示加载			
			this.url = decodeURIComponent(options.url);
			console.log('onLoad----------->', options, decodeURIComponent(options.url),this.url)
			this.share_title = options.share_title;
			this.share_image = options.share_image;
			this.backUrl = options.backUrl;
			this.type = options.type ? options.type : '';
			this.act_id = options.act_id ? options.act_id : '';
			setTimeout(() => {
				uni.hideNavigationBarLoading(); //完成停止加载
			}, 1000);
			uni.setNavigationBarTitle({
				title: this.share_title
			});
		},
		mounted() {
			
		}
	}
</script>

<style>

</style>
