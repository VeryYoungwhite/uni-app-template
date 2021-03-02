<template>
  <view class="popup-backdrop" :class="{active: isOpen}" @click.stop="handleCancel" @touchmove.stop="doNothing">
    <view class="popup-panel" :style="styleInfo" :class="{active: isOpen}" @click.stop="doNothing">
      <view v-if="showCloseBtn" class="popup-close-btn lg text-gray cuIcon-close" @click.stop="handleCancel" />
		<slot />
      <view v-if="showCancelBtn" class="popup-cancel-btn" @click.stop="handleCancel">取消</view>
    </view>
  </view>
</template>

<script>

/** 
 * # 弹出层公共组件
 * 
 * - props
 *    - `showCloseBtn`  显示右上角的关闭按钮
 *    - `showCancelBtn` 显示底部的取消按钮
 * 
 * - 事件
 *    - `open`   弹窗打开时触发
 *    - `close`  弹窗关闭时触发
 *    - `cancel` 弹窗关闭时触发, 使用代码关闭时不触发
 * - 使用：
```html
<popup-panel ref="popup">
  <!-- 弹出层内容插槽 -->
</popup-panel>
```
  
```javascript
// 打开弹层：
this.$refs.popup.open()

// 弹层默认监听背景点击事件和关闭按钮点击事件来关闭，也可以使用代码关闭弹层：
this.$refs.popup.close()
```
 */
export default {
  props: {
    showCloseBtn: {
      type: Boolean,
      default: true
    },
    showCancelBtn: {
      type: Boolean,
      default: false
    },
	styleInfo:{
		type:String,
		default:""
	}
  },
  data(){
    return {
      isOpen: false
    }
  },
  methods: {
    open() {
      if(this.isOpen) return;

      this.$emit("open");
      this.isOpen = true;
    },
    // 手动点击关闭
    handleCancel(){
      this.$emit("cancel");
      this.close();
    },
    close(){
      if(!this.isOpen) return;
      this.$emit("close");
      this.isOpen = false;
    },
    doNothing(){}
  }
}
</script>

<style scoped>
.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;
  visibility: hidden;
  transition: 0.3s;
  z-index: 999;
}
.popup-backdrop.active {
  background-color: rgba(0, 0, 0, 0.7);
  visibility: visible;
}
.popup-panel {
  background: #fff;
  position: fixed;
  left: 0;
  right: 0;
  padding: 0;
  width: 100%;
  bottom: 0upx;
  border-top-right-radius: 20upx;
  border-top-left-radius: 10upx;
  transform: translateY(120%);
  transition: 0.3s;
  overflow: hidden;
}
.popup-panel.active {
  transform: translateY(0);
}

.popup-close-btn {
  position: absolute;
  top: 0; right: 0;
  font-size: 25upx;
  padding: 30upx;
  line-height: 1;
  color: #ccc;
  z-index: 5;
}

.popup-cancel-btn {
  font-size: 32upx;
  height: 100upx;
  border-top: solid 1upx #f5f5f5;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
