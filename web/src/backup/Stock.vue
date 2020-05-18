<template>
    <el-card>
        <!-- 搜索区域 -->
        <el-row :gutter="20">
            <!-- 按 月 日 搜索 -->
            <el-col :span="5">
                <div class="block">
                    <el-date-picker
                        v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </div>
            </el-col>

            <!-- 按供货商搜索 -->
            <el-col :span="7">
                <el-input placeholder="请输入供货商" v-model="keyword" clearable>
                    <el-button
                        icon="el-icon-search"
                        slot="append"
                        type="success"
                        size="mini"
                        @click="searchSup"
                    ></el-button>
                </el-input>
            </el-col>

            <!-- 新增库存 -->
            <el-col :span="4">
                <el-button type="success" @click="showAddFormDialogVisible = true"
                    >新增库存</el-button
                >
            </el-col>
        </el-row>

        <!-- 库存列表区域 -->
        <el-table :data="stockList" border style="width: 100%" stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="sup" label="供货商"></el-table-column>
            <el-table-column prop="date" label="进货时间"></el-table-column>
            <el-table-column prop="cate" label="品类"></el-table-column>
            <el-table-column prop="brand" label="品牌"></el-table-column>
            <el-table-column prop="model" label="型号"></el-table-column>
            <el-table-column prop="price" label="进货价格"></el-table-column>
            <el-table-column prop="num" label="数量"></el-table-column>
            <el-table-column prop="tip" label="备注" width="180px"></el-table-column>

            <!-- 功能按钮区域 -->
            <el-table-column width="200px">
                <!-- 修改按钮 -->
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="修改"
                    placement="top"
                    :enterable="false"
                >
                    <el-button
                        icon="el-icon-setting"
                        size="small"
                        type="primary"
                        @click="showEditFormDialogVisible = true"
                    ></el-button>
                </el-tooltip>
                <!-- 备注按钮 -->
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="备注"
                    placement="top"
                    :enterable="false"
                >
                    <el-button
                        icon="el-icon-edit"
                        size="small"
                        type="success"
                        @click="showRemarkFormDialogVisible = true"
                    ></el-button>
                </el-tooltip>
                <!-- 出库按钮 -->
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="出库"
                    placement="top"
                    :enterable="false"
                >
                    <el-button icon="el-icon-s-promotion" size="small" type="warning" @click="outStockFormDialogVisible = true"></el-button>
                </el-tooltip>
            </el-table-column>
        </el-table>

        <!-- 新增库存对话框 -->
        <el-dialog
            title="新增库存"
            :visible.sync="showAddFormDialogVisible"
            width="30%"
            :rules="addFormRules"
        >
            <el-form ref="form" :model="addForm" label-width="80px" :rules="addFormRules">
                <el-form-item label="供应商" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="品类" prop="cate">
                    <el-input v-model="addForm.cate"></el-input>
                </el-form-item>
                <el-form-item label="品牌" prop="brand">
                    <el-input v-model="addForm.brand"></el-input>
                </el-form-item>
                <el-form-item label="型号" prop="mod">
                    <el-input v-model="addForm.mod"></el-input>
                </el-form-item>
                <el-form-item label="进货价格" prop="price">
                    <el-input v-model="addForm.price"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="num">
                    <el-input v-model="addForm.num"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="addForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showAddFormDialogVisible = false">取消新建库存</el-button>
                <el-button type="primary" @click="showAddFormDialogVisible = false"
                    >确定新建库存</el-button
                >
            </span>
        </el-dialog>

        <!-- 修改库存对话框 -->
        <el-dialog
            title="修改库存"
            :visible.sync="showEditFormDialogVisible"
            width="30%"
            :rules="addFormRules"
        >
            <el-form ref="form" :model="editForm" label-width="80px" :rules="addFormRules">
                <el-form-item label="供应商" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="品类" prop="cate">
                    <el-input v-model="editForm.cate"></el-input>
                </el-form-item>
                <el-form-item label="品牌" prop="brand">
                    <el-input v-model="editForm.brand"></el-input>
                </el-form-item>
                <el-form-item label="型号" prop="mod">
                    <el-input v-model="editForm.mod"></el-input>
                </el-form-item>
                <el-form-item label="进货价格" prop="price">
                    <el-input v-model="editForm.price"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="num">
                    <el-input v-model="editForm.num"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="editForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showEditFormDialogVisible = false">取消修改库存</el-button>
                <el-button type="primary" @click="showEditFormDialogVisible = false"
                    >确定修改库存</el-button
                >
            </span>
        </el-dialog>

        <!-- 备注对话框 -->
        <el-dialog
            title="添加备注"
            :visible.sync="showRemarkFormDialogVisible"
            width="30%"
            :rules="addFormRules"
        >
            <el-form ref="form" :model="remarkForm" label-width="80px" :rules="addFormRules">
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

        <!-- 出库对话框 -->
        <!-- 新增库存对话框 -->
        <el-dialog
            title="确认出库"
            :visible.sync="outStockFormDialogVisible"
            width="30%"
            :rules="addFormRules"
        >
            <el-form ref="form" :model="outStockForm" label-width="80px" :rules="addFormRules">
                <el-form-item label="供应商" prop="name">
                    <el-input v-model="addForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="品类" prop="cate" >
                    <el-input v-model="addForm.cate" disabled></el-input>
                </el-form-item>
                <el-form-item label="品牌" prop="brand" >
                    <el-input v-model="addForm.brand" disabled></el-input>
                </el-form-item>
                <el-form-item label="型号" prop="mod" >
                    <el-input v-model="addForm.mod" disabled></el-input>
                </el-form-item>
                <el-form-item label="进货价格" prop="price" >
                    <el-input v-model="addForm.price" disabled> </el-input>
                </el-form-item>
                <el-form-item label="数量" prop="num">
                    <el-input v-model="addForm.num"></el-input>
                </el-form-item>
                <el-form-item label="售价" prop="sell">
                    <el-input v-model="addForm.num"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="addForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="outStockFormDialogVisible = false">取消出库</el-button>
                <el-button type="primary" @click="outStockFormDialogVisible = false"
                    >确认出库</el-button
                >
            </span>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            ad: 0,
            // 库存列表数据
            stockList: [],
            showAddFormDialogVisible: false,
            date: '',
            // 新增库存表单对象
            addForm: {
                name: '',
                cate: '',
                brand: '',
                mod: '',
                price: '',
                num: '',
                remark: ''
            },
            // 新增库存表单对象预验证规则
            addFormRules: {
                name: [
                    {
                        required: true,
                        message: '请输入供应商',
                        trigger: 'blur'
                    }
                ],
                cate: [
                    {
                        required: true,
                        message: '请输入品类',
                        trigger: 'blur'
                    }
                ],
                brand: [
                    {
                        required: true,
                        message: '请输入品牌',
                        trigger: 'blur'
                    }
                ],
                mod: [
                    {
                        required: true,
                        message: '请输入型号',
                        trigger: 'blur'
                    }
                ],
                price: [
                    {
                        required: true,
                        message: '请输入进货价格',
                        trigger: 'blur'
                    }
                ],
                num: [
                    {
                        required: true,
                        message: '请输入数量',
                        trigger: 'blur'
                    }
                ]
            },
            value1: '',
            value2: '',
            // 搜索关键字
            keyword: '',
            // 控制 修改库存对话框
            showEditFormDialogVisible: false,
            // 修改库存表单对象
            editForm: {
                name: '',
                cate: '',
                brand: '',
                mod: '',
                price: '',
                num: '',
                remark: ''
            },
            // 控制 修改备注对话框的显示与隐藏
            showRemarkFormDialogVisible: false,
            // 备注对话框 表单对象
            remarkForm: {
                // 备注内容
                textarea: ''
            },
            // 控制出库表单的显示与隐藏
            outStockFormDialogVisible: false,
            // 出库表单对象
            outStockForm: {
                name: '',
                cate: '',
                brand: '',
                mod: '',
                price: '',
                num: '',
                remark: '',
                sell : ''
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 获取库存列表数据
        getList() {
            var _this = this
            this.$axios.get('/stock').then(res => {
                // _this.stockList = _this.stockList.concat(res.data)
                _this.stockList = res.data
            })
        },

        // 按供应商查询
        searchSup() {
            console.log(this.keyword)
            var _this = this
            this.$axios.get('/stock/search', { params: { key: keyword } }).then(res => {
                _this.stockList = res.data
            })
        }
    }
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
</style>
