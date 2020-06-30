<template>
	<view class="content">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="order-container">
				<view class="order-head">
					<view class="head-content">
						<image class="img-cover" src="../../static/img/order/3.png" mode="scaleToFill"></image>
						<view class="head-title">
							<view class="title">
								任务记录
							</view>
							<!-- <view class="sub-title">
								剩余任务10个
							</view> -->
						</view>
					</view>
					<view class="head-tab">
						<view class="tab-list">
							<view class="tab-item" @tap="onTab(item)" v-for="(item,index) in tabList" :key="index" :class="[item.value == orderForm.taskStatus ? 'active' : '']">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
				<view class="order-content">
					<view class="order-list" v-if="userRecordTabList && userRecordTabList.length > 0">
						<view class="order-item" v-for="(item,index) in userRecordTabList" :key="index">
							<view class="item-head">
								<image class="img-head" src="../../static/img/order/2.png" mode="scaleToFill"></image>
								<view class="title">
									{{item.task.title}}
								</view>
								<view class="btn-del">
									<image class="img-del" src="../../static/img/order/4.png" mode="scaleToFill"></image>
								</view>
							</view>
							<view class="item-content">
								<view class="item-area">
									<view class="item-ll">
										<view class="item-dt">
											佣金：
										</view>
										<view class="item-dd">
											{{item.task.amount}}元
										</view>
									</view>
									<view class="item-ll">
										<view class="item-dt">
											任务要求：
										</view>
										<view class="item-dd">
											{{item.task.taskDesc}}
										</view>
									</view>
									<view class="item-ll">
										<view class="item-dt">
											任务连接：
										</view>
										<view class="item-dd">
											{{item.task.taskLink}}
										</view>
									</view>
									<view class="item-ll">
										<view class="item-dt">
											任务状态：
										</view>
										<view class="item-dd">
											{{item.taskStatus}}
										</view>
									</view>
									<view class="item-ll">
										<view class="item-dt">
											创建时间：
										</view>
										<view class="item-dd">
											{{item.createTime}}
										</view>
									</view>
									<view class="item-ll" v-if="item.auditTime">
										<view class="item-dt">
											审核时间：
										</view>
										<view class="item-dd">
											{{item.auditTime}}
										</view>
									</view>
									<view class="item-ll" v-if="item.auditRemark">
										<view class="item-dt">
											审核状态：
										</view>
										<view class="item-dd">
											{{item.auditRemark}}
										</view>
									</view>
								</view>
								<view class="item-submit" @tap="onDialog(item)">
									<view class="btn-submit">
										<image class="img-upload" src="../../static/img/order/5.png" mode="scaleToFill"></image>
									</view>
									<view class="btn-confirm">
										<image class="img-submit" src="../../static/img/order/1.png" mode="scaleToFill"></image>
										<view class="title">
											提交
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="order-list" v-else>
						
					</view>
				</view>
			</view>
		</mescroll-body>
		//提审弹窗
		<view class="audit-dialog" v-if="isShowDialog">
			<view class="cover" @tap="closeDialog"></view>
			<view class="dialog-content">
				<view class="audit-content">
					<textarea class="audit-textarea" type="text" value="" placeholder="请输入内容" @input="getAuditTextarea" />
					</view>
				<view class="audit-upload">
					<sunUiUpimg @change="getImageInfo" :upload_count="1" :upload_auto="true" ref="upimg" :url="uploadOption.url" :extra="uploadOption.extra"></sunUiUpimg>
				</view>
				<view class="audit-submit" @tap="onSubmit">
					<view class="submit-btn">
						保存
					</view>
				</view>
			</view>
		</view>
		<homeBar :tabIndex="3" />
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import homeBar from '@/components/main/home-bar'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import sunUiUpimg from '@/components/main/sunui-upimg';
	import tuiNoData from "@/components/main/tui-no-data";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				downOption: {},
				upOption: {},
				orderForm: {
					taskStatus: 0,
					current: 1,
					size: 20
				},
				userRecordTabList: [],
				// '任务状态0进行中,1审批中,2完成,-1失败'
				tabList: [{
						name: '未进行',
						value: 0
					},
					{
						name: '审批中',
						value: 1
					},
					{
						name: '完成',
						value: 2
					}, {
						name: '失败',
						value: -1
					}
				],
				uploadOption: {
					extra: {
						type: 'task'
					},
					url: uni.$store.state.prefix + '/api/huoju/app/system/fileUpload'
				},
				submitTaskForm:{ 
					"id":"50006",
					"pngLink1":"上传后的图片地址,",
					"userRemark":"用户说明",
				},
				isShowDialog:false
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onLoad() {
			this.initData()
		},
		components: {
			homeBar,
			sunUiUpimg,
			tuiNoData,
		},
		methods: {
			closeDialog(){
				this.isShowDialog = false
			},
			/*下拉刷新的回调*/
			async downCallback() {
				// 与 mescroll-body 的处理方式一致 > 
				setTimeout(() => {
					this.$refs.mescrollRef.mescroll.resetUpScroll();
				}, 300)
			},
			initData() {
				this.$api.userRecordTabList(this.orderForm).then(res => {
					console.log('orderInfo---->', res)
					this.userRecordTabList = res
				})
			},
			onTab(item) {
				this.orderForm.taskStatus = item.value
				this.initData()
			},
			getImageInfo(data) {
				console.log('getImageInfo------>', data)
				this.submitTaskForm.pngLink1 = data[0] && data[0]['link']
			},
			getAuditTextarea(data){
				console.log('getAuditTextarea----->',data)
				this.submitTaskForm.userRemark = data.detail.value
			},
			onDialog(item){
				this.submitTaskForm.id = item.id
				this.isShowDialog = true
			},
			onSubmit(){
				if(!this.submitTaskForm.userRemark){
					uni.showToast({
						title: '请输入内容',
						icon: "none"
					})
					return
				}
				if(!this.submitTaskForm.pngLink1){
					uni.showToast({
						title: '请上传图片',
						icon: "none"
					})
					return
				}
				this.$api.submitTaskUserRecord(this.submitTaskForm).then(res=>{
					this.isShowDialog = false
					this.submitTaskForm = {}
					this.initData()
				}).catch(err=>{
					this.isShowDialog = false
				})
			}
		}
	}
