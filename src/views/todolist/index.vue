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
          <van-icon name="clock-o" />
          未完成
        </div>
        <div class="remaing">
          ({{ allList.length - todoList.length }}/{{ allList.length }})
        </div>
      </div>
      <div class="main-list">
        <van-empty
          v-if="todoList.length === 0"
          image="error"
          description="请添加学习计划"
        />
        <van-swipe-cell
            :before-close="beforeClose(item.id)"
          class="swipe-cell"
          v-for="item in todoList"
          :key="item.id"
        >
          <van-cell :border="false">
            <van-checkbox
              slot="icon"
              v-model="item.isComplete"
              @change="item.isComplete = !item.isComplete"
            >
            </van-checkbox>
            <div slot="title" class="content-title">
              {{ item.title }}
            </div>
            <div slot="label" class="content-labe">
              {{ item.desc }}
            </div>
            <div class="time-need">
              <div class="need-time">所需:{{ item.time }}h</div>
              <div class="at-time">{{ item.createTime | dateTime }}</div>
            </div>
          </van-cell>
          <template #right>
            <van-button
              class="button"
              square
              type="danger"
              text="删除"
            />
            <van-button class="button" square type="primary" text="收藏" />
          </template>
        </van-swipe-cell>

        <!-- 统计 -->
        <div class="total-uncomplete">
          <van-checkbox>全部完成</van-checkbox>
          <div class="totaltime">总计:120h</div>
        </div>
      </div>
      <!-- 已完成tag -->
      <div class="complete-tag-wrapper">
        <div class="complete-box-tag">
          <van-icon name="success" />
          已完成
        </div>
      </div>
      <div class="main-list complete">
        <van-empty
          v-if="completeList.length === 0"
          image="error"
          description="您还没有完成任何事项"
        />
        <van-swipe-cell
            :before-close="beforeClose(item.id)"
          class="swipe-cell"
          v-for="item in completeList"
          :key="item.id"
        >
          <van-cell :border="false">
            <van-checkbox
              slot="icon"
              v-model="item.isComplete"
              @change="item.isComplete = !item.isComplete"
            >
            </van-checkbox>
            <div slot="title" class="content-title">
              {{ item.title }}
            </div>
            <div slot="label" class="content-labe">
              {{ item.desc }}
            </div>
            <div class="time-need">
              <div class="need-time">所需:40h</div>
              <div class="at-time">{{ item.createTime | dateTime }}</div>
            </div>
          </van-cell>
          <template #right>
            <van-button
              class="button"
              square
              type="danger"
              @click="delete item.id"
              text="删除"
            />
            <van-button class="button" square type="primary" text="收藏" />
          </template>
        </van-swipe-cell>
        <!-- 统计 -->
        <div class="total-uncomplete">
          <div class="tip">天道酬勤</div>
          <div class="totaltime">您总共学习了:120h</div>
        </div>
      </div>
      <!-- 新建学习计划 -->
      <van-button
        round
        class="addNew"
        @click="show = true"
        plain
        icon="add"
        type="info"
      >
        新建
      </van-button>
      <van-popup v-model="show" :style="{ width: '90%' }">
        <van-cell-group inset>
          <h2 class="learn-plan-title">添加学习计划</h2>
          <van-field
            v-model="title"
            label="标题"
            placeholder="请输入事件标题"
          />
          <van-field v-model="desc" label="描述" placeholder="请输入用户名" />
          <van-field
            v-model="time"
            label="所需时间"
            placeholder="请输入需要使用的时间"
          />
        </van-cell-group>
        <div class="button-class">
          <van-button type="default" @click="show = false">取消</van-button>
          <van-button type="primary" @click="addNew">添加</van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getItem, setItem } from "@/utils/storage";
import { nanoid } from "nanoid";
export default {
  name: "todolist",
  data() {
    return {
      checkList: [],
      allList: [],
      show: false,
      title: "",
      desc: "",
      time: 0,
    };
  },
  computed: {
    completeList() {
      let list = [];
      this.allList.forEach((item) => {
        if (item.isComplete) {
          list.push(item);
        }
      });
      return list;
    },
    todoList() {
      let list = [];
      this.allList.forEach((item) => {
        if (!item.isComplete) {
          list.push(item);
        }
      });
      return list;
    },
  },
  methods: {
    beforeClose({ name, position, instance },id) {
      switch (position) {
        case "left":id
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          let index = this.allList.findIndex((item) => item.id === id);
          this.allList.splice(index, 1);
          setItem("myList", this.allList);
          break;
      }
    },
    delete(id) {
      let index = this.allList.findIndex((item) => item.id === id);
      this.allList.splice(index, 1);
      setItem("myList", this.allList);
    },
    addNew() {
      let item = {};
      item.id = nanoid();
      item.title = this.title;
      item.desc = this.desc;
      item.time = this.time;
      item.isComplete = false;
      item.createTime = new Date();
      this.allList.push(item);
      setItem("myList", this.allList);
      this.show = false;
    },
    Allcheck() {
      this.allList.forEach((item) => {
        item.isComplete = true;
      });
      setItem("myList", this.allList);
    },
  },
  created() {
    let list = getItem("myList");
    console.log(list);
    this.allList = list;
  },
};
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
      .title {
        font-size: 26px;
      }
      .des {
        color: rgb(148, 148, 148);
        font-size: 10px;
      }
    }
    .tag-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      .box-tag {
        border-radius: 20px;
        width: 25%;
        font-size: 14px;
        color: white;
        text-align: center;
        background-color: rgb(248, 74, 74);
      }
      .remaing {
        font-size: 14px;
        color: rgb(133, 133, 133);
      }
    }
    .complete {
      opacity: 0.5;
    }
    .main-list {
      margin-top: 10px;
      .swipe-cell {
        margin-top: 10px;
        .button {
          height: 100%;
        }
        .van-checkbox {
          margin-right: 10px;
        }
        .van-cell__value {
          display: flex;
          flex: unset;
          flex-shrink: 0;
          align-items: flex-end;
        }
        .time-need {
          font-size: 12px;
        }
      }
      .total-uncomplete {
        display: flex;
        margin-top: 10px;
        font-size: 14px;
        justify-content: space-between;
        color: rgb(161, 161, 161);
      }
    }
    .complete-tag-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      .complete-box-tag {
        border-radius: 20px;
        width: 25%;
        font-size: 14px;
        color: white;
        text-align: center;
        background-color: rgb(13, 163, 38);
      }
    }
    .addNew {
      position: fixed;
      width: 80px;
      height: 30px;
      font-size: 12px;
      right: 6%;
      bottom: 15%;
    }
  }
  .learn-plan-title {
    font-size: 30px;
  }
  .button-class {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    .van-button {
      width: 40%;
    }
  }
}
</style>