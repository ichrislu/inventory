<template>
    <section>
        <el-card>
            <el-row>
                <el-row type="flex" justify="space-between">
                    <el-row><div></div></el-row>
                    <el-row style="width:180px;">
                        <!-- <el-button>新增品类</el-button> -->
                        <el-popover placement="left" width="80px" v-model="visible" @hide="formClose('addCategoryRef')" @show="showFocus" >
                            <el-form :model="addForm" ref="addCategoryRef" :rules="addCategoryFormRules" @submit.native.prevent>
                                <el-form-item prop="name">
                                    <el-input class="input" v-model="addForm.name" ref="inputRef" @keyup.enter.native="addCategory"  @keyup.prevent.esc.native="() => { visible = !visible }"></el-input>
                                </el-form-item>
                            </el-form>
                            <el-button size="mini"  @click="visible = false" icon="el-icon-close">取消</el-button>
                            <el-button type="primary" size="mini" @click="addCategory" icon="el-icon-check" >确定</el-button>
                            <el-button slot="reference" type="success" icon="el-icon-plus">新增品类</el-button>
                        </el-popover>
                    </el-row>
                </el-row>

                <!---------------------------------------------------- 分类列表区 ---------------------------------------------->
                <el-row>
                    <el-table :data="list" stripe style="width: 100%" border highlight-current-row v-loading="loading">
                        <el-table-column label="品类" prop="Name" width="200px" > </el-table-column>
                        <el-table-column label="品牌">
                            <template slot-scope="scope">
                                <el-row>
                                    <el-col v-for="(item, itemIndex) in scope.row.Category" :key="itemIndex" :span="4">
                                        <el-tag size="medium" hit closable @close="deleteBrandById(item.Id)">{{ item.Name }}</el-tag>
                                    </el-col>
                                </el-row>
                                <el-input
                                    size="small"
                                    class="input-new-tag"
                                    v-if="inputVisible && currentIndex == scope.$index"
                                    v-model="inputValue"
                                    :ref="`saveTagInput${scope.$index}`"
                                    @keyup.enter.native="addBrandById(scope.row.Id)"
                                    @blur="addBrandById(scope.row.Id)"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.$index)">+ 品牌</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="200px">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" content="删除品类" placement="top">
                                    <el-popconfirm
                                        confirmButtonText="确认"
                                        cancelButtonText="取消"
                                        icon="el-icon-info"
                                        iconColor="red"
                                        title="确认删除该分类吗?"
                                        @onConfirm="deleteCategoryById(scope.row.Id)"
                                        popper-class="popc"
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
import methods from '../category/methods.js'
import datas from '../category/datas.js'

export default {
    created() {
        this.getAllCategoryList()
    },
    data() {
        return datas.init()
    },
    methods: methods,
    mounted() {
        this.$nextTick(() => {
            this.$refs.inputRef.focus()
        })
    },
}
</script>

<style scoped>
.el-container .el-main {
    padding: 0px;
}

.el-button {
    margin: 0 50px;
}

.el-table {
    margin-top: 15px;
}

.el-tag {
    margin: 10px 0px;
}

.input {
    margin: 10px 5px;
}

.button-new-tag {
    margin-left: 0px;
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
