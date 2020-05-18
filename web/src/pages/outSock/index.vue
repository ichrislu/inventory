<template>
    <section>
        <el-card style="margin-bottom: 20px;">
            <!-- --------------------------------------------------------------- 查找区 ------------------------------------------------ -->
            <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-collapse v-model="activeCollapse">
                    <el-collapse-item name="search" class="coll">
                        <el-form
                            :model="filters"
                            :inline="true"
                            class="demo-form-inline"
                            label-width="110px"
                            ref="searchCondition"
                        >
                            <el-form-item label="日期">
                                <el-date-picker
                                    v-model="value1"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="供货商">
                                <el-input
                                    placeholder="请输入供货商"
                                    v-model="keyword"
                                    clearable
                                ></el-input>
                            </el-form-item>
                        </el-form>
                        <el-col
                            :span="24"
                            style="text-align: center;margin-top: 20px;"
                            class="btns"
                        >
                            <el-button type="primary" @click="showAddFormDialogVisible = true"
                                >查询</el-button
                            >
                            <el-button>重置</el-button>
                        </el-col>
                    </el-collapse-item>
                </el-collapse>
            </el-row>
        </el-card>
        <el-card>
            <!-- --------------------------------------------------------------- 数据展示区 ------------------------------------------------ -->
            <el-row>
                <el-row>
                    <el-col :span="15">
                        <div>数据列表</div>
                    </el-col>
                    <!-- <el-col :span="2" >
                        <el-button type="success" @click="showAddFormDialogVisible = true"
                            >新增库存</el-button
                        >
                    </el-col> -->
                </el-row>
                <el-table :data="outStockList" border style="width: 100%" stripe>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column prop="sup" label="供货商"></el-table-column>
                    <el-table-column prop="date" label="进货时间"></el-table-column>
                    <el-table-column prop="cate" label="品类"></el-table-column>
                    <el-table-column prop="brand" label="品牌"></el-table-column>
                    <el-table-column prop="model" label="型号"></el-table-column>
                    <el-table-column prop="price" label="进货价格(元)"></el-table-column>
                    <el-table-column prop="num" label="数量(件)"></el-table-column>
                    <el-table-column prop="sell" label="售价(元)"></el-table-column>
                    <el-table-column prop="profit" label="利润(元)"></el-table-column>
                    <el-table-column prop="tip" label="备注" width="180px"></el-table-column>

                    <!-- 功能按钮区域 -->
                    <el-table-column scope align="center" label="修改备注">
                        <!-- 备注按钮 -->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="添加备注"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                icon="el-icon-edit"
                                size="medium "
                                type="primary"
                                @click="showRemarkFormDialogVisible = true"
                            ></el-button>
                        </el-tooltip>
                    </el-table-column>
                    <el-table-column> <div class="chuku">已出库</div> </el-table-column>
                </el-table>
            </el-row>
        </el-card>

        <!-- 备注对话框 -->
        <el-dialog
            title="添加备注"
            :visible.sync="showRemarkFormDialogVisible"
            width="30%"
            :rules="addFormRules"
        >
            <el-form ref="form" :model="remarkForm" label-width="120px" :rules="addFormRules">
                <el-form-item label="备注" prop="name">
                    <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="remarkForm.textarea"
                        maxlength="200"
                        size="max"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showRemarkFormDialogVisible = false">取消添加</el-button>
                <el-button type="primary" @click="showRemarkFormDialogVisible = false"
                    >确定添加</el-button
                >
            </span>
        </el-dialog>
    </section>
</template>

<script>
import datas from './datas.js'
import methods from './methods.js'

export default {
    data() {
        return datas.init()
    },
    created() {
        this.getList()
    },
    methods: methods
}
</script>

<style scoped>
.el-table {
    margin-top: 15px;
}
.el-col {
    margin: 0 20px;
}
.el-button {
    margin: 0 6px;
}

.coll {
    position: relative;
}
.btns {
    position: absolute;
    right: 520px;
    top: 29px;
    width: 300px;
}
.chuku {
    color: red;
}
</style>
