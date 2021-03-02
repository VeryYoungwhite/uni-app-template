<template>
  <popu-mask ref="mask" :disabled="modalData.disabled">
    <view class="showModal">
      <view class="showModal-title" v-if="modalData.showTitle">{{ modalData.title }}</view>
      <view class="showModal-content" :style="{'font-weight':modalData.contentBold}">{{ modalData.content }}</view>
      <view class="showModal-btns">
        <view v-if="modalData.showCancleBtn" class="cancel" @click.stop="handleCancel">{{ modalData.cancelText }}</view>
        <view v-if="modalData.showConfirmBtn" class="bg-release" @click.stop="handleConfirm">{{ modalData.confirmText }}</view>
      </view>
    </view>
  </popu-mask>
</template>

<script>

/** 
 * # 弹出层公共组件
 * 
 * - shopModal
 *    - `showCloseBtn`  显示右上角的关闭按钮
 *    - `showCancelBtn` 显示底部的取消按钮
 * - 事件
 *    - `open`   弹窗打开时触发
 *    - `close`  弹窗关闭时触发
 *    - `cancel` 弹窗关闭时触发, 使用代码关闭时不触发
 * 
 * - 使用：
```html
    <show-modal ref="showModal" @cancel="cancel" @confirm="confirm" />
```
  
```javascript
// 打开弹层： 都为非毕传参数 且 不可传空
this.$refs.showModal.open({
  title: "提示",
  showTitle:true,
  content: "是否进行当前操作？",
  contentBold:"", //bold
  cancelText: "取消",
  showCancleBtn: true,
  confirmText: "确定",
  showConfirmBtn: true,
  showCancelIcon:false
})

```
 */
import popuMask from "./popuMask.vue"
export default {
  data(){
    return {
      modalData: {
        title: "提示",
		  showTitle:true,
        content: "是否进行当前操作？",
		contentBold:"bold",
        cancelText: "取消",
        showCancleBtn: true,
        confirmText: "确定",
        showConfirmBtn: true,
		showCancelIcon:false,
		disabled:false,
      }
    }
  },
  components: {
    popuMask
  },
  methods: {
    open(data){
      this.modalData = {...this.modalData, ...data}
      this.$refs.mask.open();
    },
    // 手动点击关闭
    handleCancel(){
      this.$emit("cancel");
      this.$refs.mask.close();
    },
    handleConfirm(){
      this.$emit("confirm");
	  if(this.modalData.disabled) return
	  this.$refs.mask.close();
    }
  }
}
</script>

<style scoped>

.showModal{
  background: #ffffff;
  width:640upx;
  border-radius: 20upx;
  position: fixed;
  top: 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: -300upx;
  overflow: hidden;
}
.showModal-title{
  font-weight: bold;
  font-size: 32upx;
  text-align: center;
  height:80upx;
  line-height:80upx;
}
.showModal-content{
  text-align: center;
  min-height: 150upx;
  max-height: 400upx;
  padding: 0upx 66upx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40upx;
  color: #000000;
}
.showModal-btns{
  display: flex;
  justify-content: space-between;
}
.showModal-btns view{
  height: 80upx;
  background: #DFDFDF;
  text-align: center;
  line-height: 80upx;
  font-size: 28upx;
  min-width: 50%;
  width: 100%;
}
.cancel{
	color: #838083;
}
.cancel-icon{
	position: absolute;
	top: 20upx;
	right: 20upx;
	width: 24upx;
	height: 24upx;
}
</style>
