<template>
    <div class="search-history">
        <van-cell-group>
            <!-- 顶部区 -->
            <van-cell title="搜索历史">
                <div v-if="isDeleteShow">
                    <span @click="$emit('update-history',[])">全部删除</span>
                    &nbsp;
                    <span @click="isDeleteShow=false">完成</span>
                </div>
                <van-icon name="delete" @click="isDeleteShow=true" v-else />
            </van-cell>

            <!-- 内容区 -->
            <van-cell @click="search(item)" v-for="item,index in searchHistory" :key="index" :title="item">
                <van-icon @click.stop="onDeleteHistory(index)" v-if="isDeleteShow" name="close" />
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>

// import {setItem} from '@/utils/storage';
    export default {
        name: 'searchHistory',
        data() {
            return {
                isDeleteShow: false,
            }
        },
        props: ['searchHistory'],
        methods: {
            onDeleteHistory(index) {
                if (this.isDeleteShow) {
                    this.searchHistory.splice(index, 1);
                    // setItem('searchHistory',this.searchHistory);
                } else {
                    return
                }
            },
            search(item) {
                this.$emit('search', item)
            }
        },
    }
</script>

<style scoped lang="less">
    .search-history {
        /deep/ .van-cell-group {
            .v-cell {
                justify-content: space-between !important;
            }

            .van-cell__value {
                display: flex;
                flex: unset !important;
                align-items: center;
                justify-content: center;
                margin-left: 10px;
            }
        }
    }
</style>