<template>
    <el-container>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside style="width:150px">
                <!-- 侧边栏菜单 -->
                <el-menu
                    background-color="#333744"
                    text-color="white"
                    :router="true"
                    :default-active="this.$route.path"
                >
                <el-menu-item-group v-for="item in $router.options.routes" :key="item.index"  default-active="this.$route.path">
                    <el-menu-item v-for="subItem in item.children" :key="subItem.index" :index="'' + subItem.path" style="text-align:center">
                        <span>{{subItem.title}}</span>
                    </el-menu-item>
                </el-menu-item-group>
                </el-menu>
            </el-aside>
            <el-container>
                <!-- 右侧主体 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
        }
    },
    methods: {}
}
</script>
<style>
html,
body,
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
    padding: 0px;

}

a {
    text-decoration: none;
    /* color: white; */
}


.el-menu {
    border-right-width: 0!important;
    width: auto;
}

textarea {
    min-height: 20px;
	overflow-y:hidden
}

</style>
