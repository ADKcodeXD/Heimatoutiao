<template>
    <div class="channel-edit">
        <van-cell :border="false">
            <div class="title" slot="title">我的频道</div>
            <van-button type="danger" class="edit-btn" @click="isEdit=!isEdit" round size="mini" plain>
                {{isEdit?'完成':'编辑'}}
            </van-button>
        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item class="grid-item" :class="{ active: index===active}" v-for="channel,index in channels"
                :key="channel.id" :icon="(isEdit&&index!==0)?'clear':''" @click="onUserChannelClick(index,channel)"
                :text="channel.name" />
        </van-grid>

        <van-cell :border="false">
            <div class="title" slot="title">频道推荐</div>

        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item class="grid-item" @click="onAdd(channel)" v-for="channel in recommandChannels"
                :key="channel.id" :text="channel.name" />
        </van-grid>
    </div>
</template>

<script>
    import {
        getAllChannels,
        addUserChannels,
        deleteUserChannels
    } from '@/api';
    import {
        mapState
    } from 'vuex'
    import {
        setItem,
        getItem
    } from '@/utils/storage'
    export default {
        name: 'Channeledit',
        data() {
            return {
                allChannnels: [],
                isEdit: false
            }
        },
        props: {
            channels: {
                type: Array,
                required: true
            },
            active: {
                type: Number,
                required: true
            }
        },
        methods: {
            async loadAllChannels() {
                const {data} = await getAllChannels();
                this.allChannnels = data.data.channels;
            },
            // 添加频道 持久化：如果登录了，则存储到线上，如果未登录 存储到本地
            async onAdd(channel) {
                this.channels.push(channel);
                // 如果登录了：添加到线上
                if (this.user) {
                    await addUserChannels({
                        channels: [{
                            id: channel.id,
                            seq: this.channels.length
                        }]
                    })
                } else {
                    setItem('user-channels', this.channels);
                }
            },
            // 删除或者切换
            onUserChannelClick(index,channel) {
                if (this.isEdit && index !== 0) {
                    // 删除操作
                    this.deleteChannel(index,channel);
                    
                } else {
                    // 切换操作
                    this.switchChannel(index);
                }
            },
            async deleteChannel(index,channel) {
                // 如果删除的是当前频道之前的频道
                if (index <= this.active) {
                    this.$emit('update-active', this.active - 1);
                }
                this.channels.splice(index, 1);
                // 数据持久化
                if(this.user){
                    await deleteUserChannels(channel.id)
                }else{
                    setItem('user-channels', this.channels);
                }
            },
            switchChannel(index) {
                // 切换频道
                this.$emit('update-active', index);
                // 通知父组件 关闭弹出层

                this.$emit('close');
            }
        },
        mounted() {

            this.loadAllChannels();
        },
        computed: {
            ...mapState(['user']),
            recommandChannels() {
                // 推荐频道 所有频道减去我的频道
                return this.allChannnels.filter(channel => {
                    return !this.channels.find(userChannel => {
                        return userChannel.id === channel.id
                    })
                })
            }
        }
    }
</script>

<style scoped lang="less">
    // 选中的类名
    .active {
        /deep/ .van-grid-item__content {

            background-color: #3296fa !important;

            .van-grid-item__text {
                color: rgb(255, 255, 255) !important;
            }
        }
    }

    .channel-edit {
        padding-top: 54px;

        .edit-btn {
            width: 60px;
        }

        .title {
            font-size: 16px;
            color: #333;
        }

        .grid-item {
            width: 80px;
            height: 43px;
            text-align: center;

            /deep/ .van-grid-item__content {
                background-color: #f4f5f6;

                .van-grid-item__text {
                    font-size: 14px;
                    color: #222;
                    margin-top: 0;
                }
            }

            /deep/ .van-grid-item__content {
                position: relative;

                .van-icon {
                    z-index: 2;
                    right: -6px;
                    top: -6px;
                    font-size: 18px;
                    color: rgb(92, 92, 92);
                    position: absolute;
                }
            }
        }
    }
</style>