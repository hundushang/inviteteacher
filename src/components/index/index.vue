<template>
  <div class="invite-wrapper">
    <div class="banner-wrapper">
      <div class="time">2017.05.01-2017.07.05</div>
      <router-link class="btn-search" tag="a" to="./prizes">奖励查询</router-link>
    </div>
    <div class="rule-wrapper">
      <div class="title">活动规则</div>
      <div class="content">活动期间，每邀请一名未注册的新老师完成平台新手任务，邀请人获取一张奖券，邀请越多，奖励越丰厚！（新手任务指：平台首次布置作业且至少20名学生完成，完成后可直接获取30元话费）</div>
      <i class="icon-ruletag lefttop"></i>
      <i class="icon-ruletag rightbottom"></i>
    </div>
    <div class="prize-wrapper">
      <div class="title">我的奖券数：{{ticketInfo.surplusNum}} 张</div>
      <div class="time">兑换截止时间：2017.07.05</div>
      <ul class="prizelist" v-if="prizesList.length>0">
        <li v-for="item in prizesList">
          <img class="prizeimg" :src="item.img | fixurl" :alt="item.name">
          <div class="icon-prizetag">
            <span class="text">{{item.ticket}}张奖券</span>
          </div>
          <div class="name">
            {{item.name}}
          </div>
          <a href="javascript:;" class="btn-exchange" v-show="item.ticket<=ticketInfo.surplusNum" @click="exchangeFn(item.id)">立即兑换</a>
          <a href="javascript:;" class="btn-exchange btn-exchange-none" v-show="item.ticket>ticketInfo.surplusNum">立即兑换</a>
        </li>
      </ul>
      <i class="icon-ruletag lefttop"></i>
      <i class="icon-ruletag rightbottom"></i>
    </div>
    <a class="btn-invite" @click="inviteTeacher">邀请老师</a>
    <div class="footer">
      &copy;本活动最终解释权归向上网所有
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Layer from '../../assets/layer/layer'
  export default {
    data () {
        return {
          prizesList: [],
          ticketInfo: {},
          up360: STRUP360
        }
    },
    created () {
      this.$nextTick( () => {
        this.getprizeList()
      })   
    },
    filters: {
      fixurl (url) {
        return 'https://data.up360.com/'+url
      }
    },
    methods: {
      inviteTeacher () {
        let title = this.ticketInfo.teacherName + '老师邀请您来向上网抱走小米电视机、空气净化器、榨汁机！'
        let content = '只要参与，就有奖励！向上网，小学老师教学好帮手！'
        // let url = 'https://www.up360.com/home/teacherInvite/invitedOpen/' + this.ticketInfo.teacherId
        let url = this.inviteInfo.urlLong
        let image = 'https://data.up360.com/'+this.prizesList[this.prizesList.length-1].img
        let param = {
          "title":title,
          "content":content,
          "url":url,
          "image":image,
          "urlShort": this.inviteInfo.urlShort
        };
        var str_param = JSON.stringify(param);
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
          try{
            local_obj.share(str_param);
          }
          catch(err){
            layer.open({
              content: '升级到最新版后才能邀请老师！',
              btn: '我知道了'
            });
          }
        } 
        else if (u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1) {//苹果手机
          try{
            JSObjCActiviNotifiDetail.share(str_param);
          }
          catch(err){
            layer.open({
              content: '升级到最新版后才能邀请老师！',
              btn: '我知道了'
            });
          }
        }else{
          // console.log('PC端不能分享！' + str_param);
        }
      },
      getprizeList () {
        var params = {
          up360: this.up360
        }
        this.$http.post('/home/app/invite/prizes', params).then((response) => {
          if(response.body.state == 1){
            this.prizesList = response.body.data.prizeList
            this.ticketInfo = response.body.data.ticketInfo
            this.inviteInfo = response.body.data.inviteInfo
          }
        })
      },
      exchangeFn (prizeId) {
        var _this = this;
        layer.open({
          content: '您确认兑换该商品吗？'
          ,btn: ['确认兑换', '返回活动']
          ,yes: function(index){
            layer.close(index);
            _this.gotoexchange(prizeId);
          },no: function(index){
            layer.close(index);
          }
        });
      },
      gotoexchange (prizeId) {
        var params = {
          up360: this.up360,
          prizeId: prizeId
        }
        this.$http.post('/home/app/invite/exchange', params).then((response) => {
          if(response.body.state == 1){
            layer.open({
              content: '恭喜您兑换成功！<br>奖品将在15个工作日内联系您发放！',
              btn: '我知道了'
            });
            this.getprizeList();
          }else{
            layer.open({
              content: response.body.msg,
              btn: '我知道了'
            });
          }
        })
      },
      urlParse() {
        var url = window.location.search;
        var obj = {};
        var reg = /[?&][^?&]+=[^?&]+/g;
        var arr = url.match(reg);
        // ['?id=12345', '&a=b']
        if (arr) {
          arr.forEach(function(item){
            var tempArr = item.substring(1).split('=');
            var key = decodeURIComponent(tempArr[0]);
            var val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
          });
        }
        return obj;
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #app{
    width: 100%; overflow-x: hidden;
  }
  .layui-m-layer{
    .layui-m-layercont{
      padding: 30px; color: #666;
    }
    .layui-m-layerbtn{
      border-top: 0; padding: 0 25px; box-sizing: border-box; background: #fff; display: flex;
      span{
        color: #fff; height: 34px; line-height: 34px; font-size: 14px; text-align: center;
        flex: 1;
      }
      span[no]{
        background: #C6C6C6; border-radius: 6px; margin-right: 10px;
      }
      span[yes]{
        background: #55B651; border-radius: 6px; color: #fff;
      }
    }
  }
  .invite-wrapper{
    background: #f6db9f; padding-bottom: 50px;
  }
  .banner-wrapper{
    width: 100%;
    padding-top: 93.33%;
    background: url("../../assets/images/bannerbg.jpg") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .time{
      position: absolute; width: 100%; top: 0;
      left:0;
      color: #cb5b00; text-align: center;
      padding-top: 13.33%; font-size: 15px; line-height: 200%;
    }
    .btn-search{
      position: absolute; top: 16px; right: 15px;
      width: 86px; height:26px; background: #ff9a19;
      border-radius: 13px;
      color: #ffecc8;
      font-size:15px;
      line-height:26px;
      text-align: center;
    }
  }
  .rule-wrapper{
    width: 92%; margin: 0 auto; background: #fff8e9;
    position: relative; border-radius: 5px;
    .title{
      color: #ffa42f; padding: 20px 0 15px; font-size: 20px; line-height: 20px; text-align: center;
    }
    .content{
      color: #333;
      font-size:15px;
      padding: 0 15px 22px 16px;
      line-height: 27px;
    }
  }
  .prize-wrapper{
    width: 92%; margin: 40px auto 0; background: #fff8e9; position: relative; border-radius: 5px;
    .title{
      color: #ffa42f; padding: 25px 0 5px; font-size: 20px; line-height: 26px; text-align: center;
    }
    .time{
      font-size: 15px; color: #333; line-height: 26px; text-align: center;
    }
    .prizelist{
      margin: 20px auto 0; padding: 0 15px; position: relative;
      // display: flex; flex-wrap: wrap; justify-content: space-between;
      li{
        //flex: 0 0 48%; 
        box-sizing: border-box; border: 2px solid #f6da9e; height: 175px; position: relative;
        margin-bottom: 42px; width: 48%; display: inline-block;
        &:nth-child(2n){
          margin-left: 4%;
        }
        img{
          max-width: 98%; max-height: 140px; display: block; margin: 10px auto;
        }
        .name{
          height: 30px; line-height: 30px; text-align: center; color: #ffa42f; display: block; width: 100%; position: absolute;
          bottom: 20px; font-size: 18px;
        }
        .btn-exchange{
          width: 106px; height: 36px; position: absolute; bottom: -20px; left: 50%; margin-left: -53px;
          color: #fff;
          font-size:15px; line-height: 30px; text-align: center;
          background: url("../../assets/images/btn-exchange.png") no-repeat;
          background-size: 100% 100%;
        }
        .btn-exchange-none{
          background-image: url("../../assets/images/btn-exchange-none.png");
        }
        .icon-prizetag{
          width: 48px;
          height: 48px;
          position: absolute; top:-2px; right:-2px;
          background: url("../../assets/images/prizetag.png") no-repeat; background-size: 100% 100%;
          .text{
            display: block; line-height: 48px; text-align: center;
            color: #bc7c29; font-size: 10px; transform: rotate(45deg) translateY(-7px);
          }
        }
      }
    }
  }
  .icon-ruletag{
    position: absolute;width: 56px; height:52px;
    background: url("../../assets/images/ruletag.png") no-repeat; background-size: 100% 100%;
    &.lefttop{
      top:-16px; left:-14px;
    }
    &.rightbottom{
      bottom:-16px; right:-14px;
    }
  }
  .btn-invite{
    position: fixed; width: 100%; bottom: 0; left: 0; background: rgba(255,132,0,.8); height: 50px; text-align: center;
    font-size: 18px; line-height: 50px; color: #fff;
  }
  .footer{
    height: 27px; line-height: 27px; padding: 25px 0; text-align: center;
    color: #c9862f;
    font-size: 15px;
  }
</style>
