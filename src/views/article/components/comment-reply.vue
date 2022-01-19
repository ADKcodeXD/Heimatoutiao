<template>
    <div class="comment-reply">
        <van-nav-bar title="标题" left-text="返回" @click-left="$emit('close')" left-arrow>
            <van-icon name="close" slot="left" />
        </van-nav-bar>
        <comment-item :comment="comment">
        </comment-item>

        <van-cell title="全部回复" />
        <comment-list :list="replyList" :source="comment.com_id" type="c">

        </comment-list>

        <div class="bottom-content">
            <van-button @click="isPostShow=true" 
            type="default" 
            class="comment-btn" 
            round size="medium">
                写评论
            </van-button>
        </div>

        <!-- 弹出层 -->
        <!-- 发布评论区 -->
        <van-popup v-model="isPostShow" position="bottom">
            <post-comment 
            @post-success="onPostSuccess" 
            :target="comment.com_id"
            :articleId="articleId"
            ></post-comment>
        </van-popup>
    </div>
</template>

<script>
import commentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import PostComment from './post-comment.vue'
    export default {
        components: { commentItem, CommentList, PostComment },
        name: 'commentReply',
        data() {
            return {
                isPostShow:false,
                replyList:[]
            }
        },
        props:{
            comment:{
                type:[Object],
                required:true
            },
            articleId:{
                type:[Number,String,Object],
                required:true
            }
        },
        methods: {
            onPostSuccess(comment){
                // 将发布成功的评论 放到评论列表顶部
                this.isPostShow=false;
                this.comment.reply_count++;
                this.replyList.unshift(comment)
            }
        },
    }
</script>

<style lang="less" scoped>
    .comment-reply {
        /deep/ .van-nav-bar__content {
            background-color: white !important;

        }

        /deep/ .van-nav-bar__title {
            color: #000 !important;
        }


        .bottom-content {
            position: fixed;
            flex: 1;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            padding: 5px;
            bottom: 0;
            left: 0;
            right: 0;
            height: 33px;
            background-color: white;

            .comment-btn {
                width: 300px;
                height: 30px;
                font-size: 15px;
            }
        }

    }
</style>