<template>
    <section>
        <el-card>
            <el-row>
                <el-row type="flex" justify="space-between">
                    <el-row><div>品类列表</div></el-row>
                    <el-row>
                        <!-- <el-button>新增品类</el-button> -->
                        <el-popover placement="left" width="80px" v-model="visible" @hide="formClose('addCateRef')">
                            <el-form :model="addForm" ref="addCateRef" :rules="addCateFormRules">
                                <el-form-item prop="name">
                                    <el-input class="input" v-model="addForm.name"></el-input>
                                </el-form-item>
                            </el-form>
                            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="addcate">确定</el-button>
                            <el-button slot="reference" type="success">新增品类</el-button>
                        </el-popover>
                    </el-row>
                </el-row>

                <!---------------------------------------------------- 分类列表区 ---------------------------------------------->
                <el-row>
                    <el-table :data="list" stripe style="width: 100%" border highlight-current-row>
                        <el-table-column label="品类" prop="Name"> </el-table-column>
                        <el-table-column label="品牌">
                            <template slot-scope="scope">
                                <el-row>
                                    <el-col v-for="(item, itemIndex) in scope.row.Category" :key="itemIndex" :span="7">
                                        <el-tag size="medium" hit closable @close="removeBrand(item.Id)">{{ item.Name }}</el-tag>
                                    </el-col>
                                </el-row>
                                <el-input
                                    size="small"
                                    class="input-new-tag"
                                    v-if="inputVisible && currentIndex == scope.$index"
                                    v-model="inputValue"
                                    :ref="`saveTagInput${scope.$index}`"
                                    @keyup.enter.native="handleInputConfirm(scope.row.Id)"
                                    @blur="handleInputConfirm(scope.row.Id)"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.$index)">+ 品牌</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" content="删除品类" placement="top">
                                    <el-popconfirm
                                        confirmButtonText="确认"
                                        cancelButtonText="取消"
                                        icon="el-icon-info"
                                        iconColor="red"
                                        title="确认删除该分类吗?"
                                        @onConfirm="deleteBrand(scope.row.Id)"
                                    >
                                        <el-button slot="reference" type="danger" circle icon="el-icon-delete-solid"></el-button>
                                    </el-popconfirm>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-row>
        </el-card>
    </section>
</template>

<script>
import methods from '../cateGory/methods.js'
import datas from '../cateGory/datas.js'

export default {
    created() {
        this.getList()
    },
    data() {
        return datas.init()
    },
    methods: methods
}
</script>

<style scoped>
.el-button {
    margin: 0 50px;
}

.el-table {
    margin-top: 15px;
}

.el-tag {
    margin: 15px;
}

.input {
    margin: 10px 5px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
