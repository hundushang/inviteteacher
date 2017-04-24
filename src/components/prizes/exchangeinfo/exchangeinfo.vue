<template>
  <div class="invite-list">
    <div class="invite-item" v-for="item in exchangeList">
    	<div class="text-box">
    		<p class="text">
	    		<span class="title">兑换奖品：</span>
	    		<span class="name">{{item.prizeName}}</span>
	    	</p>
	    	<p class="text">
	    		<span class="title">消耗奖券：</span>
	    		<span class="name">{{item.ticketNum}}</span>
	    	</p>
	    	<p class="text">
	    		<span class="title">兑换时间：</span>
	    		<span class="name">{{item.exchangeTime}}</span>
	    	</p>
    	</div>
    </div>
    <div class="invite-none" v-if="exchangeList.length==0">
    	暂无记录
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			exchangeList: {
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
