<template>
  <div class="invite-list">
    <div class="invite-item" v-for="item in ticketList">
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
	    		<span class="name">已完成</span>
	    	</p>
    	</div>
    	<div class="icon-lottery"></div>
    </div>
    <div class="invite-none" v-if="ticketList.length==0">
    	暂无记录
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			ticketList: {
				type: Array
			}
		},
		data () {
			return {

			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	
</style>
