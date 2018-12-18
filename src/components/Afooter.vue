<template lang="html">
  <div class="footer">

    <div class="footer_box">

      <div class="footer_list" v-for="(item,index) in footerList" @click="selectNav(index)">
        <div class="footer_list_box">
          <div class="footer_list_box_img">
            <img :src="inds==index?item.selected:item.before" alt="">
          </div>
          <div class="footer_list_box_name" v-html="item.name"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Afooter',
  data(){
    return{
      inds:0,
      footerList:[
        {
          before:'../../static/footer/home01.png',
          selected:'../../static/footer/home02.png',
          name:'首页'
        },
        {
          before:'../../static/footer/user01.png',
          selected:'../../static/footer/user02.png',
          name:'我的'
        },
      ]
    }
  },
  methods:{
    selectNav(index){
      switch (index) {
        case 0:
          this.$router.push({ name: 'main'})
          break;
        case 1:
          this.$router.push({ name: 'user'})
          break;
      }
      this.$emit('getTitle', this.footerList[index].name)
      this.inds = index

    }
  }
}
</script>

<style lang="less">
.footer_box{
  position: fixed;
  bottom:0;
  width: 100%;
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 1px 1px 10px rgba(0,0,0,.12);
  .footer_list{
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .footer_list_box{
      .footer_list_box_img{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          height: 1.8rem;
          width: 1.8rem;
        }
      }
      .footer_list_box_name{
        padding-top: .3rem;
        width: 100%;
        text-align: center;
        font-size: .6rem
      }
    }
  }
}
</style>
