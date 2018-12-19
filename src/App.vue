<template>
  <div id="app">
    <Atitle :Title="title"></Atitle>
    <mu-container ref="container">
      <mu-load-more @refresh="refresh" :refreshing="refreshing" >
    <router-view/>
  </mu-load-more>
  </mu-container>
    <Afooter v-if="!this.global.isApp" @getTitle="getTitle"></Afooter>
  </div>
</template>

<script>
import Atitle from '@/components/Atitle';
import Afooter from '@/components/Afooter';
export default {
  name: 'App',
  components:{
    Atitle,Afooter
  },
  data(){
    return{
      refreshing: false,
      title:"首页"
    }
  },
  mounted:function () {
    if(this.global.isApp){
      this.apptabar()
    }````````````````
  },
  methods:{
    refresh(){
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        this.text = this.text === 'List' ? 'Menu' : 'List';
        this.num = 10;
      }, 2000)
    },
    getTitle(title){
      this.title = title
    },
    apptabar(){
      var NVTabBar = api.require('NVTabBar')
      NVTabBar.open({
          styles: {
              bg: '#fff',
              h: 60,
              dividingLine: {
                  width: 1,
                  color: '#efefef'
              },
              badge: {
                  bgColor: '#ff0',
                  numColor: '#fff',
                  size: 6.0,
                  centerX: 40,
                  centerY: 6
              }
          },
          items: [{
              w: api.winWidth / 5.0,
              bg: {
                  marginB: -2,
                  image: '#fff'
              },
              iconRect: {
                  w: 25.0,
                  h: 25.0,
              },
              icon: {
                  normal: 'widget://static/footer/home01.png',
                  highlight: 'widget://static/footer/home02.png',
                  selected: 'widget://static/footer/home02.png'
              },
              title: {
                  text: '首页',
                  size: 11.0,
                  normal: '#666666',
                  selected: '#000',
                  marginB: 6.0
              }
          }, {
              w: api.winWidth / 5.0,
              bg: {
                  marginB: -2,
                  image: '#fff'
              },
              iconRect: {
                  w: 25.0,
                  h: 25.0,
              },
              icon: {
                  normal: 'widget://static/footer/user01.png',
                  highlight: 'widget://static/footer/user02.png',
                  selected: 'widget://static/footer/user02.png'
              },
              title: {
                  text: '个人信息',
                  size: 11.0,
                  normal: '#666666',
                  selected: '#000',
                  marginB: 6.0
              }
          }],
          selectedIndex: 0
      }, (ret, err)=>{
          NVTabBar.bringToFront()
          switch (ret.index) {
            case 0:
              this.title = "首页"
              this.$router.push({ name: 'home'})
              break;
            case 1:
            this.title = "我的信息"
              this.$router.push({ name: 'user'})
              break;
          }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 70px
}
</style>
