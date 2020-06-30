<template>
	<view class="swiperContent">
		<swiper @change="change" @animationfinish="animationfinish" :indicator-dots="indicatorDots" :indicator-active-color="indicatorActiveColor"
		 :indicator-color="indicatorColor" :autoplay="(autoplay && flag)" :current="current" :interval="interval" :duration="duration"
		 :circular="circular" :vertical="vertical" :previous-margin="previousMargin" :next-margin="nextMargin"
		 :display-multiple-items="displayMultipleItems" :skip-hidden-item-layout="skipHiddenItemLayout" :style="{'height':bannerHeight+'px'}"
		 :class="[(swiperType && displayMultipleItems ==1 && !vertical && !fullScreen && !swiperClass)? 'cardSwiper':'',swiperClass]"
		 class="screen-swiper">
			<swiper-item class="swiper-item" v-for="(item,index) in swiperList" :key="index" :class="[(cardCur==index && displayMultipleItems ==1 && !vertical && !fullScreen)?'cur':'']"
			 @tap="clickItem(index)">
				<view class="slot-item" :class="[index < cardCur && cardCur < swiperList.length -1 || cardCur == swiperList.length -1 &&index == 0  ? 'prev' :'' ]"
				 v-if="slotScopes">
					{{index}} {{cardCur}}
					<slot name="swiperSlot" class="swiper-slot">
					</slot>
				</view>
				<view class="swiper-item-view" v-else>
					<view v-if="item[imageKey] && !item[videoKey]">
						<image :src="item[imageKey]" :style="{'height':bannerHeight+'px'}"></image>
						<text v-if="textTip" class="swiperText" :style="{
								 		'bottom':(swiperType?(textStyleBottom+12):textStyleBottom)+'%',
								 		'right':textStyleRight+'%',
								 		'color':textStyleColor,
								 		'background':textStyleBgcolor,
								 		'font-size':textStyleSize+'rpx'
								 	}">{{item[textKey]}}</text>
					</view>
					<view v-if="item[textKey]">
						<text v-if="textTip" class="swiperText" :style="{
								 		'bottom':(swiperType?(textStyleBottom+12):textStyleBottom)+'%',
								 		'right':textStyleRight+'%',
								 		'color':textStyleColor,
								 		'background':textStyleBgcolor,
								 		'font-size':textStyleSize+'rpx'
								 	}">{{item[textKey]}}</text>
					</view>
					<view v-if="item[videoKey]">
						<video :src="item[videoKey]" @play="play" @pause="pause" :style="{'height':bannerHeight+'px'}" autoplay loop
						 muted :autoplay="videoAutoplay" objectFit="cover"></video>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'bw-swiper',
		created: function() {
			var that = this;
			if (this.fullScreen) {
				uni.getSystemInfo({
					success: function(e) {
						that.swiperHeight = e.screenHeight - 44
					}
				})
			}
		},
		mounted: function() {
			if (!this.fullScreen) {
				const query = uni.createSelectorQuery().in(this);
				query.select('.swiper-item').boundingClientRect(data => {
					this.swiperHeight = (data && data.width / this.w_h) || this.bannerHeight
					// this.swiperHeight = this.bannerHeight || this.swiperHeight 
				}).exec();
			}
		},
		props: {
			fullScreen: { // 是否全屏
				type: Boolean,
				default: false
			},
			swiperList: { // 滑块视图容器数据
				type: Array,
				default: function() {
					return []
				}
			},
			swiperType: { // false => 全屏限高轮播图 true => 卡塔式轮播图
				type: Boolean,
				default: false
			},
			videoAutoplay: { // true =>自动播放
				type: Boolean,
				default: false
			},
			videoKey: { // 视频映射的键
				type: String,
				default: 'src'
			},
			imageKey: { //  图片映射的键
				type: String,
				default: 'img'
			},
			textKey: { //   文字说明映射的键
				type: String,
				default: 'text'
			},
			textTip: { // 图片文字说明 false => 隐藏
				type: Boolean,
				default: false
			},
			textStyleSize: { // 图片文字大小
				type: Number,
				default: 24
			},
			textStyleBottom: { // 图片文字位置
				type: Number,
				default: 5
			},
			textStyleRight: { // 图片文字位置
				type: Number,
				default: 5
			},
			textStyleColor: { // 图片文字颜色
				type: String,
				default: '#ffffff'
			},
			textStyleBgcolor: { // 图片文字背景色
				type: String,
				default: 'transparent'
			},
			w_h: { //宽高比 推荐 w/h => 2
				type: Number,
				default: 2
			},
			skipHiddenItemLayout: { //是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息 
				type: Boolean,
				default: true
			},
			displayMultipleItems: { //同时显示的滑块数量
				type: Number,
				default: 1
			},
			nextMargin: { // 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值 头条小程序不支持
				type: String,
				default: '0px'
			},
			previousMargin: { //前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值头条小程序不支持
				type: String,
				default: '0px'
			},
			vertical: { //滑动方向是否为纵向 卡牌  不支持纵向以及同时显示的2块以上滑块数量
				type: Boolean,
				default: false
			},
			circular: { // 是否采用衔接滑动
				type: Boolean,
				default: true
			},
			duration: { // 滑动动画时长
				type: Number,
				default: 400
			},
			interval: { // 自动切换时间间隔
				type: Number,
				default: 2500
			},
			current: { // 当前所在滑块的 index
				type: Number,
				default: 0
			},
			autoplay: { // 是否自动切换
				type: Boolean,
				default: false
			},
			indicatorColor: { // 指示点颜色
				type: String,
				default: '#CCCCCC'
			},
			indicatorActiveColor: { // 当前选中的指示点颜色
				type: String,
				default: '#ffffff'
			},
			indicatorDots: { // 是否显示面板指示点
				type: Boolean,
				default: false
			},
			slotScopes: {
				type: Boolean,
				default: false
			},
			swiperClass: {
				type: String,
				default: ''
			},
			bannerHeight: {
				type: [String, Number],
				default: 200
			}
		},
		watch: {
			bannerHeight: function(curval, oldval) {
				console.log('curval---->', curval, oldval)
				this.swiperHeight = curval
			},
		},
		data() {
			return {
				flag: true,
				cardCur: 0,
				swiperHeight: 200
			}
		},
		computed: {

		},
		methods: {
			play: function() {
				this.flag = false
			},
			pause: function() {
				this.flag = true
			},
			clickItem: function(index) {
				if (this.swiperList.length > 0) {
					this.$emit('clickItem', this.swiperList[index])
				}
			},
			change: function(e) {
				this.$emit('change', e)
			},
			animationfinish: function(e) {
				console.log('animationfinish--->', e)
				this.cardCur = e.detail.current;
				this.$emit('animationfinish', e)
			}
		}
	}
