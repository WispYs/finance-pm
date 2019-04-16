<template>
  <div class="img-preview">
    <i class="img-preview__close" @click="() => $emit('close-click')">×</i>
    <el-carousel :autoplay="false" arrow="always" :initial-index="imgIndex">
      <el-carousel-item v-for="(img, i) in imgList" :key="i">
        <img :src="img" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    props: ['imgIndex','imgList'],
    data() {
      return {

      }
    },
    methods: {

    },
    created() {

    }
  };
</script>

<style lang="scss">
  @import '~styles/base/variable';
  @import '~styles/mixins/clearfix';

  .img-preview {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background: rgba(0,0,0,0.3);
    z-index: 999;
    &__close {
      position:absolute;
      top: 20px;
      right: 20px;
      color:#fff;
      font-size: 40px;
      cursor: pointer;
      z-index: 1000;
    }
    .el-carousel {
      width: 100%;
      height: 100%;
      &__container {
        height: 100%;
      }
      &__arrow {
        width: 80px;
        height: 80px;
        background-color: transparent;
        i {
          font-size: 44px;
        }
      }
      &__arrow:hover {
        background-color: transparent;
      }
    }
    img {
      max-width: 90%;
      max-height: 90%;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }

  }
</style>
