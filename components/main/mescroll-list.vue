<template>
	<view class="scroll-list">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<slot></slot>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue";
	import {
		delayBounceAction
	} from "@/utils/index.js"
	export default {
		name: 'mescroll-list',
		mixins: [MescrollMixin], // 使用mixin
		created: function() {

		},
		mounted: function() {

		},
		components: {
			MescrollBody: MescrollBody
		},
		props: {
			downOption: {
				type: Object,
				default: () => {

				}
			},
			upOption: {
				type: Object,
				default: () => {}
			}
		},		
		data() {
			return {

			}
		},
		computed: {

		},
		methods: {
			/*下拉刷新的回调*/
			async downCallback() {
				delayBounceAction(500, () => {
					this.$emit('downCallback', {
						ref: this
					})
				})
			},
			/*上拉加载的回调*/
			async upCallback(page) {
				delayBounceAction(500, () => {
					this.$emit('upCallback', {
						page,
						ref: this
					})
				})
			},
		}
	}
</script>

<style lang="scss">
.scroll-list{
	// height: 100vh;
}
</style>
