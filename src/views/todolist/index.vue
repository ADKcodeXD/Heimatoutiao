<template>
    <div class="container">
        <div class="todolist">
            <div class="title-wrap">
                <div class="title">学习计划</div>
                <div class="des">现在开始 制定你的学习计划</div>
            </div>
            <!-- 未完成tag -->
            <div class="tag-wrapper">
                <div class="box-tag">
                    <van-icon name="clock-o"/>
                    未完成
                </div>
                <div class="remaing">
                    (0/0)
                </div>
            </div>
            <div class="main-list">
                <van-swipe-cell class="swipe-cell">
                    <van-cell :border="false"  >
                        <van-checkbox slot="icon" >
                        </van-checkbox>
                        <div slot="title" class="content-title">
                            vue3项目目前未完成需要快一点
                        </div>
                        <div slot="label" class="content-labe"> 
                            这是一个xxxx的项目啊卧槽卧槽卧槽ufguaishiasgjioajgioas
                        </div>
                        <div class="time-need">
                            <div class="need-time">所需:40h</div>
                            <div class="at-time">2022.1.21</div>
                        </div>
                    </van-cell>
                    <template #right>
                        <van-button class="button"  square type="danger" text="删除" />
                        <van-button class="button" square type="primary" text="收藏" />
                    </template>
                </van-swipe-cell>
                <van-swipe-cell class="swipe-cell">
                    <van-cell :border="false"  >
                        <van-checkbox slot="icon">
                        </van-checkbox>
                        <div slot="title" class="content-title">
                            vue3项目目前未完成需要快一点
                        </div>
                        <div slot="label" class="content-labe"> 
                            这是一个xxxx的项目啊卧槽卧槽卧槽ufguaishiasgjioajgioas
                        </div>
                        <div class="time-need">
                            <div class="need-time">所需:40h</div>
                            <div class="at-time">2022.1.21</div>
                        </div>
                    </van-cell>
                    <template #right>
                        <van-button class="button"  square type="danger" text="删除" />
                        <van-button class="button" square type="primary" text="收藏" />
                    </template>
                </van-swipe-cell>
                <van-swipe-cell class="swipe-cell">
                    <van-cell :border="false"  >
                        <van-checkbox slot="icon">
                        </van-checkbox>
                        <div slot="title" class="content-title">
                            vue3项目目前未完成需要快一点
                        </div>
                        <div slot="label" class="content-labe"> 
                            这是一个xxxx的项目啊卧槽卧槽卧槽ufguaishiasgjioajgioas
                        </div>
                        <div class="time-need">
                            <div class="need-time">所需:40h</div>
                            <div class="at-time">2022.1.21</div>
                        </div>
                    </van-cell>
                    <template #right>
                        <van-button class="button"  square type="danger" text="删除" />
                        <van-button class="button" square type="primary" text="收藏" />
                    </template>
                </van-swipe-cell>
                <!-- 统计 -->
                <div class="total-uncomplete">
                    <van-checkbox >全部完成</van-checkbox>
                    <div class="totaltime">
                        总计:120h
                    </div>
                </div>
            </div>
            <!-- 已完成tag -->
            <div class="complete-tag-wrapper">
                <div class="complete-box-tag">
                    <van-icon name="success"/>
                    已完成
                </div>
            </div>
            <div class="main-list">
                <van-swipe-cell class="swipe-cell">
                    <van-cell :border="false"  >
                        <van-checkbox slot="icon" >
                        </van-checkbox>
                        <div slot="title" class="content-title">
                            vue3项目目前未完成需要快一点
                        </div>
                        <div slot="label" class="content-labe"> 
                            这是一个xxxx的项目啊卧槽卧槽卧槽ufguaishiasgjioajgioas
                        </div>
                        <div class="time-need">
                            <div class="need-time">所需:40h</div>
                            <div class="at-time">2022.1.21</div>
                        </div>
                    </van-cell>
                    <template #right>
                        <van-button class="button"  square type="danger" text="删除" />
                        <van-button class="button" square type="primary" text="收藏" />
                    </template>
                </van-swipe-cell>
                <van-swipe-cell class="swipe-cell">
                    <van-cell :border="false"  >
                        <van-checkbox slot="icon">
                        </van-checkbox>
                        <div slot="title" class="content-title">
                            vue3项目目前未完成需要快一点
                        </div>
                        <div slot="label" class="content-labe"> 
                            这是一个xxxx的项目啊卧槽卧槽卧槽ufguaishiasgjioajgioas
                        </div>
                        <div class="time-need">
                            <div class="need-time">所需:40h</div>
                            <div class="at-time">2022.1.21</div>
                        </div>
                    </van-cell>
                    <template #right>
                        <van-button class="button"  square type="danger" text="删除" />
                        <van-button class="button" square type="primary" text="收藏" />
                    </template>
                </van-swipe-cell>
                <van-swipe-cell class="swipe-cell">
                    <van-cell :border="false"  >
                        <van-checkbox slot="icon">
                        </van-checkbox>
                        <div slot="title" class="content-title">
                            vue3项目目前未完成需要快一点
                        </div>
                        <div slot="label" class="content-labe"> 
                            这是一个xxxx的项目啊卧槽卧槽卧槽ufguaishiasgjioajgioas
                        </div>
                        <div class="time-need">
                            <div class="need-time">所需:40h</div>
                            <div class="at-time">2022.1.21</div>
                        </div>
                    </van-cell>
                    <template #right>
                        <van-button class="button"  square type="danger" text="删除" />
                        <van-button class="button" square type="primary" text="收藏" />
                    </template>
                </van-swipe-cell>
                <!-- 统计 -->
                <div class="total-uncomplete">
                    <div class="tip">天道酬勤</div>
                    <div class="totaltime">
                        您总共学习了:120h
                    </div>
                </div>
            </div>
            <!-- 新建学习计划 -->
            <van-button round class="addNew"
            plain
            icon="add" type="info">
                新建
            </van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'todolist'
    }
