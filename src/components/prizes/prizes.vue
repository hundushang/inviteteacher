<template>
  <div class="invite-info">
    <div class="info-wrapper">
    	<div class="title">我的奖券</div>
    	<ul class="numlist">
    		<li>
    			<span class="number">{{ticketInfo.totalNum}}</span>
    			<span class="text">已获得</span>
    		</li>
    		<li>
    			<span class="number">{{ticketInfo.totalNum-ticketInfo.surplusNum}}</span>
    			<span class="text">已兑换</span>
    		</li>
    		<li>
    			<span class="number">{{ticketInfo.surplusNum}}</span>
    			<span class="text">剩余数</span>
    		</li>
    	</ul>
    </div>
    <div class="info-tips">
    	被邀请人在 2017-07-05 之前完成新手任务 <br>邀请人可获得一张奖券，被邀请人则直接获取30元话费
    </div>
	<div class="tab-wrapper">
      <div class="tab-item">
        <router-link tag="a" to="invite">已邀请</router-link>
      </div>
      <div class="tab-item">
        <router-link tag="a" to="success">已成功</router-link>
      </div>
      <div class="tab-item">
        <router-link tag="a" to="exchangeinfo">兑换记录</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :inviteList="inviteList" :ticketList="ticketList" :exchangeList="exchangeList"></router-view>
    </keep-alive>
     <router-link class="btn-backtoindex" tag="a" to="../index">返回活动页</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				ticketInfo: {
					surplusNum: 0,
            		totalNum: 0
				},
				inviteList: [],
				ticketList: [],
				exchangeList: [],
          		up360: STRUP360
			}
		},
		created () {
		  this.$nextTick( () => {
	        var params = {
	          up360: this.up360
	        }
	        this.$http.post('/home/app/invite/info', params).then((response) => {
	          if(response.body.state == 1){
	            this.ticketInfo = response.body.data.ticketInfo
	            this.inviteList = response.body.data.inviteList
	            this.ticketList = response.body.data.ticketList
	            this.exchangeList = response.body.data.exchangeList
	          }
	        })
	      })
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.invite-info{
		 padding-bottom: 50px; min-height: 100%; box-sizing: border-box;
	}
	.info-wrapper{
		height: 130px;
		background:#ffc76f; 
	    background:-moz-linear-gradient(top,#feaa2e,#ffc76f);
	    background:-webkit-gradient(top,#feaa2e,#ffc76f);
	    background:-o-linear-gradient(top,#feaa2e,#ffc76f);
		background: -webkit-linear-gradient(top,#feaa2e,#ffc76f);
		.title{
			padding: 15px 0 0 15px; color: #d46700; font-size: 15px; line-height: 20px;
		}
		.numlist{
			margin: 15px 43px 0; display: flex;
			li{
				flex: 1; color: #fff; text-align: center;
				position: relative;
			  	&:after{
			  		position: absolute;
				    right: 0;
				    top: 0;
				    height: 100%;
				    border-right: 1px solid rgba(255,212,145,1);
				    content: '';
			  	}
				&:last-child:after{
					border-right: 0;
				}
				span{
					display: block;
				}
				.number{
					font-size: 30px;
				}
				.text{
					font-size: 15px; margin-top: 9px;
				}
			}
		}
	}
	.info-tips{
		padding: 20px 15px; line-height: 21px; font-size: 13px;
	}
	.tab-wrapper{
		margin: 0 15px; display: flex; border: 1px solid #ffa42f; border-radius: 4px; height: 30px; line-height: 30px;
		.tab-item{
			flex: 1; border-right: 1px solid #ffa42f; text-align: center; line-height: 30px; height: 30px;
			&:last-child{
				border-right: 0;
			}
			a{
				display: block; height: 30px;  color: #ffa42f;
				&.active{
					background: #ffa42f; color: #fff;
				}
			}
		}
	}
	.btn-backtoindex{
		position: fixed; width: 100%; bottom: 0; left: 0; background: rgba(255,132,0,.8); height: 50px; text-align: center;
		font-size: 18px; line-height: 50px; color: #fff;
	}
</style>
