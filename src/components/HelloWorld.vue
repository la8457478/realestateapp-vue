<template>
  <div class="hello">
    <mu-container ref="container">
      <mu-load-more @refresh="refresh" :refreshing="refreshing" >
    <h1>{{ msg }}</h1>
      <mu-flex justify-content="between" align-items="end" wrap="wrap">
    <mu-paper :z-depth="1" class="demo-date-picker">
      <mu-date-picker :date.sync="date"></mu-date-picker>
    </mu-paper>
  </mu-flex>
    <mu-tabs :value.sync="active">
      <mu-tab>TAB ITEM 1</mu-tab>
      <mu-tab>TAB ITEM 2</mu-tab>
      <mu-tab>TAB ITEM 3</mu-tab>
    </mu-tabs>
    <div class="demo-text" v-if="active === 0">
      <p>“……是的，我承认从很早以前我都害怕死亡，在医院里被人研究的时候，以前做出布局的时候，其实我很怕死的，因为除了死以外，我没有值得珍惜的东西，很奇怪是吧？恰好是这样我真的很怕死，因为我想要有值得珍惜的东西之后，死亡之后才会不寂寞，我才能够安然的面对死亡……”</p>
    </div>
    <div class="demo-text" v-if="active === 1">
      <p>“我的心从来没有这么坚定过，所以我会为了补偿而死，也可以为了补偿而死……一辈子，急辈子都无所谓，我绝不后退！”</p>
      <p>“如果我后退呢？如果我想要死呢？我不想你再次背对着我逃跑了……”</p>
      <p>“那么就去地狱找到你，我绝对不逃！”</p>
      <p>“白痴，你也哭了？因为那些软弱拖累你的脚步？”</p>
    </div>
    <div class="demo-text" v-if="active === 2">
      <p>“不，这泪水……是因为勇气，因为力量，因为信任，……你不会懂的！”</p>
      <p>“我不会帮你，想要什么样的未来……自己去追寻吧！”</p>
      <p>“我不需要你的帮忙！未来我会一手开启，什么样的敌人我也不会惧怕……还有，其实我们可以成为朋友的……”</p>
      <p>“也许吧，未来……给你了。”</p>
    </div>
    <div class="demo-picker-container">
      <mu-slide-picker :slots="addressSlots" :visible-item-count="7" @change="addressChange" :values="address"></mu-slide-picker>
      <p>
        您选择的城市是： {{addressProvince}} {{addressCity}}
      </p>
    </div>
      </mu-load-more>
  </mu-container>

  </div>
</template>

