<template>
    <div class="article-item">
        <van-cell :to="{name:'article',params:{articleId:article.art_id}}" class="item-container">
            <div slot="title" class="title van-multi-ellipsis--l3">{{article.title}}</div>
            <div slot="label" class="label">
                <!-- 三封面 -->
                <div class="cover-wrapper" v-if="article.cover.type===3">
                    <div class="cover-item" v-for="(img,index) in article.cover.images" :key="index">
                        <van-image :src="img" height="76" fit="cover" />
                    </div>
                </div>
                <!-- 下方的label -->
                <div class="label-wrapper">
                    <span>{{article.aut_name}}</span>
                    <span>{{article.comm_count}}评论</span>
                    <span>{{ article.pubdate | xianduiTime }}</span>
                </div>
            </div>
            <!-- 单封面情况 -->
            <van-image v-if="article.cover.type===1" :src="article.cover.images[0]" width="116" height="73"
                fit="cover" />
        </van-cell>
    </div>
</template>

<script>
    export default {
        name: 'ArticleItem',
        props: {
            article: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped lang="less">
    .article-item {
        .item-container {
            .van-cell__title {
                padding: 3px 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .title {
                font-size: 16px;
                color: #3a3a3a;

            }

            .van-cell__value {
                flex: unset;
                width: 113px;
                height: 76px;
                margin-left: 12px;
            }

            .cover-wrapper {
                padding: 15px 0;
                display: flex;
                flex: 1;
                flex-wrap: nowrap;

                .cover-item {
                    &:not(:last-child) {
                        padding-right: 4px;
                    }

                    width: 100%;
                    height: 76px;
                }
            }

            .label-wrapper {
                font-size: 11px;

                span {
                    margin-left: 12px;
                }
            }
        }
    }
</style>