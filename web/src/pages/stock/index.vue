<template>
	<section>
		<!----------------------------------------------------------------- 查找区 ------------------------------------------------ -->
		<el-card style="margin-bottom: 5px;height:70px;">
			<el-row :gutter="20" type="flex" justify="space-around">
				<el-col style="padding:0px">
					<el-form :model="searchForm" :inline="true" class="form-inline" label-width="70px" ref="searchRef">
						<el-form-item prop="time" label="进货时间">
							<el-date-picker
								v-model="searchForm.time"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								value-format="timestamp"
								unlink-panels
								:picker-options="searchForm.pickerOptions"
								style="width:260px"
							>
							</el-date-picker>
						</el-form-item>
						<el-form-item label="供货商" prop="keyword">
							<el-autocomplete
								class="inline-input"
								v-model="searchForm.keyword"
								:fetch-suggestions="querySearch"
								placeholder="请输入供货商"
								@focus="getProvider"
								@select="handleSelect"
								value-key="stockValue"
								clearable
								@input="search"
							></el-autocomplete>
						</el-form-item>
						<el-checkbox v-model="searchForm.checked" @change="search">全部库存</el-checkbox>
						<el-button type="primary" @click="search" icon="el-icon-search" style="margin: 0px 6px">查询</el-button>
						<el-button @click="formClose('searchRef')" icon="el-icon-refresh-right">重置</el-button>
					</el-form>
				</el-col>
				<el-col style="width:160px;padding:10px;">
					<el-button type="success" @click="showAddFormDialogVisible = true" icon="el-icon-plus">新增库存</el-button>
				</el-col>
			</el-row>
		</el-card>

		<!----------------------------------------------------------------- 数据展示区 ------------------------------------------------ -->
		<el-card>
			<!-- <el-button @click="toTableTop">123</el-button> -->
			<el-row>
				<el-table
					:data="stockList"
					border
					style="width: 100% "
					:row-class-name="tableRowClassName"
					v-loading="loading"
					height="850px"
					class="table"
					ref="table"
					:default-sort="{ prop: 'Date', order: 'descending' }"
				>
					<el-table-column prop="Provider" label="供货商" align="center"> </el-table-column>
					<el-table-column prop="Date" label="进货时间" align="center" :formatter="dataFormatter" min-width="95px" sortable>
					</el-table-column>
					<el-table-column prop="Category" label="品类" align="center"> </el-table-column>
					<el-table-column prop="Brand" label="品牌" align="center"></el-table-column>
					<el-table-column prop="Model" label="型号" align="center"></el-table-column>
					<el-table-column prop="Price" label="进货价格" align="center"> </el-table-column>
					<el-table-column prop="Quantity" label="此单总量" align="center"> </el-table-column>
					<el-table-column prop="Inventory" label="库存余量" align="center"> </el-table-column>
					<el-table-column prop="Remarks" label="备注" min-width="200px" align="center" class="remark"> </el-table-column>
					<!-- 功能按钮区域 -->
					<el-table-column width="220px" scope label="操作" align="center">
						<template slot-scope="scope">
							<!-- 修改按钮 -->
							<el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
								<el-button
									icon="el-icon-setting"
									type="primary"
									@click="showDditForm(scope.row)"
									circle
									class="operation"
								></el-button>
							</el-tooltip>
							<!-- 出库按钮 -->
							<el-tooltip class="item" effect="dark" content="出库" placement="top" :enterable="false">
								<el-button
									icon="el-icon-s-promotion"
									type="success"
									@click="showSaled(scope.row)"
									circle
									:disabled="scope.row.Inventory == 0 ? true : false"
									class="operation"
								></el-button>
							</el-tooltip>
							<!-- 删除按钮 -->
							<el-tooltip class="item" effect="dark" content="删除库存" placement="top" :enterable="false">
								<el-popconfirm
									confirmButtonText="确认"
									cancelButtonText="取消"
									icon="el-icon-delete-solid"
									iconColor="red"
									title="确认删除该库存吗?"
									@onConfirm="deleteStock(scope.row.Id)"
									class="operation"
								>
									<el-button slot="reference" type="danger" circle icon="el-icon-delete-solid" size="small"></el-button>
								</el-popconfirm>
							</el-tooltip>
						</template>
					</el-table-column>
					<!-- <el-backtop target=".el-table__body-wrapper .is-scrolling-none"></el-backtop> -->
				</el-table>
			</el-row>
		</el-card>

		<!--------------------------------------------------------新增库存对话框-------------------------------------------------------->
		<el-dialog title="新增库存" :visible.sync="showAddFormDialogVisible" width="800px" @close="formClose('addForm')">
			<el-form ref="addForm" :model="addForm" label-width="130px" :rules="addFormRules" :inline="true">
				<el-form-item label="供货商" prop="Provider">
					<el-autocomplete
						class="inline-input"
						v-model="addForm.Provider"
						:fetch-suggestions="querySearch"
						placeholder="请输入供货商"
						@focus="getProvider"
						@select="addSelect"
						value-key="stockValue"
					></el-autocomplete>
				</el-form-item>
				<el-form-item label="进货时间" prop="Date">
					<el-date-picker
						v-model="addForm.Date"
						type="date"
						placeholder="选择日期"
						format="yyyy 年 MM 月 dd 日"
						value-format="timestamp"
						:picker-options="addFormPickerOptions"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="品类">
					<el-cascader
						v-model="addValue"
						:options="options"
						:props="{ value: 'Name', label: 'Name', children: 'Category', expandTrigger: 'hover' }"
						@change="addChangeRef"
						ref="cascader"
					>
					</el-cascader>
				</el-form-item>
				<el-form-item label="型号" prop="Model">
					<el-input v-model="addForm.Model"></el-input>
				</el-form-item>
				<el-form-item label="进货价格(元)" prop="Price">
					<el-input v-model="addForm.Price"> </el-input>
				</el-form-item>
				<el-form-item label="此单总量(件)" prop="Quantity">
					<el-input-number v-model="addForm.Quantity" label="描述文字" :min="0" :precision="0" controls-position="right"></el-input-number>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showAddFormDialogVisible = false" icon="el-icon-close">取消</el-button>
				<el-button type="primary" @click="addStock" icon="el-icon-check">确定</el-button>
			</span>
		</el-dialog>

		<!--------------------------------------------------------修改库存对话框-------------------------------------------------------->
		<el-dialog title="修改库存" :visible.sync="showEditFormDialogVisible" width="800px" @close="formClose('editForm')">
			<el-form ref="editForm" :model="editForm" label-width="130px" :rules="addFormRules" :inline="true">
				<el-form-item label="供应商" prop="Provider">
					<el-autocomplete
						class="inline-input"
						v-model="editForm.Provider"
						:fetch-suggestions="querySearch"
						placeholder="请输入供货商"
						@focus="getProvider"
						@select="editSelect"
						value-key="stockValue"
					></el-autocomplete>
				</el-form-item>
				<el-form-item label="进货时间" prop="Date">
					<el-date-picker
						v-model="editForm.Date"
						type="date"
						placeholder="选择日期"
						format="yyyy 年 MM 月 dd 日"
						value-format="timestamp"
						:picker-options="addFormPickerOptions"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="品类">
					<el-cascader
						v-model="editValue"
						:options="options"
						:props="{ value: 'Name', label: 'Name', children: 'Category', expandTrigger: 'hover' }"
						@change="editChangeRef"
						ref="editCascader"
					>
					</el-cascader>
				</el-form-item>
				<el-form-item label="型号" prop="Model">
					<el-input v-model="editForm.Model"></el-input>
				</el-form-item>
				<el-form-item label="进货价格(元)" prop="Price">
					<el-input v-model="editForm.Price"></el-input>
				</el-form-item>
				<el-form-item label="此单总量(件)" prop="Quantity">
					<el-input-number v-model="editForm.Quantity" label="描述文字" :min="0" :precision="0" controls-position="right"></el-input-number>
				</el-form-item>
				<el-form-item label="已销售数量(件)" prop="EditNum">
					<el-input v-model="editForm.EditNum" label="描述文字" disabled></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="Remarks">
					<el-input v-model="editForm.Remarks" label="描述文字" type="textarea" autosize style="width:220px"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showEditFormDialogVisible = false" icon="el-icon-close">取消</el-button>
				<el-button type="primary" @click="editFormHandler" icon="el-icon-check">确认</el-button>
			</span>
		</el-dialog>

		<!--------------------------------------------------------出库对话框-------------------------------------------------------->
		<el-dialog title="出库" :visible.sync="saledFormDialogVisible" width="800px" @close="formClose('saledForm')">
			<el-form ref="saledForm" :model="saledForm" label-width="130px" :rules="addFormRules" :inline="true">
				<el-form-item label="供应商">
					<el-input v-model="saledForm.Provider" disabled></el-input>
				</el-form-item>
				<el-form-item label="品类">
					<el-input v-model="classification" disabled></el-input>
				</el-form-item>
				<el-form-item label="型号">
					<el-input v-model="saledForm.Model" disabled></el-input>
				</el-form-item>
				<el-form-item label="入库时间">
					<el-date-picker
						v-model="saledForm.Date"
						type="date"
						placeholder="选择日期"
						format="yyyy 年 MM 月 dd 日"
						value-format="timestamp"
						disabled
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="此单库存(件)">
					<el-input v-model="saledForm.Inventory" disabled></el-input>
				</el-form-item>
				<el-form-item label="进货价格(元)">
					<el-input v-model="saledForm.Price" disabled></el-input>
				</el-form-item>
				<el-form-item label="出货人" prop="Shipper">
					<el-input v-model="saledForm.Shipper" label="描述文字"></el-input>
				</el-form-item>
				<el-form-item label="出库时间" prop="OutDate">
					<el-date-picker
						v-model="saledForm.OutDate"
						type="date"
						placeholder="选择日期"
						format="yyyy 年 MM 月 dd 日"
						value-format="timestamp"
						:picker-options="pickerOptions"
					>
					</el-date-picker>
				</el-form-item>

				<el-form-item label="出库数量(件)" prop="Quantity">
					<el-input-number
						v-model="saledForm.Quantity"
						label="描述文字"
						:min="0"
						:precision="0"
						controls-position="right"
					></el-input-number>
				</el-form-item>

				<el-form-item label="售价(元)" prop="Sell">
					<el-input v-model="saledForm.Sell" label="描述文字"> </el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="saledFormDialogVisible = false" icon="el-icon-close">取消</el-button>
				<el-button type="primary" @click="Saled" icon="el-icon-check">确认</el-button>
			</span>
		</el-dialog>
	</section>