<script>
import { Icon,Actionsheet } from 'vux';
const address = {
  '北京': ['北京'],
  '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
  '上海': ['上海'],
  '天津': ['天津'],
  '重庆': ['重庆'],
  '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
  '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
  '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
  '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
  '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
  '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
  '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
  '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
  '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
  '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
  '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
  '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
  '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
  '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
  '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
  '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
  '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
  '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
  '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
  '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
  '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
  '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
  '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
  '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
  '香港': ['香港'],
  '澳门': ['澳门'],
  '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
}
export default {
  components: {
    Icon,Actionsheet
  },
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      active: 0,
      date: undefined,
      time: undefined,
      landscape: false,
      display: true,
      type: 'ampm',
      viewType: 'clock',
      refreshing: false,
      loading: false,
      addressSlots: [
        {
          width: '100%',
          textAlign: 'right',
          values: Object.keys(address)
        }, {
          width: '100%',
          textAlign: 'left',
          values: ['北京']
        }
      ],
      address: ['北京', '北京'],
      addressProvince: '北京',
      addressCity: '北京'
    }
  },
  mounted:function () {
    if(this.global.isApp){
      this.init()

    }


  },
  methods:{
    refresh:function(){
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        this.text = this.text === 'List' ? 'Menu' : 'List';
        this.num = 10;
      }, 2000)
    },
    addressChange:function(value, index) {
      switch (index) {
        case 0:
          this.addressProvince = value
          const arr = address[value]
          this.addressSlots[1].values = arr
          this.addressCity = arr[0]
          break
        case 1:
          this.addressCity = value
          break
      }
      this.address = [this.addressProvince, this.addressCity]
    },
    init:function(){
      var NVTabBar = api.require('NVTabBar');
NVTabBar.open({
    styles: {
        bg: '#333',
        //bg:"widget://image/NVTabBar/tabbar_bg.png",
        h: 65,
        dividingLine: {
            width: 0,
            color: '#000'
        },
        badge: {
            bgColor: '#fff',
            numColor: '#fff',
            size: 6.0,
            centerX: 40,
            centerY: 6
        }
    },
    items: [{
        w: api.winWidth / 5.0,
        bg: {
            marginB: 0,
            image: '#fff'
        },
        iconRect: {
            w: 25.0,
            h: 25.0,
        },
        icon: {
            normal: 'widget://image/NVTabBar/acti.png',
            highlight: 'widget://image/NVTabBar/actied.png',
            selected: 'widget://image/NVTabBar/actied.png'
        },
        title: {
            text: '动态',
            size: 12.0,
            normal: '#696969',
            selected: '#eb4f38',
            marginB: 6.0
        }
    }, {
        w: api.winWidth / 5.0,
        bg: {
            marginB: 0,
            image: 'rgba(200,200,200,0.7)'
        },
        iconRect: {
            w: 25.0,
            h: 25.0,
        },
        icon: {
            normal: 'widget://image/NVTabBar/guan.png',
            highlight: 'widget://image/NVTabBar/guaned.png',
            selected: 'widget://image/NVTabBar/guaned.png'
        },
        title: {
            text: '发现',
            size: 12.0,
            normal: '#696969',
            selected: '#eb4f38',
            marginB: 6.0
        }
    }, {
        w: api.winWidth / 5.0,
        bg: {
            marginB: 10,
            image: 'widget://image/NVTabBar/yyuan.png' //中间背景图
        },
        iconRect: {
            w: 32,
            h: 32,
        },
        icon: {
            normal: 'widget://image/NVTabBar/mai.png',
            highlight: 'widget://image/NVTabBar/mai.png',
            selected: 'widget://image/NVTabBar/mai.png'
        },
        title: {
            //text : '333',
            size: 0.0,
            normal: '#696969',
            selected: '#eb4f38',
            marginB: 0
        }
    }, {
        w: api.winWidth / 5.0,
        bg: {
            marginB: 0,
            image: 'rgba(200,20,0,0.6)'
        },
        iconRect: {
            w: 25.0,
            h: 25.0,
        },
        icon: {
            normal: 'widget://image/NVTabBar/fav.png',
            highlight: 'widget://image/NVTabBar/faved.png',
            selected: 'widget://image/NVTabBar/faved.png'
        },
        title: {
            text: '消息',
            size: 12.0,
            normal: '#696969',
            selected: '#eb4f38',
            marginB: 6.0
        }
    }, {
        w: api.winWidth / 5.0,
        bg: {
            marginB: 0,
            image: 'rgba(220,0,220,0.7)'
        },
        iconRect: {
            w: 25.0,
            h: 25.0,
        },
        icon: {
            normal: 'widget://image/NVTabBar/bir.png',
            highlight: 'widget://image/NVTabBar/bired.png',
            selected: 'widget://image/NVTabBar/bired.png'
        },
        title: {
            text: '我的信息',
            size: 12.0,
            normal: '#696969',
            selected: '#eb4f38',
            marginB: 6.0
        }
    }],
    selectedIndex: 0
}, function(ret, err) {

});

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container {
    width: 100%;
    padding-right: 8px;
    padding-left: 8px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.align-items-end{
  display: flex !important;
  justify-content: center !important;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
