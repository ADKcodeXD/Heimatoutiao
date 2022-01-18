<template>
    <div class="search-container">
        <!-- 顶部搜索输入框 -->
        <form action="/">
            <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch(searchText)"
                @focus="isResultShow=false" @cancel="$router.back()" />
        </form>

        <!-- 搜索结果 -->
        <search-result :searchText="searchText" v-if="isResultShow">
        </search-result>

        <!-- 联想建议 -->
        <search-suggestion @search="onSearch" :searchText="searchText" v-else-if="searchText">
        </search-suggestion>

        <!-- 历史记录 -->
        <search-history
        @update-history="searchHistory = $event"
        @search="onSearch"
        :searchHistory="searchHistory"
        v-else>
        </search-history>
    </div>
</template>

<script>
    import {Toast} from 'vant';
    import {mapState} from 'vuex'
    import {getUserHistory} from '@/api/search'
    import {setItem,getItem} from '@/utils/storage'
    import searchSuggestion from './components/search-suggestion.vue';
    import SearchHistory from './components/search-history.vue';
    import SearchResult from './components/search-result.vue';
    export default {
        components: {
            searchSuggestion,
            SearchHistory,
            SearchResult
        },
        name: 'search',
        data() {
            return {
                searchText: '',
                isResultShow: false,
                searchHistory: []
            };
        },
        mounted() {
            this.getHistory();
        },
        computed:{
            ...mapState(['user'])
        },
        methods: {
            onSearch(searchText) {
                this.searchText = searchText;
                // 触发搜索 进行持久化搜索历史
                const index=this.searchHistory.indexOf(searchText);
                // 防止重复加入
                if(index!==-1){
                    this.searchHistory.splice(index,1);
                }
                // 纪录搜索历史
                this.searchHistory.unshift(searchText);
                // // 未登录- 放到localstorage中
                // setItem('searchHistory',this.searchHistory);
                // 登录后 每次搜索 后端会自动纪录搜索历史
                // 展示搜索结果
                this.isResultShow = true;
            },
            async getHistory(){
                // 后端只存储了4条历史记录
                // 合并后端返回的历史记录和本地的历史记录
                // let searchHitory=[];
                // let userSearchHistory=[];
                this.searchHistory=getItem('searchHistory')||[];
                // if(this.user){
                //     const{data}=await getUserHistory();
                //     userSearchHistory=data.data.keywords;
                // }
                // if(localHistory){
                //     searchHitory=[...new Set([...localHistory,...userSearchHistory])];
                // }else{
                //     searchHitory=userSearchHistory;
                // }
                // this.searchHistory=searchHitory;
            }
        },
        watch:{
            // 通过watch统一处理history
            searchHistory:{
                isDeep:true,
                handler(){
                    setItem('searchHistory',this.searchHistory);
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .search-container {}
</style>