<template>
  <div class="wrapper">
    <!-- 顶部卡片 -->
    <div class="weather-top-cotainer">
      <div>
        <div class="main-weather">
          <div class="main-left">
            <span v-if="!loading && loadSucces" class="main-tempture">{{ realTime.wtTemp }}°</span>
            <span v-else class="main-tempture">25°</span>
            <span v-if="!loading && loadSucces" class="main-status">{{ realTime.wtNm }}</span>
            <span v-else class="main-status">多云</span>
            <van-image v-if="!loading && loadSucces" :src="`./icon/d/${realTime.wtIcon}.png`" fit="contain" />
            <van-image v-else :src="`./icon/d/01.png`" fit="contain" />
          </div>
          <div class="main-right">
            <span class="date">{{ Date.now() | dateTime }}</span>
          </div>
        </div>
        <div class="sub-item">
          <div>
            当前{{ realTime.wtWindNm + " " + wtWindId[realTime.wtWindId] }}
          </div>
          <div>{{ today.wtTemp2 }}°~{{ today.wtTemp1 }}°</div>
        </div>
      </div>
      <div class="bottom-item">
        <div class="today-wind">
          今日风向:{{ today.wtWindNm1 + " " + wtWindId[today.wtWinpId1] }}
        </div>
        <div class="my-location" @click="showPopup = true">
          <div class="city">您当前所在地区 {{ city }}</div>
          <div class="switch">城市不对？点此切换</div>
        </div>
      </div>
    </div>

    <van-popup v-model="showPopup" position="bottom" :style="{ height: '40%' }">
      <van-picker show-toolbar title="选择地区" :columns="cities" />
    </van-popup>

    <!-- 中间 -->
    <div class="rain-and-api">
      <div class="rain">降雨概率:{{ realTime.wtRainfall }}</div>
      <div class="rain">空气质量指数:{{ realTime.wtAqi }}</div>
    </div>
    <!-- 分割 -->
    <div class="title2">未来一周天气预报</div>
    <div class="gird-future">
      <div class="grid-item" v-for="(day, index) in futureDay" :key="index">
        <img class="icon" :src="`./icon/d/${day.wtIcon1}.png`" />
        <span class="main-text">{{ day.wtNm1 }}</span>
        <span class="temp">{{ day.wtTemp2 }}°~{{ day.wtTemp1 }}°</span>
        <span class="day">{{ day.week }}</span>
        <span class="date">{{ day.dateYmd }}</span>
      </div>
    </div>

    <!-- 分割 -->
    <div class="title2">生活小贴士</div>
    <van-cell-group inset>
      <van-cell
        :border="false"
        v-for="(lifeTip, index) in today.lifeIndex"
        :key="index"
        :title="lifeTip.liNm"
        :value="lifeTip.liAttr"
        :label="lifeTip.liDese"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getWeather } from "@/api/weather";
import axios from "axios";
import { Toast } from 'vant';
export default {
  name: "weather",
  data() {
    return {
      ip: "",
      showPopup: false,
      realTime: {},
      futureDay: [],
      today: {},
      loading:false,
      loadSucces:true,
      wtWindId: [
        "小于3级",
        "3-4级",
        "4-5级",
        "5-6级",
        "6-7级",
        "7-8级",
        "8-9级",
        "9-10级",
        "10-11级",
        "11-12级",
      ],
      city: "",
      cities: [],
    };
  },
  methods: {
    async getWeather() {
        this.loading=true
        try {
            const { data } = await getWeather(this.ip);
            const { result } = data;
            const { futureDay, realTime, today, area_1, area_2, area_3 } = result;
            this.futureDay = futureDay;
            this.today = today;
            this.realTime = realTime;
            (this.city = area_1 + area_2), +area_3;
        } catch (error) {
            Toast('获取天气失败');
            this.loadSucces=false;
        }
        this.loading=false;
    },
    changeCity() {
      console.log(123);
    },
    async getIp() {
      const { data } = await axios.get("https://api.ipify.org/?format=json", {
        dataType: "json",
        data: {},
      });
      this.ip = data.ip;
    },
  },
  async mounted() {
    await this.getIp();
    this.getWeather();
  },
};
</script>

<style scoped lang="less">
@keyframes bg-color {
  0% {
    background-position: 0% 0%;
  }

  50% {
    background-position: 100% 0%;
  }

  100% {
    background-position: 0% 0%;
  }
}

.wrapper {
  margin: 0;
  position: fixed;
  overflow-y: auto;
  top: 0;
  bottom: 46px;
  left: 0;
  right: 0;
  background-size: 200% 200%;
  background-image: linear-gradient(120deg, #f9fbff 0%, #7ad5ff8a 100%);
  animation: bg-color 10s linear infinite;
  .van-cell-group--inset {
    margin: 8px 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

    .van-cell {
      color: #fff;
      background-image: linear-gradient(60deg, #ff9380 0%, #347afc5d 100%);

      .van-cell__label {
        color: rgb(4, 33, 196);
      }

      .van-cell__value {
        flex: unset;
        color: rgb(255, 255, 255);
      }
    }
  }

  .title2 {
    padding: 4px 10px;
    font-size: 20px;
    color: rgb(21, 70, 100);
  }

  .gird-future {
    overflow-x: auto;
    display: flex;
    flex-shrink: 0;
    flex-basis: 0;
    border-radius: 5px;
    margin: 10px 10px;
    box-sizing: border-box;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    width: 355px;
    height: 142px;
    // background-color: rgb(96, 183, 233);
    background-image: linear-gradient(120deg, #f79f779a 0%, #9e90e475 100%);

    .grid-item {
      position: relative;
      width: 25%;
      height: 142px;
      flex-shrink: 0;
      display: flex;
      color: white;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;

      &::after {
        position: absolute;
        content: "";
        right: 0;
        width: 1px;
        height: 130px;
        background-color: rgba(255, 255, 255, 0.404);
      }

      .icon {
        width: 35px;
        height: auto;
      }

      .main-text {
        font-size: 23px;
      }

      .temp {
        font-size: 14px;
      }

      .day {
        font-size: 12px;
      }

      .date {
        font-size: 10px;
      }
    }
  }

  .rain-and-api {
    border-radius: 5px;
    font-size: 16px;
    margin: 10px 10px;
    box-sizing: border-box;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    width: 355px;
    height: 40px;
    color: #fff;
    // background-color: rgb(96, 183, 233);
    background-size: 200% 200%;
    animation: bg-color 5s linear infinite;
    background-image: linear-gradient(170deg, #ff97a5 0%, #b2def8 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 7px;
  }

  .weather-top-cotainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    margin: 10px 10px;
    box-sizing: border-box;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    width: 355px;
    height: 162px;
    background-size: 200% 200%;
    background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
    animation: bg-color 10s linear infinite;
    // background-color: rgb(96, 183, 233);
    padding: 7px 12px;

    .main-weather {
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .main-left {
        display: flex;
        align-items: flex-end;

        .main-tempture {
          font-size: 48px;
          transform: translateY(5px);
          line-height: 48px;
        }

        .main-status {
          font-size: 27px;
        }
      }

      .main-right {
        font-size: 10px;
        padding: 5px;
      }
    }

    .sub-item {
      margin-left: 5px;
      margin-top: 5px;
      font-size: 14px;
      color: #fff;
    }

    .bottom-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      color: #fff;

      .today-wind {
        font-size: 10px;
      }

      .my-location {
        text-align: right;

        .city {
          font-size: 14px;
        }

        .switch {
          color: rgb(224, 223, 223);
          font-size: 10px;
        }
      }
    }
  }
}
</style>