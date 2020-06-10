<template>
	<section>
		<!-- --------------------------------------------------------------- 查找区 ------------------------------------------------ -->
		<el-card style="margin-bottom: 5px;height:70px">
			<el-row :gutter="20" style="margin-bottom: 20px;" type="flex" justify="space-around">
				<el-col style="padding:0px">
					<el-form :model="searchForm" :inline="true" class="form-inline" label-width="70px" ref="searchRef">
						<el-form-item prop="time" label="送货日期">
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
								v-model="searchForm.shipper"
								:fetch-suggestions="querySearch"
								placeholder="请输入出货人"
								@focus="getShipper"
								@select="handleSelect"
								value-key="customerValue"
								clearable
								@input="search"
								class="inputShipper"
							></el-autocomplete>
						</el-form-item>
						<el-checkbox v-model="searchForm.checked" @change="search">全部客户</el-checkbox>
						<el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
						<el-button @click="formClose('searchRef')" icon="el-icon-refresh-right">重置</el-button>
					</el-form>
				</el-col>
				<el-col class="btns" style="width:355px;padding:0px;padding-top:10px;margin:0px" type="flex" justify="end">
					<el-button type="success" @click="customerFormDialogVisible = true" icon="el-icon-plus">新增顾客</el-button>
					<el-button type="info" @click="print" class="printButton" icon="el-icon-printer">打印预览</el-button>
				</el-col>
			</el-row>
		</el-card>
		<!--------------------------------------------------------数据展示区-------------------------------------------------------->
		<el-card>
			<el-row>
				<el-table :data="customerList" border style="width:100%" :row-class-name="tableRowClassName" v-loading="loading">
					<el-table-column prop="Shipper" label="出货人" align="center" min-width="80px"></el-table-column>
					<el-table-column prop="DeliveryDate" label="送货日期" align="center" :formatter="dataFormatter" min-width="110px">
					</el-table-column>
					<el-table-column prop="Model" label="型号" align="center" min-width="80px"></el-table-column>
					<el-table-column prop="SaleDate" label="出单日期" align="center" :formatter="dataFormatter" min-width="110px"> </el-table-column>
					<el-table-column prop="Name" label="顾客姓名" align="center" min-width="80px"></el-table-column>
					<el-table-column prop="Phone" label="联系电话" align="center" min-width="130px"></el-table-column>
					<el-table-column prop="Status" label="状态" align="center" min-width="80px">
						<template slot-scope="scope">
							<span>
								{{scope.row.Status == 1?'未送货':'已送货'}}
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="Address" label="送货地址" align="center" min-width="160px"></el-table-column>
					<el-table-column prop="Remarks" label="备注" align="center" min-width="160px">
						<template slot-scope="scope">
							<el-input v-model="scope.row.Remarks" class="in" autosize @change="addRemark(scope.row)" type="textarea"> </el-input>
						</template>
					</el-table-column>
					<!-- 功能按钮区域 -->
					<el-table-column scope align="center" label="操作" min-width="160px">
						<template slot-scope="scope">
							<!-- 修改按钮 -->
							<el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
								<el-button
									icon="el-icon-setting"
									type="primary"
									@click="showEditForm(scope.row)"
									circle
									class="operation"
								></el-button>
							</el-tooltip>
							<!-- 修改送货状态 -->
							<el-tooltip class="item" effect="dark" content="送货状态修改" placement="top" :enterable="false">
								<el-button
									icon="el-icon-s-goods"
									type="success "
									@click="showSendStock(scope.row)"
									circle
									:disabled="scope.row.Status == 0 ? true : false"
									class="operation"
								></el-button>
							</el-tooltip>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
		</el-card>

		<!--------------------------------------------------------新增顾客信息对话框-------------------------------------------------------->
		<el-dialog title="顾客信息" :visible.sync="customerFormDialogVisible" width="800px" @close="formClose('setCustomerForm')">
			<el-form ref="setCustomerForm" :model="setCustomerForm" label-width="130px" :rules="formRules" :inline="true">
				<el-form-item label="出货人" prop="Shipper">
					<el-autocomplete
						class="inline-input"
						v-model="setCustomerForm.Shipper"
						:fetch-suggestions="querySearch"
						placeholder="请输入出货人"
						@focus="getShipper"
						@select="addSelect"
						value-key="customerValue"
					></el-autocomplete>
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
						:picker-options="pickerOptions"
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
						:picker-options="pickerOptions"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="备注 : " prop="Remarks">
					<el-input type="textarea" autosize v-model="setCustomerForm.Remarks" label="描述文字" style="width:220px"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="customerFormDialogVisible = false" icon="el-icon-close">取消</el-button>
				<el-button type="primary" @click="showCustomer" icon="el-icon-check">确认</el-button>
			</span>
		</el-dialog>

		<!--------------------------------------------------------修改顾客信息对话框-------------------------------------------------------->
		<el-dialog title="修改顾客信息" :visible.sync="editCustomerFormDialogVisible" width="800px" @close="formClose('editCustomerForm')">
			<el-form ref="editCustomerForm" :model="editCustomerForm" label-width="130px" :rules="formRules" :inline="true">
				<el-form-item label="出货人" prop="Shipper">
					<el-autocomplete
						class="inline-input"
						v-model="editCustomerForm.Shipper"
						:fetch-suggestions="querySearch"
						placeholder="请输入出货人"
						@focus="getShipper"
						@select="editSelect"
						value-key="customerValue"
					></el-autocomplete>
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
				<el-form-item label="出单时间" prop="SaleDate">
					<el-date-picker
						v-model="editCustomerForm.SaleDate"
						type="date"
						placeholder="选择日期"
						format="yyyy 年 MM 月 dd 日"
						value-format="timestamp"
						:picker-options="pickerOptions"
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
						:picker-options="pickerOptions"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="状态" prop="Status">
					<div>
						<el-checkbox v-model="editCustomerForm.Status" border label="已送货"></el-checkbox>
					</div>
				</el-form-item>
				<el-form-item label="备注" prop="Remarks">
					<el-input type="textarea" v-model="editCustomerForm.Remarks" label="描述文字" autosize style="width:220px"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editCustomerFormDialogVisible = false" icon="el-icon-close">取消</el-button>
				<el-button type="primary" @click="EditForm" icon="el-icon-check">确认</el-button>
			</span>
		</el-dialog>

		<!------------------------------------------------------- 修改送货状态对话框 ------------------------------------------------------->
		<el-dialog title="修改送货状态" :visible.sync="sendStockVisible" width="500px" @close="formClose('setCustomerForm')">
			<el-form ref="setCustomerForm" :model="editCustomerForm" label-width="160px" :rules="formRules">
				<el-form-item label="送货时间" prop="DeliveryDate">
					<el-date-picker
						v-model="editCustomerForm.DeliveryDate"
						type="date"
						placeholder="选择日期"
						format="yyyy 年 MM 月 dd 日"
						value-format="timestamp"
						:picker-options="pickerOptions"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="状态" prop="Status">
					<div>
						<el-checkbox v-model="editCustomerForm.Status" border label="已送货" @change="sendStock"></el-checkbox>
					</div>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!------------------------------------------------------- 打印对话框 ------------------------------------------------------->
		<el-dialog title="打印预览" :visible.sync="outVisible" width="1086px" class="print">
			<div class="dialog-footer" style="text-align: center; margin-bottom : 15px">
				<h2 v-if="show == true && searchForm.checked == true" style="color : red">
					包含已送货的客户信息
				</h2>
				<div style="display : flex; justify-content : space-between">
					<el-button @click="outVisible = false" icon="el-icon-close">取 消</el-button>
					<el-button v-print="'#print'" type="info" @click="print" class="printButton" icon="el-icon-check">打印</el-button>
				</div>
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
						<td class="printOhter">{{ item.Shipper }}</td>
						<td class="printOhter">
							{{ dataForma(item.SaleDate) }}
						</td>
						<td class="printOhter">
							{{ dataForma(item.DeliveryDate) }}
						</td>
						<td class="printOhter">{{ item.Name }}</td>
						<td class="printOhter">{{ item.Phone }}</td>
						<td class="printModel">{{ item.Model }}</td>
						<td class="printAddress">{{ item.Address }}</td>
						<td class="printRemarks">{{ item.Remarks }}</td>
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

.el-checkbox {
	line-height: 20px;
}

.coll {
	position: relative;
}

.el-table /deep/ .over {
	background-color: #ffd700;
}

.el-table /deep/ .cell {
	/* white-space: pre-wrap; */
	text-align: center;
}

.el-table /deep/ .operation {
	margin: 0 5px;
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
}

#print table thead {
	font-weight: bold;
}

#print table td {
	padding: 3px;
}

.printModel {
	width: 130px;
}
.printRemarks {
	width: 170px;
}

.printOhter {
	width: 100px;
}
.printAddress {
	width: 300px;
}

.el-card /deep/ .el-card__body {
	padding: 3px;
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
	height: 41px;
}

.el-form /deep/ .el-input-number {
	width: 240px;
}

.printButton {
	background-color: #bf1f1f;
	border-color: #bf1f1f;
}

.el-form /deep/ .inputShipper  {
	width: 200px;
}

.el-form /deep/ .el-checkbox__inner{
	margin-left: 20px;
}
</style>
