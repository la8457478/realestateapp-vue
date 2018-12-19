<template>
    <mu-form>
        <mu-text-field v-model="username" label="账号" label-float help-text="用户名为6-12长度的字符"
                       icon="account_circle"></mu-text-field>
        <br/>
        <mu-text-field v-model="password" label="密码" label-float help-text="密码为6-12长度的字符" icon="locked"></mu-text-field>
        <br/>

    </mu-form>
    <!--<div class="content">-->
    <!--<div class="input-group">-->
    <!--<div class="input-row border">-->
    <!--<text class="title">账号：</text>-->
    <!--<input type="text" v-model="account" placeholder="请输入账号">-->
    <!--</div>-->
    <!--<div class="input-row border">-->
    <!--<text class="title">密码：</text>-->
    <!--<input type="text" password="true" v-model="password" placeholder="请输入密码">-->
    <!--</div>-->
    <!--<div class="input-row">-->
    <!--<text class="title">邮箱：</text>-->
    <!--<input type="text" v-model="email" placeholder="请输入邮箱">-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="btn-row">-->
    <!--<button type="primary" class="primary" @tap="register">注册</button>-->
    <!--</div>-->
    <!--</div>-->
</template>

<script>

    import MuForm from "muse-ui/es5/Form/Form";
    import MuTextField from "muse-ui/es5/TextField/TextField";

    export default {
        components: {
            MuTextField,
            MuForm
        },
        data() {
            return {
                account: '',
                password: '',
                email: ''
            }
        },
        methods: {
            register() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                if (this.account.length < 5) {
                    uni.showToast({
                        icon: 'none',
                        title: '账号最短为 5 个字符'
                    });
                    return;
                }
                if (this.password.length < 6) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法'
                    });
                    return;
                }

                const data = {
                    account: this.account,
                    password: this.password,
                    email: this.email
                }
                service.addUser(data);
                uni.showToast({
                    title: '注册成功'
                });
                uni.navigateBack({
                    delta: 1
                });
            }
        }
    }
</script>

<style>

</style>
