<script>
import { goPage } from "@/utils/utils.js"
export default {
	onLaunch: function() {
		if(!this.$store.state.isLogin) return goPage("/pages/login/login","redirectTo")
		console.log('App Launch')
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style>
	@import "./style/common.css";
	@import "./style/iconfont.css";
	@import "./style/colorui/icon.css";
	@import "./style/colorui/main.css";
	@import "./style/colorui/animation.css";
	/*每个页面公共css */
	page{
		/* padding: 0 0rpx; */
		background: #fff;
	}
</style>
