<template>
  <div class="update-birthday">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
        />
  </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
import dayjs from 'dayjs'
export default {
    name:'updateBirthday',
    data() {
        return {
            minDate: new Date(1900, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(this.value)
        };
    },
    props:['value'],
    methods: {
        async onConfirm(){
            // 请求提交更新性别
            try {
                this.$toast('修改中');
                console.log(date);
                const date=dayjs(this.currentDate).format("YYYY-MM-DD");
                await updateUserProfile({
                    birthday:date
                })
                this.$toast.success('修改成功');
                this.$emit('input',date)
                this.$emit('close');
            } catch (error) {
                this.$toast(error.message)
            }
        }
    },
}
</script>

<style lang="less" scoped>

</style>