<template>
    <div class="article-cotainer">
        <van-nav-bar title="文章" left-arrow @click-left="$router.back()" />
        <!-- 内容区 -->
        <div class="content-wrap">
            <h1 class="title">{{article.title}}</h1>

            <van-cell class="user-info">
                <van-image class="user-avatar" :src="article.aut_photo" round fit="cover" slot="icon" />
                <div slot="title" class="user-name">{{article.aut_name}}</div>
                <div slot="label" class="time">{{article.pubdate | xianduiTime}}</div>
                <van-button @click="onFollow" :type="article.is_followed?'default':'info'" icon="plus"
                    class="follow-button" round :loading="isFollowLoding" size="small">
                    {{article.is_followed?'已关注' : '关注'}}</van-button>
            </van-cell>
            <div ref="article-content" class="content markdown-body" v-html="article.content">
            </div>
            <van-divider>文章到这里结束啦~</van-divider>
            <div class="title">全部评论</div>
            <!-- 评论区 -->
            <comment-list @Reply="onReplyClick" @update-commentLength="totalCommentCount=$event" :list="commentList"
                :source="article.art_id" v-if="child">
            </comment-list>
        </div>


        <!-- 底部区域 -->
        <div class="bottom-content">
            <van-button @click="isPostShow=true" type="default" class="comment-btn" round size="medium">
                写评论
            </van-button>
            <van-icon name="comment-o" :badge="totalCommentCount" />
            <van-icon :name="article.is_collected?'star':'star-o'" :color="article.is_collected?'orange':''"
                @click="onCollect" />
            <van-icon @click="onLike" :name="article.attitude==1?'good-job':'good-job-o'"
                :color="article.attitude==1?'#3296fa':''" />
            <van-icon name="share-o" />
        </div>

        <!-- 发布评论区 -->
        <van-popup v-model="isPostShow" position="bottom">
            <post-comment @post-success="onPostSuccess" :target="articleId"></post-comment>
        </van-popup>

        <!-- 评论的评论 -->
        <van-popup v-model="isReplyShow" position="bottom">
            <comment-reply :articleId="articleId" v-if="isReplyShow" @close="isReplyShow=false" :comment="replyComment">
            </comment-reply>
        </van-popup>
    </div>
</template>

<script>
    import {
        addCollect,
        deleteCollect,
        userLike,
        userCancelLike
    } from '@/api/article';
    import {
        ImagePreview,
        Toast
    } from 'vant';
    import {
        cancelFollowUser,
        followUser
    } from '@/api/user';
    import 'github-markdown-css';
    import {
        mapState
    } from 'vuex';
    import {
        getArticleById
    } from '@/api/article';
    import commentList from './components/comment-list.vue';
    import PostComment from './components/post-comment.vue';
    import CommentReply from './components/comment-reply.vue';
    export default {
        components: {
            commentList,
            PostComment,
            CommentReply
        },
        name: 'Article',
        props: ['articleId'],
        data() {
            return {
                article: {},
                isFollowLoding: false,
                child: false,
                isPostShow: false,
                commentList: [],
                totalCommentCount: 0,
                isReplyShow: false,
                replyComment: {},
                scrollTop: 0
            }
        },
        async created() {
            await this.getArticle();
            this.child = true;
        },
        computed: {
            ...mapState(['user'])
        },
        methods: {
            async getArticle() {
                const {
                    data
                } = await getArticleById(this.articleId);
                console.log(data);
                this.article = data.data;
                // 由于更新数据后视图未立即刷新 使用nextTick
                this.$nextTick(() => {
                    // 获取内容区
                    const articleContent = this.$refs['article-content'];
                    // dom操作
                    const imgs = articleContent.querySelectorAll('img');
                    const imgPath = []
                    // 遍历每个img 添加点击事件
                    imgs.forEach((img, index) => {
                        imgPath.push(img.src)
                        img.onclick = function () {
                            ImagePreview({
                                images: imgPath,
                                startPosition: index
                            })
                        }
                    });
                })
            },
            async onFollow() {
                this.isFollowLoding = true;
                if (this.user) {
                    // 如果已关注则取关
                    if (this.article.is_followed) {
                        await cancelFollowUser(this.article.aut_id);
                    } else {
                        await followUser(this.article.aut_id);
                    }
                    // 未关注则关注
                    this.article.is_followed = !this.article.is_followed;
                } else {
                    this.$toast({
                        message: '请登录后进行操作'
                    });
                }
                this.isFollowLoding = false;
            },
            async onCollect() {
                Toast.loading({
                    message: '操作中···',
                    forbidClick: true
                })
                if (this.user) {
                    if (this.article.is_collected) {
                        await deleteCollect(this.article.art_id);
                    } else {
                        await addCollect(this.article.art_id);
                    }
                    this.article.is_collected = !this.article.is_collected;
                    Toast.success({
                        message: this.article.is_collected ? '收藏成功' : '已取消收藏'
                    })
                } else {
                    this.$toast({
                        message: '请登录后进行操作'
                    });
                }
            },
            async onLike() {
                Toast.loading({
                    message: '操作中···',
                    forbidClick: true
                })
                if (this.user) {
                    if (this.article.attitude == -1) {
                        await userLike(this.article.art_id);
                        this.article.attitude = 1;
                    } else {
                        await userCancelLike(this.article.art_id);
                        this.article.attitude = -1;
                    }
                    Toast.success({
                        message: '操作成功'
                    })
                } else {
                    this.$toast({
                        message: '请登录后进行操作'
                    });
                }
            },
            onPostSuccess(content) {
                this.commentList.unshift(content);
                this.totalCommentCount++;
                this.isPostShow = false;
            },
            onReplyClick(comment) {
                this.isReplyShow = true;
                this.replyComment = comment;
                console.log(comment);
            }
        },
    }
</script>



<style lang="less" scoped>
    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }

    .article-cotainer {
        .content-wrap {
            position: fixed;
            left: 0;
            right: 0;
            top: 46px;
            bottom: 44px;
            overflow-y: auto;
            background-color: white;
        }

        .title {
            font-size: 20px;
            margin: 0;
            padding: 14px;
            color: #3a3a3a;
            background-color: white;
        }

        .user-info {
            justify-content: space-around;
            align-items: center;
            padding: 10px 14px;

            .user-avatar {
                width: 35px;
                height: 35px;
                margin-right: 8px;
            }

            .user-name {
                font-size: 11px;
                color: #333333;
            }

            .time {
                font-size: 11px;
                color: #b4b4b4;
            }

            .follow-button {
                width: 85px;
                height: 29px;
            }
        }

        .markdown-body {
            padding: 14px;
            background-color: white;
        }

        .bottom-content {
            position: fixed;
            flex: 1;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            bottom: 0;
            left: 0;
            right: 0;
            height: 44px;
            background-color: white;

            .comment-btn {
                width: 141px;
                height: 23px;
                font-size: 15px;
            }
        }
    }
</style>