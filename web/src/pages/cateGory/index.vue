<template>
    <section>
        <el-card>
            <el-row>
                <el-row type="flex" justify="space-between">
                    <el-row><div>品类列表</div></el-row>
                    <el-row>
                        <!-- <el-button>新增品类</el-button> -->
                        <el-popover placement="left" width="80px" v-model="visible" @hide ="formClose('addCateRef')">
                            <el-form :model="addForm" ref="addCateRef" :rules="addCateFormRules" >
                                <el-form-item prop="name">
                                    <el-input class="input" v-model="addForm.name"></el-input>
                                </el-form-item>
                            </el-form>
                            <el-button size="mini" type="text" @click="visible=false">取消</el-button>
                            <el-button type="primary" size="mini" @click="addcate">确定</el-button>
                            <el-button slot="reference" type="primary">新增品类</el-button>
                        </el-popover>
                    </el-row>
                </el-row>

<!---------------------------------------------------- 分类列表区 ---------------------------------------------->
                <el-row>
                    <el-table :data="list" stripe style="width: 100%" border highlight-current-row>
                        <el-table-column label="品类" prop="Name"> </el-table-column>
                        <el-table-column label="品牌">
                            <template slot-scope="scope">
                                <el-row >
                                    <el-col v-for="item in scope.row.Category" :key="item.id" :span="7">
                                        <el-tag size="medium" hit closable @close="removeBrand(item.Id)">{{ item.Name }}</el-tag>
                                    </el-col>
                                </el-row>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button @click="addBrandId(scope.row.Id)" type="success">新增品牌</el-button>
                                <el-button type="danger" @click="deleteBrand(scope.row.Id)">删除品类</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-row>

            <!-- 新增品牌 -->
            <el-dialog title="新增品牌" width="30%" :visible.sync="showBrandDialogVisible" @close="addBrandsFormClose">
                <el-form label-width="80px" :model="addBrandsForm" ref="addBrandsFormRef" :rules="addBrandFormRules">
                    <el-form-item label="品牌" prop="name">
                        <el-input v-model="addBrandsForm.name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showBrandDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addBrand">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </section>
</template>

<script>
import methods from '../cateGory/methods.js'
import datas from '../cateGory/datas.js'

export default {
    created() {
        this.getList();
    },
    data() {
        return datas.init()
    },
    methods: methods
}
</script>

<style scoped>
.el-table {
    margin-top: 15px;
}

.el-tag {
    margin: 15px;
}

.input {
    margin: 10px 5px;
}
</style>
