<template>
    <div class="content">
        <div class="input-group">
            <div class="input-row">
                <text class="title">邮箱：</text>
                <input type="text" v-model="email" placeholder="请输入邮箱">
            </div>
        </div>

        <div class="btn-row">
            <button type="primary" class="primary" @tap="findPassword">提交</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: ''
            }
        },
        methods: {
            findPassword() {
                /**
                 * 仅做示例
                 */
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法',
                    });
                    return;
                }
                uni.showToast({
                    icon: 'none',
                    title: '已发送重置邮件至注册邮箱，请注意查收。',
                    duration: 3000
                });
            }
        }
    }
</script>

<style>

</style>
