<template>
    <div class="update-name">
        <!-- 上方导航栏 -->
        <van-nav-bar title="修改昵称" left-text="取消" right-text="完成" @click-left="$emit('close')"
            @click-right="onConfirm" />
        <van-field class="name-wrap" v-model="localName" rows="2" autosize type="textarea" maxlength="7"
            placeholder="请输入昵称" show-word-limit />
    </div>
</template>

<script>
    import {
        updateUserProfile
    } from '@/api/user';
    export default {
        name: 'upadateName',
        data() {
            return {
                localName: this.value
            }
        },
        props: ['value'],
        methods: {
            async onConfirm() {
                // 请求提交更新昵称
                try {
                    this.$toast('保存中');
                    await updateUserProfile({
                        name: this.localName
                    })
                    this.$toast.success('修改成功');
                    this.$emit('input',this.localName)
                    this.$emit('close');
                } catch (error) {
                    if (error && error.reponse && error.reponse.status === 409) {
                        this.$toast.fail('昵称重复，保存失败！');
                    } else {
                        this.$toast(error.message);
                    }
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .update-name {

        /deep/ .van-nav-bar__content {
            background-color: white !important;

        }

        /deep/ .van-nav-bar__title {
            color: #000 !important;
        }


    }
</style>