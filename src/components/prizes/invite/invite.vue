<template>
  <div class="invite-list">
    <div class="invite-item" v-for="item in inviteList">
    	<div class="text-box">
    		<p class="text">
	    		<span class="title">被邀请人：</span>
	    		<span class="name">{{item.inviteName}}</span>
	    	</p>
	    	<p class="text">
	    		<span class="title">邀请时间：</span>
	    		<span class="name">{{item.inviteTime}}</span>
	    	</p>
	    	<p class="text">
	    		<span class="title">新手任务：</span>
	    		<span class="name" v-if="item.taskFlag==0">未完成</span>
	    		<span class="name" v-if="item.taskFlag==1">已完成</span>
	    	</p>
    	</div>
    	<div class="btn-callother" @click="callOther(item)">喊TA拿话费</div>
    </div>
    <div class="invite-none" v-if="inviteList.length==0">
    	暂无记录
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  	import Layer from '../../../assets/layer/layer'
	export default {
		props: {
			inviteList: {
				type: Array
			}
		},
		data () {
			return {
				up360: STRUP360
			}
		},
		methods: {
			callOther (item) {
				let params = {
					up360: this.up360,
					recvUserId: item.inviteUserId,
					recvUserName: item.inviteName,
					recyMobile: item.inviteMobile
				}
				this.$http.post('/home/app/invite/remind', params).then((response) => {
					if(response.body.state == 1){
						layer.open({
			              content: '发送成功！',
			              btn: '我知道了'
			            });
			        }else{
			        	layer.open({
			              content: response.body.msg,
			              btn: '我知道了'
			            });
			        }
				});
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.invite-list{
		position: relative; margin: 15px 15px 0;
		.invite-item{
			height: 115px; margin-bottom: 15px; display: flex; position: relative; border: 1px solid #e4e4e4;
			border-radius: 5px;
			.text-box{
				flex: 1; padding: 25px 0 0 15px;
				.text{
					height: 22px; line-height: 22px; font-size: 13px; overflow: hidden;
					.title{
						color: #999;
					}
					.name{
						color: #333;
					}
				}
			}
			.btn-callother{
				width: 96px; height: 31px; line-height: 31px; border-radius: 3px; border: 1px solid #ffa42f; margin: 41px 15px 0 10px;
				color: #ffa42f; text-align: center; font-size: 15px;
			}
			.icon-lottery{
				width: 71px; height: 71px; margin: 22px 15px 0 10px; background: url(../../../assets/images/icon-lottery.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.invite-none{
			color: #333; font-size: 15px; text-align: center; padding-bottom: 15px;
		}
	}
</style>
