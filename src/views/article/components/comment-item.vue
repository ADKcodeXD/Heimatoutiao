<template>
    <div class="comment-item">
        <van-cell-group>
            <van-cell :border="false">
                <van-image class="left-img" :src="comment.aut_photo" fit="cover" round slot="icon" />
                <div slot="title" class="base-info">
                    <div class="up">
                        <span class="name">
                            {{comment.aut_name}}
                        </span>
                        <div @click="onLike" :class="comment.is_liking?'like':''" class="good">
                            <van-icon   :name="comment.is_liking?'good-job':'good-job-o'" />
                            <span>{{comment.like_count}}</span>
                        </div>
                    </div>
                    <div class="content">{{comment.content}}</div>
                    <div class="bottom">
                        <span class="time">{{comment.pubdate | dateTime}}</span>
                        <van-button @click="$emit('Reply',comment)" class="recomment" type="primary" size="mini" round>回复</van-button>
                    </div>
                </div>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
import {delikeComment,likeComment} from '@/api/comment'
    export default {
        name: 'commentItem',
        data() {
            return {
                
            }
        },
        props: {
            comment: {
                type: Object,
                required: true
            }
        },
        methods: {
            async onLike() {
                const commentId=this.comment.com_id;
                if(this.comment.is_liking){
                    await delikeComment(commentId);
                    this.comment.like_count--
                }else{
                    await likeComment(commentId);
                    this.comment.like_count++
                }
                this.comment.is_liking=!this.comment.is_liking;
            }
        },
    }
</script>

<style lang="less" scoped>
.like{
    color:rgb(255, 16, 56);
    
}
    .comment-item {
        .left-img {
            width: 35px;
            height: 35px;
        }

        .base-info {
            margin-left: 13px;

            .up {
                display: flex;
                justify-content: space-between;

                .name {
                    font-size: 13px;
                    color: #406599;
                }
            }


            .content {
                font-size: 16px;
                color: #222222;
            }

            .bottom {
                display: flex;

                .time {
                    font-size: 10px;
                }

                .recomment {
                    margin-left: 20px;
                    background-color: #f4f5f6;
                    color: #222222;
                    border: none;
                    width: 68px;
                    height: 24px;
                }
            }
        }
    }
</style>