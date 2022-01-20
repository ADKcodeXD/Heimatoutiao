<template>
    <div class="article-cotainer" ref="article-list">
        <!-- 下拉刷新容器 -->
        <van-pull-refresh 
        v-model="isPullRefresh" 
        :success-text="refreshSuccessText"
        :success-duration="500"
        @refresh="onRefresh">
            <!-- 渲染组件块 -->
            <van-list v-model="loading" 
            :finished="finished" 
            finished-text="没有更多了" 
            @load="onLoad">
                <!-- 单元格结构 -->
                <article-item
                v-for="(item,index) in articles" 
                :key="index"
                :article="item"
                />
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import {getChannelById} from '@/api/article';
    import ArticleItem from '@/components/article-item';
    import {debounce} from 'lodash';
    export default {
        name: 'Articlelist',
        components:{
            ArticleItem
        },
        data() {
            return {
                loading: false,
                finished: false,
                articles: [],
                timestamp: 0,
                isPullRefresh:false,
                refreshSuccessText:''
            }
        },
        activated(){
            this.$refs['article-list'].scrollTop=this.scrollTop
        },
        props: {
            channel: {
                type: Object,
                required: true
            }
        },
        mounted() {
            const articleList = this.$refs['article-list'];
            articleList.onscroll = debounce( () =>{
                this.scrollTop=articleList.scrollTop;
                console.log(this.scrollTop);
            },50)
        },
        methods: {
            async onLoad() {
                // 异步更新数据
                const {
                    data
                } = await getChannelById({
                    channel_id: this.channel.id,
                    timestamp: this.timestamp === 0 ? Date.now() : this.timestamp,
                    with_top:0
                });
                const result = data.data.results;
                this.timestamp = data.data.pre_timestamp || 0;
                result.forEach(item => {
                    this.articles.push(item);
                });
                this.loading = false;
                // 如果请求不到数据了，就结束请求
                if (this.timestamp === 0) this.finished = true;
            },
            // 下拉刷新
            async onRefresh(){
                // 请求获取数据
                // 数据unshift
                const {data} = await getChannelById({
                    channel_id: this.channel.id,
                    timestamp: Date.now(),
                    with_top:0
                });
                const result = data.data.results;
                result.forEach(item => {
                    this.articles.unshift(item);
                });
                this.refreshSuccessText=`更新了${result.length}条数据`;
                this.isPullRefresh=false;
            }
        }
    }
</script>

<style scoped lang="less">
    .article-cotainer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 50px;
        top: 90px;
        overflow-y: auto;
    }
</style>