</script>

<style lang="scss">
	.cardSwiper .swiper-item {
		width: 86% !important;
		overflow: initial;
	}

	.cardSwiper .swiper-item .swiper-item-view {
		width: 100%;
		display: block;
		height: 100%;
		border-radius: 10rpx;
		transform: scale(0.95, 0.85);
		opacity: 0.7;
		transition: all 0.1s ease-in 0s;
		overflow: hidden;
		box-sizing: border-box;
		margin-left: 8.1%;
		background-color: #eee;
	}

	.cardSwiper .cur {
		z-index: 99;
	}

	.cardSwiper .cur .swiper-item-view {
		transform: initial;
		opacity: 1;
		transition: all 0.1s ease-in 0s;
		// width: 110%;
		// left: -5%;
	}

	.swiper-item .swiper-item-view {
		height: 100%;
		width: 100%;
		position: relative;
	}

	.swiperText {
		position: absolute;
		color: #ffffff;
		z-index: 2;
		border-radius: 4rpx;
		padding: 0 4rpx;
	}

	.screen-swiper image {
		width: 100%;
	}

	.screen-swiper video,
	.swiper-item video {
		width: 100%;
		display: block;
		height: 100%;
	}

	.swiperContent {
		width: 100%;
	}

	//排行榜下面swiper样式

	.rankSwiper {
		height: 322rpx !important;
		margin: auto;
		padding: 0 12rpx;
	}

	.rankSwiper .swiper-item {
		width: 280rpx !important;
		height: 322rpx !important;
	}

	.rankSwiper .swiper-item {
		display: block;
		transition: all 0.1s ease-in 0s;
		overflow: hidden;
		box-sizing: border-box;
		margin-left: 31.1%;

		.slot-item {
			opacity: 1;
			transform: translate(-30rpx, 0) scale(.85);

			&.prev {
				transform: translate(30rpx, 0) scale(.85);
			}
		}
	}

	.rankSwiper .cur.swiper-item {
		transform: initial;
		opacity: 1;
		transition: all 0.1s ease-in 0s;

		.slot-item {
			transform: translate(0, 0) scale(1);
		}
	}
</style>
