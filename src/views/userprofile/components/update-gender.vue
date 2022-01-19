<template>
  <div class="update-gender">
      <van-picker
        title="请选择性别"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="$emit('close')"
        :default-index="defaultIndex"
        @change="onGenderChange"
        />
  </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
export default {
    name:'updateGender',
    data() {
        return {
            columns:['男','女'],
            defaultIndex:this.value
        }
    },
    props:['value'],
    methods: {
        onGenderChange(picker,value,index){
            this.defaultIndex=index;
        },
        async onConfirm(){
            // 请求提交更新性别
            try {
                this.$toast('修改中');
                await updateUserProfile({
                    gender:this.defaultIndex
                })
                this.$toast.success('修改成功');
                this.$emit('input',this.defaultIndex)
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