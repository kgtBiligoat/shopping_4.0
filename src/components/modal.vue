<template>
  <div class="md-overlay" v-if="loginModalFlag" >
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':loginModalFlag}" > 
      <div class="md-modal-inner"> 
        <div class="md-top">
          <button class="md-close" @click="close">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <div class="login-wrap">
            <slot name="btn"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >

  export default{
    props:["loginModalFlag"],
    methods:{
      close(){
        this.$emit('closeItem')
      }
    }
  }
</script>

