<template>
	<el-container class="home-container">
		<el-container>
			<!-- 侧边栏 -->
			<el-aside width="200px">
				<!-- 侧边栏菜单 -->
				<el-menu
					class="el-menu-vertical-demo"
					background-color="#333744"
					text-color="white"
					:router="true"
					:default-active="this.$route.path"
				>
					<el-menu-item-group v-for="item in $router.options.routes" :key="item.index" default-active="this.$route.path">
						<el-menu-item v-for="subItem in item.children" :key="subItem.index" :index="'' + subItem.path" style="text-align:center">
							<span>{{ subItem.title }}</span>
						</el-menu-item>
					</el-menu-item-group>
				</el-menu>
			</el-aside>
			<div style="height: 100vh;width: calc(100% - 200px);">
				<!-- 右侧主体 -->
				<router-view></router-view>
			</div>
		</el-container>
	</el-container>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {}
	},
	methods: {}
}
</script>
<style>
#app,
.el-container,
.el-card {
	padding: 0px;
	margin: 0px;
	height: 100%;
}
.el-header {
	background-color: #373d41;
}
.el-aside {
	background-color: #333744;
}

.el-main {
	background-color: #eaedf1;
	padding: 5px;
}

a {
	text-decoration: none;
}

.el-menu {
	border-right-width: 0px;
}
</style>
