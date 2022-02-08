<template>
  <div class="home-container">
    <!-- 上部搜索导航栏 -->
    <van-nav-bar class="nav-bar-search">
      <van-button
        slot="title"
        round
        size="small"
        class="search-button"
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- tab栏标签 -->
    <van-tabs
      class="channel-tabs"
      v-model="active"
      border
      color="#3296fa"
      line-width="15px"
    >
      <van-tab
        class="channel-tabs-item"
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
      >
        <article-list :channel="channel"></article-list>
      </van-tab>
      <!-- 弹出层按钮 -->
      <div
        slot="nav-right"
        class="wap-nav-wrap"
        @click="isChannelEditShow = true"
      >
        <van-icon name="wap-nav" />
      </div>
      <div
        slot="nav-right"
        class="wap-nav-set"
        @click="isChannelEditShow = true"
      ></div>
    </van-tabs>
    <!-- tab栏 -->

    <!-- 弹出层 -->

    <van-popup
      v-model="isChannelEditShow"
      class="channel-popup-edit"
      closeable
      position="bottom"
      get-container="body"
    >
      <!-- 组件 -->
      <channel-edit
        :active="active"
        @update-active="onUpdateActive"
        :channels="channels"
        @close="isChannelEditShow = false"
      ></channel-edit>
      <!-- 组件 -->
    </van-popup>
    <!-- 弹出层 -->
  </div>
</template>

<script>
import ChannelEdit from "./components/channel-edit.vue";
import { getUserChannels } from "@/api";
import ArticleList from "./components/article-list.vue";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
export default {
  components: {
    ArticleList,
    ChannelEdit,
  },
  name: "home",
  data() {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false,
    };
  },
  methods: {
    async getUserChannels() {
      if (this.user) {
        const { data } = await getUserChannels();
        this.channels = data.data.channels;
        if(data.status===401){
          // 此时刷新token也失效了
          
        }
      } else {
        const localChannels = getItem("user-channels");
        if (localChannels) {
          this.channels = localChannels;
        } else {
          const { data } = await getUserChannels();
          this.channels = data.data.channels;
        }
      }
    },

    showChannelEdit() {
      this.isChannelEditShow = true;
    },

    onUpdateActive(index) {
      this.active = index;
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.getUserChannels();
  },
};
</script>

<style scoped lang="less">
// 弹出层 挂载到body下
.channel-popup-edit {
  height: 100%;
}

.home-container {
  .channel-tabs {
    .wap-nav-set {
      flex-shrink: 0;
      //不参与平分 只参与固定。
      width: 40px;
    }

    .wap-nav-wrap {
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 44px;
      right: 0px;
      width: 40px;
      height: 43px;
      font-size: 20px;
      background-color: rgba(255, 255, 255, 0.8);
    }

    /deep/ .van-tabs__nav {
      padding: 0 !important;
    }

    /deep/ .van-tab {
      border-right: 1px rgb(231, 231, 231) solid;
      border-bottom: 1px rgb(223, 221, 221) solid;
      width: 100px;
    }

    ::v-deep .van-tabs__line {
      bottom: 6px !important;
    }
  }

  .nav-bar-search {
    /deep/ .van-nav-bar__title {
      max-width: unset;
    }

    .search-button {
      width: 277px;
      height: 32px;
      background-color: #5babfb;
      border: none;
      color: #fff;

      .van-button__text {
        font-size: 14px;
      }

      .van-icon {
        font-size: 16px;
        color: white;
      }
    }
  }
}
</style>