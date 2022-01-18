<template>
    <div class="commen-list">
        <div class="title">全部评论</div>
        
        <van-list  v-model="loading" :finished="finished" finished-text="只有这么多评论啦~" @load="onLoad">
            <van-empty v-if="commentList.length==0" description="暂时没有评论哦~ 快来发表第一条评论" />
            <comment-item  v-for="item,index in commentList" :key="index" :comment="item">
            </comment-item>
        </van-list>
    </div>
</template>

<script>
    import {
        getCommentList
    } from '@/api/comment'
    import commentItem from './comment-item.vue'
    export default {
        components: {
            commentItem
        },
        name: 'commentList',
        data() {
            return {
                commentList: [],
                loading: false,
                finished: false,
                limit: 10,
                offset: null
            }
        },
        props: {
            source: {
                type: [Number, String, Object],
                required: true
            }

        },
        methods: {
            async onLoad() {
                // 异步更新数据
                const {
                    data
                } = await getCommentList({
                    type: 'a',
                    source: this.source,
                    offset: this.offset,
                    limit: this.limit
                });
                const {
                    results,
                    last_id
                } = data.data
                this.commentList.push(...results) ;
                this.offset = last_id;
                this.loading = false;
                if (results.length == 0) {
                    this.finished = true;
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .title {
        font-size: 20px;
        padding: 10px;
        color: #222222;
    }
</style>