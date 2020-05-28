<template>
    <section>
        <el-card style="margin-bottom: 20px;">
            <!-- --------------------------------------------------------------- 查找区 ------------------------------------------------ -->
            <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-form :model="searchForm" :inline="true" class="demo-form-inline" label-width="110px" ref="searchRef">
                    <el-form-item prop="time" label="送货日期">
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
                    <el-checkbox v-model="searchForm.checked">全部客户</el-checkbox>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button @click="formClose('searchRef')">重置</el-button>
                </el-form>
            </el-row>
        </el-card>
        <el-card>
            <!-- --------------------------------------------------------------- 数据展示区 ------------------------------------------------ -->
            <el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="20">
                        <div>数据列表</div>
                    </el-col>
                    <el-row type="flex" justify="end">
                        <el-button type="success" @click="customerFormDialogVisible = true">新增客户</el-button>
                        <el-button type="primary" @click="print">打印预览</el-button>
                    </el-row>
                </el-row>
                <el-table :data="customerList" border style="width: 100%" :row-class-name="tableRowClassName">
                    <el-table-column prop="Shipper" label="出货人" align="center"></el-table-column>
                    <el-table-column prop="SaleDate" label="出单日期" align="center" :formatter="dataFormatter"> </el-table-column>
                    <el-table-column prop="DeliveryDate" label="送货日期" align="center" :formatter="dataFormatter"> </el-table-column>
                    <el-table-column prop="Model" label="型号" align="center"></el-table-column>
                    <el-table-column prop="Name" label="顾客姓名" align="center"></el-table-column>
                    <el-table-column prop="Phone" label="联系电话" align="center"></el-table-column>
                    <el-table-column prop="Address" label="送货地址" align="center"></el-table-column>
                    <el-table-column prop="Remarks" label="备注" align="center" width="150px"></el-table-column>
                    <el-table-column prop="Status" label="状态" align="center">
                        <template slot-scope="scope">
                            <div>{{ scope.row.Status == 1 ? '未送货' : '已送货' }}</div>
                        </template>
                    </el-table-column>
                    <!-- 功能按钮区域 -->
                    <el-table-column scope align="center" label="操作" width="300px">
                        <template slot-scope="scope">
                            <!-- 修改按钮 -->
                            <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
                                <el-button icon="el-icon-setting" size="medium " type="primary" @click="showEditForm(scope.row)"></el-button>
                            </el-tooltip>
                            <!-- 备注按钮 -->
                            <el-tooltip class="item" effect="dark" content="添加备注" placement="top" :enterable="false">
                                <el-button icon="el-icon-edit" size="medium " type="success" @click="showRemark(scope.row)"></el-button>
                            </el-tooltip>
                            <!-- 确认出库按钮 -->
                            <el-tooltip class="item" effect="dark" content="确认出库" placement="top" :enterable="false">
                                <el-button icon="el-icon-s-goods" size="medium " type="warning" @click="showSendStock(scope.row)"></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-card>

        <!--------------------------------------------------------录入客户信息对话框-------------------------------------------------------->
        <el-dialog title="客户信息" :visible.sync="customerFormDialogVisible" width="30%" @close="formClose('setCustomerForm')">
            <el-form ref="setCustomerForm" :model="setCustomerForm" label-width="120px" :rules="formRules">
                <el-form-item label="出货人" prop="Shipper">
                    <el-input v-model="setCustomerForm.Shipper" label="描述文字"></el-input>
                </el-form-item>
                <el-form-item label="型号" prop="Model">
                    <el-input v-model="setCustomerForm.Model"></el-input>
                </el-form-item>
                <el-form-item label="顾客姓名" prop="Name">
                    <el-input v-model="setCustomerForm.Name" label="描述文字"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="Phone">
                    <el-input v-model="setCustomerForm.Phone" label="描述文字"></el-input>
                </el-form-item>
                <el-form-item label="收货地址" prop="Address">
                    <el-input v-model="setCustomerForm.Address" label="描述文字"></el-input>
                </el-form-item>
                <el-form-item label="出单时间" prop="SaleDate">
                    <el-date-picker
                        v-model="setCustomerForm.SaleDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="送货时间" prop="DeliveryDate">
                    <el-date-picker
                        v-model="setCustomerForm.DeliveryDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注 : " prop="Remarks">
                    <el-input type="textarea" autosize v-model="setCustomerForm.Remarks" label="描述文字"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="customerFormDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="showCustomer">确认</el-button>
            </span>
        </el-dialog>

        <!--------------------------------------------------------修改客户信息对话框-------------------------------------------------------->
        <el-dialog title="出库" :visible.sync="editCustomerFormDialogVisible" width="30%" @close="formClose('editCustomerForm')">
            <el-form ref="editCustomerForm" :model="editCustomerForm" label-width="120px" :rules="formRules">
                <el-form-item label="出货人" prop="Shipper">
                    <el-input v-model="editCustomerForm.Shipper" label="描述文字"></el-input>
                </el-form-item>
                <el-form-item label="型号" prop="Model">
                    <el-input v-model="editCustomerForm.Model"></el-input>
                </el-form-item>
                <el-form-item label="顾客姓名" prop="Name" :rules="[{ required: true, message: '请输入顾客姓名' }]">
                    <el-input v-model="editCustomerForm.Name" label="描述文字"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="Phone">
                    <el-input v-model="editCustomerForm.Phone" label="描述文字"></el-input>
                </el-form-item>
                <el-form-item label="收货地址" prop="Address">
                    <el-input v-model="editCustomerForm.Address" label="描述文字"></el-input>
                </el-form-item>
                <!-- <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="editCustomerForm.status">
                        <el-radio :label="1">未送货</el-radio>
                        <el-radio :label="0">已送货</el-radio>
                    </el-radio-group>
                </el-form-item> -->
                <el-form-item label="出单时间" prop="SaleDate">
                    <el-date-picker
                        v-model="editCustomerForm.SaleDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="送货时间" prop="DeliveryDate">
                    <el-date-picker
                        v-model="editCustomerForm.DeliveryDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp"
                    >
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editCustomerFormDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="EditForm">确认</el-button>
            </span>
        </el-dialog>

        <!-- 备注对话框 -->
        <el-dialog title="添加备注" :visible.sync="showRemarkFormDialogVisible" width="30%" @close="formClose('customerForm')">
            <el-form ref="customerForm" :model="remarkForm" label-width="120px">
                <el-form-item label="备注" prop="Remarks">
                    <el-input type="textarea" placeholder="请输入内容" v-model="remarkForm.Remarks" maxlength="200" size="max" autosize> </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showRemarkFormDialogVisible = false">取消添加</el-button>
                <el-button type="primary" @click="addRemark">确定添加</el-button>
            </span>
        </el-dialog>

        <!-- 出库对话框 -->
        <el-dialog title="出库" :visible.sync="sendStockVisible" width="30%">
            <el-form ref="setCustomerForm" :model="editCustomerForm" label-width="120px" :rules="formRules">
                <!-- <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="editCustomerForm.status">
                        <el-radio :label="1">未送货</el-radio>
                        <el-radio :label="0">已送货</el-radio>
                    </el-radio-group>
                </el-form-item> -->
                <el-form-item label="送货时间" prop="deliveryDate">
                    <el-date-picker
                        v-model="editCustomerForm.deliveryDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp"
                    >
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="sendStockVisible = false">取消</el-button>
                <el-button type="primary" @click="sendStock">确认</el-button>
            </span>
        </el-dialog>

        <!-- 打印对话框 -->
        <el-dialog title="打印预览" :visible.sync="outVisible" width="1086px" class="print">
            <div class="dialog-footer" style="text-align: center; margin-bottom : 15px">
                <h2 v-if="show == true">包含已送货的客户信息</h2>
                <el-button @click="outVisible = false">取 消</el-button>
                <el-button v-print="'#print'" type="primary" @click="print">打印</el-button>
            </div>
            <div id="print">
                <table width="100%" height="100%" border="1px solid black">
                    <thead>
                        <tr>
                            <td>出货人</td>
                            <td>出单日期</td>
                            <td>送货日期</td>
                            <td>顾客姓名</td>
                            <td>联系电话</td>
                            <td>型号</td>
                            <td>送货地址</td>
                            <td>备注</td>
                        </tr>
                    </thead>
                    <tr v-for="item in customerList" :key="item.id">
                        <td class="printTwo">{{ item.Shipper }}</td>
                        <td class="printTwo">{{ dataForma(item.SaleDate) }}</td>
                        <td class="printTwo">{{ dataForma(item.DeliveryDate) }}</td>
                        <td class="printTwo">{{ item.Name }}</td>
                        <td class="printTwo">{{ item.Phone }}</td>
                        <td class="printOne">{{ item.Model }}</td>
                        <td class="printThree">{{ item.Address }}</td>
                        <td class="printOne">{{ item.Remarks }}</td>
                    </tr>
                </table>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import datas from './datas.js'
import methods from './methods.js'
import util from '../../common/js/util'
var mediaQueryList = window.matchMedia('print')

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

<style scoped media="print">
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

.el-table /deep/ .over {
    background-color: #ffd700;
}

.el-table /deep/ .cell {
    white-space: pre-wrap;
    text-align: center;
    padding: 0px;
}

.printTable {
    margin-top: 0;
}

.printTable /deep/ td {
    padding: 8px 0px;
}
@page {
    size: A4 landscape;
    margin: 10px;
}

#print table {
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
    font-size: 14px;
    white-space: pre-wrap;
}

#print table thead {
    font-weight: bold;
}

#print table td {
    padding: 3px;
}

.printOne {
    width: 130px;
}

.printTwo {
    width: 100px;
}
.printThree {
    width: 300px;
}
</style>
