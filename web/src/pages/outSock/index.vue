<template>
    <section>
        <el-card style="margin-bottom: 20px;">
            <!-- --------------------------------------------------------------- 查找区 ------------------------------------------------ -->
            <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-form :model="searchForm" :inline="true" class="demo-form-inline" label-width="110px" ref="searchRef">
                    <el-form-item prop="time" label="出货日期">
                        <el-date-picker
                            unlink-panels
                            v-model="searchForm.time"
                            value-format="timestamp"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="出货人" prop="shipper">
                        <el-input placeholder="请输入出货人" v-model="searchForm.shipper" clearable></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button @click="formClose('searchRef')">重置</el-button>
                </el-form>
            </el-row>
        </el-card>
        <el-card>
            <!-- --------------------------------------------------------------- 数据展示区 ------------------------------------------------ -->
            <el-row>
                <el-row>
                    <el-col :span="15">
                        <div>数据列表</div>
                    </el-col>
                </el-row>
                <el-table :data="outStockList" border style="width: 100%" stripe>
                    <el-table-column prop="Shipper" label="出货人" align="center"></el-table-column>
                    <el-table-column prop="InDate" label="出货日期" align="center">
                        <template slot-scope="scope">
                            <div>{{ scope.row.OutDate | formatDate }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Provider" label="供应商" align="center"></el-table-column>
                    <el-table-column prop="OutDate" label="入库日期" align="center">
                        <template slot-scope="scope">
                            <div>{{ scope.row.InDate | formatDate }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Category" label="品类" align="center"></el-table-column>
                    <el-table-column prop="Brand" label="品牌" align="center"></el-table-column>
                    <el-table-column prop="Model" label="型号" align="center"></el-table-column>
                    <el-table-column prop="InPrice" label="进货价格(元)" align="center"></el-table-column>
                    <el-table-column prop="OutPrice" label="出货价格(元)" align="center"></el-table-column>
                    <el-table-column prop="Quantity" label="数量(件)" align="center"></el-table-column>
                    <el-table-column prop="Profit" label="利润(元)" align="center"></el-table-column>
                    <el-table-column prop="Remarks" label="备注" align="center" width="150px"></el-table-column>
                    <!-- 功能按钮区域 -->
                    <el-table-column scope align="center" label="操作" width="180px">
                        <template slot-scope="scope">
                        <!-- 备注按钮 -->
                        <el-tooltip class="item" effect="dark" content="添加备注" placement="top" :enterable="false">
                            <el-button icon="el-icon-edit" size="medium " type="primary" @click="showRemark(scope.row)"></el-button>
                        </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-card>

        <!-- 备注对话框 -->
        <el-dialog title="添加备注" :visible.sync="showRemarkFormDialogVisible" width="30%" >
            <el-form ref="outStockRef" :model="remarkForm" label-width="120px" @close="formClose('outStockRef')">
                <el-form-item label="备注" prop="Remarks">
                    <el-input type="textarea" placeholder="请输入内容" v-model="remarkForm.Remarks" maxlength="200" size="max" autosize> </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showRemarkFormDialogVisible = false">取消添加</el-button>
                <el-button type="primary" @click="addRemark">确定添加</el-button>
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
    methods: methods,
    filters: {
        formatDate: function(value) {
            // 时间戳转换日期格式方法
            if (value == null) {
                return ''
            } else {
                let date = new Date(value)
                let y = date.getFullYear() // 年
                let MM = date.getMonth() + 1 // 月
                MM = MM < 10 ? '0' + MM : MM
                let d = date.getDate() // 日
                d = d < 10 ? '0' + d : d
                return y + '-' + MM + '-' + d
            }
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

.coll {
    position: relative;
}
.btns {
    position: absolute;
    right: 520px;
    top: 29px;
    width: 300px;
}

.el-table  /deep/ .cell{
    white-space: pre-wrap;
    text-align: center;
    /* padding: 0px 8px; */
}
</style>
