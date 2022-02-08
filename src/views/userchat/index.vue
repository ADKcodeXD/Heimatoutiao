<template>
  <div class="userchat">
    <van-nav-bar title="人工智能" left-arrow @click-left="$router.back()" />

    <!-- 聊天区 -->
    <van-cell-group class="message-list">
      <div class="tip">
        <span class="time">{{ Date.now() | dateTime }}</span>
        <span>人工智能目前处于维护中</span>
      </div>
      <van-cell
        center
        v-for="(item, index) in messageList"
        :key="index"
        :border="false"
      >
        <div slot="title" class="msgbox">
          {{ item }}
        </div>
        <van-image class="user-photo" :src="user.photo" fit="cover" round />
      </van-cell>
    </van-cell-group>

    <!-- 输入框 -->
    <van-cell-group center class="send-message">
      <van-field
        :border="false"
        type="text"
        placeholder="请输入内容"
        v-model="message"
      />
      <van-button @click="sendMsg" size="small" class="send-btn" type="primary"
        >发送</van-button
      >
    </van-cell-group>
  </div>
</template>

<script>
// import io from 'socket.io-client';
// const socket = io('http://api-toutiao-web.itheima.net')
//接口未设置跨域 估计限定了ip
import { getUserProfile } from "@/api/user";
export default {
  name: "userchat",
  data() {
    return {
      message: "",
      messageList: [],
      user: {},
    };
  },
  async created() {
    const { data } = await getUserProfile();
    this.user = data.data;
  },
  methods: {
    sendMsg() {
      this.messageList.push(this.message);
      this.message = "";
    },
  },
};
</script>

<style lang="less" scoped>
.userchat {
  .send-message {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .send-btn {
      padding: 0;
      width: 70px;
      height: 30px;
    }
  }

  .message-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
    .tip {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      background-color: rgb(206, 206, 206);
      width: 200px;
      font-size: 6px;
      border-radius: 30px;
      color: rgb(109, 109, 109);
      margin: 5px auto;
      padding: 2px;
    }
    /deep/ .van-cell {
      justify-content: flex-end;
      .van-cell__title {
        flex: unset;
      }
      .van-cell__value {
        flex: unset;
        flex-shrink: 0;
        flex-basis: 45px;
      }
    }
    .user-photo {
      width: 35px;
      height: 35px;
      margin-left: 10px;
    }
    .msgbox {
      padding: 4px 6px;
      color: rgb(49, 49, 49);
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
      text-align: left;
      background-color: rgb(14, 238, 51);
      border-radius: 20px;
      color: #222222;
      border: 2px white solid;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>