</template>
<script>
import datas from './datas.js'
import methods from './methdos.js'
import util from '../../common/js/util.js'

export default {
	data() {
		return datas.init()
	},
	created() {
		this.getList()
	},
	methods: methods,
	mounted() {}
}
</script>

<style scoped>
.el-table {
	margin-top: 15px;
}

.el-table .el-table-column {
	padding: 0px;
}

.el-table /deep/ .operation {
	margin: 0 10px;
}

.el-col {
	margin: 0 20px;
}

.coll {
	position: relative;
}

.el-table /deep/ .over {
	background-color: #ffd700;
}

.el-table /deep/ .cell {
	white-space: pre-wrap;
}

.el-card /deep/ .el-card__body {
	padding: 5px;
}

.el-row /deep/ .form-inline {
	padding-top: 10px;
}

.editRemark /deep/ .el-textarea__inner {
	border: none;
	resize: none;
	padding: 0;
	font-size: 14px;
	overflow: hidden;
}
.editInput /deep/ .el-input__inner {
	border: none;
	resize: none;
	padding: 0;
	font-size: 14px;
}
.editInputDate /deep/ .el-input__inner {
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
	width: 220px;
}

.el-dialog /deep/ .el-textarea__inner {
	height: 40px;
	width: 220px;
	padding: 0;
}

/*
el-table 滚动条样式
.el-table /deep/ .-webkit-scrollbar-thumb {

    background-color: #000;
} */

::-webkit-scrollbar {
	background-color: #000;
}
</style>
