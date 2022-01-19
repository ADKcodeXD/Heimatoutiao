<template>
    <div class="post">
        <van-field v-model="message" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入评论"
            show-word-limit />
        <van-button 
        @click="onComment"
        :disabled="!message"
        size="small" 
        round class="publish-btn" type="primary" plain>
        发送
        </van-button>
    </div>
</template>

<script>
    import {
        addComment
    } from '@/api/comment';
    export default {
        name: 'postComment',
        data() {
            return {
                message: ''
            }
        },
        props: {
            target: {
                type: [Number, String, Object],
                required: true
            },
            articleId: {
                type: [Number, String, Object],
                default: null
            }
        },
        methods: {
            async onComment() {
                let data=null;
                try {
                    data=await addComment({
                    target: this.target,
                    content: this.message,
                    art_id: this.articleId === null?null:this.articleId
                })
                } catch (error) {
                    this.$toast(error.message)
                }
                this.$emit('post-success',{idObj:data.data.data,content:this.message});
                this.$toast.success('发布成功！');
                this.message='';
            }
        },
    }
</script>

<style lang="less">
    .post {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;

        .publish-btn {
            font-size: 12px;
            width: 48px;
            height: 24px;
        }
    }
</style>