</script>

<style lang="less" scoped>
    .container {
        margin: 0;
        position: fixed;
        overflow-y: auto;
        top: 0;
        bottom: 46px;
        left: 0;
        right: 0;

        .todolist {
            padding: 15px;
            .title-wrap {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                .title{
                    font-size: 26px;
                }
                .des{
                    color: rgb(148, 148, 148);
                    font-size: 10px;
                }
            }
            .tag-wrapper{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
                .box-tag{
                    border-radius: 20px;
                    width: 25%;
                    font-size: 14px;
                    color: white;
                    text-align: center;
                    background-color: rgb(248, 74, 74);
                }
                .remaing{
                    font-size: 14px;
                    color: rgb(133, 133, 133);
                }
            }
            .main-list{
                margin-top: 10px;
                .swipe-cell{
                    margin-top: 10px;
                    .button{
                        height: 100%;
                    }
                    .van-checkbox{
                        margin-right: 10px;
                    }
                    .van-cell__value{
                        display: flex;
                        flex:unset;
                        flex-shrink: 0;
                        align-items: flex-end;
                    }
                    .time-need{
                        font-size: 12px;
                    }
                }
                .total-uncomplete{
                    display: flex;
                    margin-top: 10px;
                    font-size: 14px;
                    justify-content: space-between;
                    color: rgb(161, 161, 161);
                }
            }
            .complete-tag-wrapper{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
                .complete-box-tag{
                    border-radius: 20px;
                    width: 25%;
                    font-size: 14px;
                    color: white;
                    text-align: center;
                    background-color: rgb(13, 163, 38);
                }
                 
            }
            .addNew{
                position: fixed;
                width: 80px;
                height: 30px;
                font-size: 12px;
                right: 6%;
                bottom: 15%;
            }
        }
    }
</style>