</script>

<style lang="scss">
	.order-container {
		.order-head {
			.head-content {
				position: relative;
				text-align: center;
				padding-top: 20rpx;

				.img-cover {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 335rpx;
				}

				.head-title {
					position: relative;

					.title {
						font-size: 32rpx;
						color: #fff;
						margin-bottom: 8rpx;
					}

					.sub-title {
						font-size: 24rpx;
						color: #fff;
					}
				}
			}

			.head-tab {
				position: relative;
				padding-top: 120rpx;
				padding-bottom: 40rpx;

				.tab-list {
					display: flex;
					justify-content: center;
					align-items: center;

					.tab-item {
						padding: 5rpx 40rpx 12rpx;
						font-size: 28rpx;
						color: #fff;

						&.active {
							border-bottom: 1rpx solid #fff;
						}
					}
				}
			}

		}

		.order-content {
			.order-list {
				.order-item {
					background-color: #fff;
					border-radius: 20rpx;
					margin: 0 20rpx 20rpx 20rpx;
					width: 710rpx;
					box-sizing: border-box;


					.item-head {
						display: flex;
						justify-content: space-between;
						align-items: center;
						position: relative;
						width: 710rpx;
						height: 50rpx;
						padding: 0 12rpx;
						box-sizing: border-box;

						.img-head {
							position: absolute;
							top: 0;
							left: 0;
							width: 710rpx;
							height: 50rpx;
						}

						.title {
							position: relative;
							font-size: 28rpx;
							color: #fff;
						}

						.btn-del {
							width: 32rpx;
							height: 32rpx;

							.img-del {
								width: 32rpx;
								height: 32rpx;
							}
						}
					}

					.item-content {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 12rpx 24rpx;
						box-sizing: border-box;

						.item-area {
							.item-ll {
								display: flex;
								margin-bottom: 5rpx;
								font-size: 28rpx;
								color: #333;

								.item-dt {}

								.item-dd {}
							}
						}

						.item-submit {
							.btn-submit {
								width: 80rpx;
								height: 80rpx;
								margin: auto;

								.img-upload {
									width: 80rpx;
									height: 80rpx;
									margin: auto;
								}
							}

							.btn-confirm {
								position: relative;
								text-align: center;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								height: 46rpx;
								width: 180rpx;
								margin-top: 20rpx;

								.img-submit {
									position: absolute;
									top: 0;
									left: 0;
									height: 46rpx;
									width: 180rpx;
								}

								.title {
									position: relative;
									font-size: 26rpx;
									color: #30323a;
								}
							}
						}
					}


				}
			}
		}
	}

	.audit-dialog {
		position: fixed;
		bottom: 120rpx;
		left: 0;
		width: 100%;

		.cover {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: #000000;
			opacity: .8;
		}

		.dialog-content {
			position: relative;
			background-color: #fff;
			padding: 20rpx;

			.audit-content {		
				display: flex;
				.audit-textarea {
					flex: 1;
					padding: 12rpx 20rpx;
					border: 1rpx solid #eee;
					border-radius: 12rpx;					
					height: 300rpx;
					display: block;
				}
			}
			.audit-upload {}
			
			.audit-submit {
				.submit-btn{
					width: 180rpx*1.2;
					height: 46rpx*1.2;
					line-height: 46rpx*1.2;
					color: #333333;
					background-image: url(../../static/img/order/1.png);
					background-size: 100%;
					font-size: 28rpx;
					text-align: center;
				}
			}
		}
	}
</style>
