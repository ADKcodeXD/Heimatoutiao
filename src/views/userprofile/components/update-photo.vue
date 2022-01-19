<template>
    <div class="photo-show">
        <div class="imgbox">
            <img class="img" :src="photo" ref="image"/>
        </div>
        <van-nav-bar class="toolbar" left-text="关闭" right-text="完成" @click-left="$emit('close')"
            @click-right="onConfirm" />
    </div>
</template>

<script>
    import {
        updateUserPhoto
    } from '@/api/user';
    import Cropper from 'cropperjs';
    import 'cropperjs/dist/cropper.css';
    export default {
        name: 'updatePhoto',
        data() {
            return {
                photo: window.URL.createObjectURL(this.file),
                cropper:null
            }
        },
        props: {
            file: {
                type: [Object, File],
                required: true
            }
        },
        mounted(){
            const image = this.$refs.image;
            this.cropper = new Cropper(image, {
                viewMode:1,
                dragMode:'move',
                aspectRatio:1,
                autoCropArea:1,
                cropBoxMovable:true,
                cropBoxResizable:true,
                background:false,
                movable:true
            });
        },
        methods: {
            getCroppedCanvas(){
                return new Promise(resolve=>{
                    this.cropper.getCroppedCanvas().toBlob((blob)=>{
                        resolve(blob)
                    })
                })
            },
            async onConfirm() {
                this.$toast.loading({
                    title: '上传中~~~',
                    forbidclick: true,
                    duration:0
                })
                // 封装了一个getCropper函数，获取裁剪后的图片
                const file=await this.getCroppedCanvas();
                const fd = new FormData();
                // 传入文件对象并转成formData
                fd.append('photo', file)
                await updateUserPhoto(fd)

                this.$toast.success('上传成功！');
                this.$emit('close');
                this.$emit('update-photo', window.URL.createObjectURL(file));
            }
        },
    }
</script>

<style lang="less" scoped>
    .photo-show{
        display: flex;
        position: absolute;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        bottom: 44px;
    }
    .toolbar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 254, 254, 0.959);
    }
    
    
    /deep/ .van-nav-bar__content {
        background-color: rgba(247, 247, 247, 0.144);
    }
    .img{
        display: block;
        max-width: 100%;
    }
</style>