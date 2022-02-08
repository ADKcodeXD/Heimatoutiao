<template>
  <div class="usercollect">
    <van-nav-bar title="收藏" left-arrow @click-left="$router.back()" />
    <!-- 渲染组件块 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 单元格结构 -->
      <div v-for="(item, index) in collectList" :key="index">
        <van-swipe-cell :before-close="beforeClose" :name="index">
          <article-item :article="item" />
          <template #right>
            <van-button class="button" square type="danger" text="移除" />
          </template>
        </van-swipe-cell>
      </div>
    </van-list>
    <div class="tips">左滑可以调出删除按钮哦~</div>
  </div>
</template>

<script>
import ArticleItem from "@/components/article-item";
import { getUserCollect, deleteCollect } from "@/api/article";
export default {
  name: "usercollect",
  components: {
    ArticleItem,
  },
  data() {
    return {
      collectList: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
    };
  },
  methods: {
    async onLoad() {
      const { data } = await getUserCollect({
        page: this.page,
        per_page: this.per_page,
      });
      this.collectList = [...this.collectList, ...data.data.results];
      this.page++;
      this.loading = false;
      if (data.data.results.length == 0) {
        this.finished = true;
      }
    },
    async beforeClose({ name, position, instance }) {
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          await deleteCollect(this.collectList[name].art_id);
          this.collectList.splice(name, 1);
          instance.close();
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes opt {
  0% {
    opacity: 0;
    transform: scaleX(0) scaleY(0);
  }

  50% {
    opacity: 1;
    transform: scaleX(100%) scaleY(100%);
  }

  100% {
    opacity: 0;
    transform: scaleX(0) scaleY(0);
  }
}

.button {
  height: 100%;
}

.tips {
  width: 150px;
  height: 30px;
  font-size: 10px;
  line-height: 30px;
  text-align: center;
  background-color: rgb(248, 45, 96);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  color: rgb(255, 255, 255);
  position: fixed;
  bottom: 20%;
  opacity: 0;
  animation: opt 4s ease forwards;
  animation-delay: 1s;
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>