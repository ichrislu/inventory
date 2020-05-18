<template>
    <el-card>
        <!-- 添加品类品牌区域 -->
        <!-- <el-row>
            <el-col>
                <el-button type="primary" @click="dialogVisible = true">添加品类品牌</el-button>
            </el-col>
        </el-row> -->

        <el-row>
            <el-row type="flex" justify="space-between">
                <div>品类列表</div>
                <el-button type="primary" @click="showCateDialogVisible = true">新增品类</el-button>
            </el-row>
            <el-row>
                <el-table
                    :data="cate"
                    stripe
                    style="width: 100%"
                    border
                    highlight-current-row
                    @current-change="handleCurrentChange"
                >
                    <el-table-column type="index"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                </el-table>
            </el-row>
        </el-row>
        <el-row style="margin-top: 50px;">
            <el-row type="flex" justify="space-between">
                <div>品牌列表</div>
                <el-button type="primary" @click="showBrandDialogVisible = true">新增品牌</el-button>
            </el-row>
            <el-row>
                <el-table :data="cate2" stripe style="width: 100%" border>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                </el-table>
            </el-row>
        </el-row>

        <!-- 新增分类 -->
        <el-dialog title="新增品类" width="30%" :visible.sync="showCateDialogVisible">
            <el-form ref="form" label-width="80px">
                <el-form-item label="品类">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showCateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="showCateDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增品牌 -->
        <el-dialog title="新增品牌" width="30%" :visible.sync="showBrandDialogVisible">
            <el-form ref="form" label-width="80px">
                <el-form-item label="品牌">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showBrandDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="showBrandDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>

</template>

<script>
export default {
    data() {
        return {
            list: [],
            cate: [
                {
                    id: 1,
                    name: '冰箱'
                },
                {
                    id: 2,
                    name: '洗衣机'
                },
                {
                    id: 3,
                    name: '彩电'
                }
            ],
            cate2: [],
            // 控制 新建分类 对话框的 显示与隐藏
            showCateDialogVisible: false,
            // 控制 新建品牌 对话框的 显示与隐藏
            showBrandDialogVisible :false,
            bs: false
        }
    },
    created() {
        this.getList()
        // console.log(this.list)
    },
    methods: {
        getList() {
            // debugger
            // this.$axios.get('/parameter/query').then( res => console.log(res.data.data.rows))
            this.$axios.get('/parameter/query').then(res => {
                this.list.push(res.data.data.rows)
            })
            // this.$axios.get('/parameter/query').then( res => {console.log(this.list)})
            // this.$axios.post('/query').then( res => { console.log(res) })
        },
        handleCurrentChange(current, old) {
            this.$axios.get('/v/query1').then(res => {
                this.cate2 = res.data.data.rows
                console.log(this.cate2)
            })
        }
    }
}
</script>

<style scoped>
.el-table {
    margin-top: 15px;
}
</style>
