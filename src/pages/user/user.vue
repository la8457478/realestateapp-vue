<template xmlns="http://www.w3.org/1999/html">
    <div>
        <div></div>
        <table width="100%" height="100%">
            <tr>
                <td align="center" width="100%">
                    <mu-button v-if="!hasLogin" @click="bindLogin" color="primary">登陆</mu-button>
                    <mu-button v-if="hasLogin" color="primary" @tap="bindLogout">退出登录</mu-button>
                </td>
            </tr>
        </table>

        <!--<div class="btn-row">-->
        <!--<mu-button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin" color="primary">登录</mu-button>-->

        <!--<mu-button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin" @tap="bindLogout">退出登录</mu-button>-->
        <!--</div>-->
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        computed: {
            ...mapState(['hasLogin', 'forcedLogin'])
        },
        methods: {
            ...mapMutations(['logout']),
            openVn() {
                const h = this.$createElement;
                this.$message({
                    message: h('p', null, [
                        h('span', null, '内容可以是 '),
                        h('i', {style: 'color: teal'}, 'VNode')
                    ])
                });
            },
            bindLogin() {
                // this.$router.push({path: '/login/login?url=' + this.$route.path});
                // window.location.href = "#/login/login";
                // next({
                //     path: '/login/login'
                //     // query: { redirect: to.fullPath }//把要跳转的地址作为参数传到下一步
                // });
                // uni.navigateTo({
                //     url: '../login/login',
                // });
            },
            bindLogout() {
                this.logout();
                /**
                 * 如果需要强制登录跳转回登录页面
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../login/login',
                    });
                }
            }
        }
    }
</script>

<style>

</style>
