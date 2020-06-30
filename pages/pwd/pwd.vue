<template>
	<view class="content">
		
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				testData:''
			}
		},
		computed: mapState(['userName']),
		onLoad() {
		
		}
	}
</script>

<style lang="scss">
	
</style>
