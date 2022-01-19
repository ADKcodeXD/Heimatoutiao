<template>
    <div class="commen-list">
        <van-list  v-model="loading" :finished="finished" :finished-text="commentList.length==0?'':'只有这么多评论啦~'" @load="onLoad">
            <van-empty v-if="commentList.length==0" description="暂时没有评论哦~ 快来发表第一条评论" />
            <comment-item @Reply="$emit('Reply',$event)"  v-for="item,index in commentList" :key="index" :comment="item">
            </comment-item>
        </van-list>
    </div>
</template>

<script>
    import {
        getCommentList
    } from '@/api/comment';
    import {getUserInfo} from '@/api';
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
            },
            list:{
                type:[Array],
                default:()=>[]
            },
            type:{
                type:[String],
                default:'a'
            }
        },
        methods: {
            async onLoad() {
                // 异步更新数据
                const {
                    data
                } = await getCommentList({
                    type: this.type,
                    source: this.source.toString(),
                    offset: this.offset,
                    limit: this.limit
                });
                const {
                    results,
                    last_id
                } = data.data
                this.commentList.push(...results) ;
                this.$emit('update-commentLength',this.commentList.length)
                this.offset = last_id;
                this.loading = false;
                if (results.length == 0) {
                    
                    this.finished = true;
                }
            },
            async addComment(){

            }
        },
        watch:{
            list:{
                isDeep:true,
                async handler(){
                    const{idObj,content}=this.list[0];
                    const{data}=await getUserInfo();
                    console.log(data);
                    console.log(idObj);
                    let newComment={
                        com_id:idObj.com_id,
                        aut_id:data.data.id,
                        aut_name:data.data.name,
                        aut_photo:data.data.photo,
                        like_count:0,
                        reply_count:0,
                        pubdate:Date.now(),
                        content:content,
                        is_top:0,
                        is_liking:false
                    }
                    this.commentList.unshift(newComment);
                }
            }
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