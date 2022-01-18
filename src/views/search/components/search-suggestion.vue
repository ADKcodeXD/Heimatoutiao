<template>
    <div class="searchsuggestion-container">
        <van-cell-group>
            <van-cell v-for="suggestion,index in searchSuggestList" :key="index" icon="search" @click="search(suggestion)">
                <div slot="title" v-html="hightlight(suggestion)"></div>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    import {
        getSuggestion
    } from '@/api/search';
    import {
        debounce
    } from 'lodash'
    export default {
        name: 'searchSuggestion',
        props: ['searchText'],
        methods: {
            hightlight(suggestion){
                if(suggestion){
                    const reg=new RegExp(this.searchText,'gi');
                return suggestion.replace(reg,`<span style="color:red;">${this.searchText}</span>`)
                }else{
                    return suggestion;
                }
            },
            search(suggestion){
                this.$emit('search',suggestion)
            }
        },
        data() {
            return {
                searchSuggestList: []
            }
        },
        watch: {
            searchText: {
                immediate: true,
                handler: debounce(async function () {
                    const {
                        data
                    } = await getSuggestion(this.searchText);
                    this.searchSuggestList = data.data.options;
                }, 300)
            }
        }
    }
</script>

<style scoped lang="less">

</style>