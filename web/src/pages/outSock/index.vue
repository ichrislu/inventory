<template>
    <section style="height:100%">
        <el-card style="margin-bottom: 5px;height:70px">
            <!-- --------------------------------------------------------------- 查找区 ------------------------------------------------ -->
            <el-row :gutter="20" style="margin-bottom: 20px;padding-left:20px">
                <el-form :model="searchForm" :inline="true" class="form-inline" label-width="70px" ref="searchRef">
                    <el-form-item prop="time" label="入库日期">
                        <el-date-picker
                            unlink-panels
                            v-model="searchForm.time"
                            value-format="timestamp"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="searchForm.pickerOptions"
                            style="width:260px"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="出货人" prop="shipper">
                        <el-autocomplete
                            class="inline-input"
                            v-model="searchForm.shipper"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入出货人"
                            @focus="getShipper"
                            @select="handleSelect"
                            value-key="outStockValue"
                            clearable
                            @input="search"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
                    <el-button @click="formClose('searchRef')" icon="el-icon-refresh-right">重置</el-button>
                </el-form>
            </el-row>
        </el-card>
        <el-card>
            <!-- --------------------------------------------------------------- 数据展示区 ------------------------------------------------ -->
            <el-table
                :data="outStockList"
                border
                style="width: 100%;"
                stripe
                v-el-table-infinite-scroll="scroll"
                v-loading="loading"
                ref="table"
                height="800px"
            >
                <!-- :height="tableHeight" -->
                <el-table-column prop="Shipper" label="出货人" align="center"></el-table-column>
                <el-table-column prop="OutDate" label="入库日期" align="center" :formatter="dataFormatter" min-width="100px"> </el-table-column>
                <el-table-column prop="Provider" label="供应商" align="center"></el-table-column>
                <el-table-column prop="InDate" label="进货日期" align="center" :formatter="dataFormatter" min-width="100px"> </el-table-column>
                <el-table-column prop="Category" label="品类" align="center"></el-table-column>
                <el-table-column prop="Brand" label="品牌" align="center"></el-table-column>
                <el-table-column prop="Model" label="型号" align="center"></el-table-column>
                <el-table-column prop="InPrice" label="进货价格(元)" align="center"></el-table-column>
                <el-table-column prop="OutPrice" label="出货价格(元)" align="center"></el-table-column>
                <el-table-column prop="Quantity" label="数量(件)" align="center"></el-table-column>
                <el-table-column prop="Profit" label="利润(元)" align="center"></el-table-column>
                <el-table-column prop="Remarks" label="备注" align="center" min-width="150px">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.Remarks" class="in" autosize @change="addRemark(scope.row)" type="textarea"> </el-input>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </section>
</template>

<script>
import datas from './datas.js'
import methods from './methods.js'
import util from '../../common/js/util'
import elTableInfiniteScroll from 'el-table-infinite-scroll'

export default {
    data() {
        return datas.init()
    },
    created() {},
    methods: methods,
    directives: {
        'el-table-infinite-scroll': elTableInfiniteScroll
    },
    // mounted() {
    //     this.$nextTick(function() {
    //         this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 0

    //         // 监听窗口大小变化
    //         let self = this
    //         window.onresize = function() {
    //             self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 50
    //         }
    //     })
    //     //this.$refs.table.$el.offsetTop：表格距离浏览器的高度 //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
    // }
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

.el-table /deep/ .cell {
    white-space: pre-wrap;
    text-align: center;
    /* padding: 0px 8px; */
}

.el-card /deep/ .el-card__body {
    padding: 5px;
}

.el-row /deep/ .form-inline {
    padding-top: 10px;
}

.in /deep/ .el-textarea__inner {
    border: none;
    resize: none;
    padding: 0;
    font-size: 14px;
}

.el-form /deep/ .el-input__inner {
    width: 220px;
}
</style>
