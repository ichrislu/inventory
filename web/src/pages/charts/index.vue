<template>
	<section>
		<el-card style="margin:0px">
			<el-row :gutter="0">
				<el-col :span="6">
					<el-card>
						<div style="margin:5px"><h3>冰箱库存</h3></div>
						<div id="refrigeratorInventory" :style="{ height: '200px' }"></div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card>
						<div style="margin:5px"><h3>洗衣机库存</h3></div>
						<div id="washingMachineInventory" :style="{ height: '200px' }"></div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card>
						<div style="margin:5px"><h3>空调库存</h3></div>
						<div id="airCconditionerInventory" :style="{ height: '200px' }"></div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card>
						<div style="margin:5px"><h3>彩电库存</h3></div>
						<div id="televisionInventory" :style="{ height: '200px' }"></div>
					</el-card>
				</el-col>
			</el-row>
			<el-row>
				<el-card>
					<el-col :span="12">
						<div style="margin:5px"><h3>冰箱销量</h3></div>
						<div id="refrigeratorSales" :style="{ height: '300px' }"></div>
					</el-col>
					<el-col :span="12">
						<div style="margin:5px"><h3>洗衣机销量</h3></div>
						<div id="washingMachineSales" :style="{ height: '300px' }"></div>
					</el-col>
				</el-card>
			</el-row>
			<el-row>
				<el-card>
					<el-col :span="12">
						<div style="margin:5px"><h3>空调销量</h3></div>
						<div id="airConditionerSales" :style="{ height: '300px' }"></div>
					</el-col>
					<el-col :span="12">
						<div style="margin:5px"><h3>彩电销量</h3></div>
						<div id="televisionSales" :style="{ height: '300px' }"></div>
					</el-col>
				</el-card>
			</el-row>
		</el-card>
	</section>
</template>

<script>
import data from '../charts/data'
import methods from '../charts/methods'

// let echarts = require('echarts/lib/echarts')
// require('echarts/lib/chart/pie')
// // 引入柱状图
// require('echarts/lib/chart/bar')
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')

export default {
	created() {
	},
	data() {
		return data.init()
	},
	methods: methods,
	mounted() {
		this.refrigeratorInventory()
		this.washingMachineInventory()
		this.airCconditionerInventory()
		this.televisionInventory()
		this.refrigeratorSales()
		this.washingMachineSales()
		this.airConditionerSales()
		this.televisionSales()
	}
}
</script>

<style scope>
.el-card__body {
	padding: 0px;
}
.el-row,
.el-row {
	width: auto;
	height: auto;
}
.el-card {
	margin: 10px;
}
</style>
