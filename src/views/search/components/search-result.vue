<template>
    <div class="search-result">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <article-item v-for="(article,index) in list" :key="index" :article="article" />
        </van-list>
    </div>
</template>

<script>
    import {
        getSearchResult
    } from '@/api/search';
    import ArticleItem from '@/components/article-item';
    export default {
        name: 'searchResult',
        components:{
            ArticleItem
        },
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                page: 1,
                per_page: 10,
            }
        },
        props: ['searchText'],
        methods: {
            async onLoad() {
                // 异步更新数据
                const {
                    data
                } = await getSearchResult({
                    page: this.page,
                    per_page: this.per_page,
                    q: this.searchText
                })
                const {results} = data.data;
                console.log(results);
                this.list.push(...results);

                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if(results.length){
                    this.page++
                }else{
                    this.finished=true;
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .search-result {
        position: fixed;
        right: 0;
        left: 0;
        bottom: 0;
        top: 54px;
        overflow-y: auto;
    }
</style>