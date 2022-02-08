<template>
  <div class="user-profile">
    <!-- 上方导航栏 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />

    <!-- 个人信息模块 -->
    <van-cell-group>
      <input
        type="file"
        accept="image/*"
        @change="onFileChange"
        hidden
        ref="imgUpload"
      />
      <van-cell
        title="头像"
        @click="$refs.imgUpload.click()"
        value="内容"
        is-link
        center
      >
        <van-image :src="user.photo" fit="cover" round width="35" height="35" />
      </van-cell>
      <van-cell
        title="昵称"
        @click="isNameshow = true"
        is-link
        :value="user.name"
      />
      <van-cell
        title="性别"
        @click="isGendershow = true"
        is-link
        :value="user.gender == 0 ? '男' : '女'"
      />
      <van-cell
        title="生日"
        @click="isBrithdayshow = true"
        is-link
        :value="user.birthday ? user.birthday : '未设置'"
      />
    </van-cell-group>

    <!-- 编辑昵称 -->
    <van-popup
      v-model="isNameshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        v-model="user.name"
        v-if="isNameshow"
        @close="isNameshow = false"
      >
      </update-name>
    </van-popup>

    <!-- 编辑性别 -->
    <van-popup v-model="isGendershow" position="bottom">
      <update-gender
        v-model="user.gender"
        @close="isGendershow = false"
      ></update-gender>
    </van-popup>

    <!-- 编辑生日 -->
    <van-popup v-model="isBrithdayshow" position="bottom">
      <update-birthday
        v-if="isBrithdayshow"
        v-model="user.birthday"
        @close="isBrithdayshow = false"
      >
      </update-birthday>
    </van-popup>

    <!-- 修改头像 -->
    <div class="headImg">
      <van-popup v-model="isPhotoShow" style="height: 100%" position="bottom">
        <update-photo
          v-if="isPhotoShow"
          @update-photo="user.photo = $event"
          @close="isPhotoShow = false"
          :file="pictureObject"
        >
        </update-photo>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import updateName from "./components/update-name.vue";
import UpdateGender from "./components/update-gender.vue";
import UpdateBirthday from "./components/update-birthday.vue";
import UpdatePhoto from "./components/update-photo.vue";
export default {
  components: {
    updateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto,
  },
  name: "userprofile",
  data() {
    return {
      user: {},
      isNameshow: false,
      isGendershow: false,
      isBrithdayshow: false,
      isPhotoShow: false,
      pictureObject: null,
    };
  },
  methods: {
    async loadUserProfile() {
      const { data } = await getUserProfile();
      this.user = data.data;
    },
    onFileChange() {
      this.isPhotoShow = true;
      // 触发弹出层 预览图片
      const fileObject = this.$refs.imgUpload.files[0];
      this.pictureObject = fileObject;
      this.$refs.imgUpload.value = "";
    },
  },
  created() {
    this.loadUserProfile();
    this.$store.commit("REMOVECACHEPAGE", "layout");
  },
};
</script>

<style lang="less" scoped>
.headImg {
  /deep/ .van-popup {
    background-color: rgba(0, 0, 0, 0.267);
  }
}
</style>