<template>
  <view
    class="popup-backdrop"
    :class="{active: isOpenMask}"
    @click.stop="handleCancel"
    @touchmove.stop="doNothing"
  >
    <view class="popup-panel" :class="{active: isOpenMask}" @click.stop="doNothing">
      <slot />
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
 * 
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
    isOpen: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpenMask: false,
    };
  },
  watch: {
    isOpen(newVal, oldVal) {
      this.isOpenMask = newVal;
    },
  },
  methods: {
    open() {
      if (this.isOpenMask) return;
      this.$emit("open");
      this.isOpenMask = true;
    },
    // 手动点击关闭
    handleCancel() {
      this.$emit("cancel");
      this.close();
    },
    close() {
      if (!this.isOpenMask) return;
      if (this.disabled) return;
      this.$emit("close");
      this.isOpenMask = false;
    },
    doNothing() {},
  },
};
</script>

<style scoped>
.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1001;
  visibility: hidden;
  transition: 0.3s;
}
.popup-backdrop.active {
  background-color: rgba(0, 0, 0, 0.7);
  visibility: visible;
}
.popup-panel {
  opacity: 0;
  transition: 0.3s;
}
.popup-panel.active {
  opacity: 1;
}
</style>
