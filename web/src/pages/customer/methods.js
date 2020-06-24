import util from '../../common/js/util'
import { getCustomerListApi, searchCustomerApi, addCustomerApi, editCustomerApi, addCustomerRemarkApi, getShipperApi } from '../../api/customerAPI'

export default {
	// ---------------------------------------------------获取顾客列表数据-----------------------------
	getCustomerList() {
		this.loading = true
		getCustomerListApi().then(res => {
			this.customerList = res.data
			this.loading = false
		})
	},

	// 检查数据
	checkCustomerList(arr) {
		// 检查数据量是否超过100条
		if (arr.length > 100) {
			this.$notify({
				title: '成功',
				message: '数据量较大,建议按日期过滤',
				position: 'bottom-right',
				type: 'warning'
			})
		}
		return arr
	},
	//-------------------------------------------------------根据 年月日, 供货商查询------------------------------------------------------
	search() {
		if (this.searchForm.time == null) {
			this.searchForm.time = []
		}
		let para = {
			shipper: this.searchForm.shipper,
			begin: this.searchForm.time[0],
			end: this.searchForm.time[1],
			all: this.searchForm.checked
		}
		this.loading = true
		searchCustomerApi(para).then(res => {
			this.customerList = res.data
			this.show = true
			this.loading = false
		})
	},

	//--------------------------------------------搜索提醒方法-----------------------------------
	querySearch(queryString, cb) {
		var restaurants = this.restaurants
		var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
		cb(results)

		// 调用 callback 返回建议列表的数据
	},

	createFilter(queryString) {
		return restaurant => {
			return restaurant.customerValue.toLowerCase().indexOf(queryString.toLowerCase()) === 0
		}
	},

	// 获取所有出货人
	getShipper() {
		if (window.sessionStorage.getItem('customerValue') == null) {
			getShipperApi().then(res => {
				if (res.data == null) {
					this.$notify({
						title: '警告',
						message: '没有出货人数据可查询',
						type: 'warning',
						position: 'bottom-right'
					})
					return ''
				}
				var list = res.data
				var arr = []
				for (var i = 0; i < list.length; i++) {
					arr.push({
						customerValue: list[i]
					})
				}
				window.sessionStorage.setItem('customerValue', JSON.stringify(arr))
				this.restaurants = arr
			})
		} else {
			this.restaurants = JSON.parse(window.sessionStorage.getItem('customerValue'))
		}
	},

	// 搜索栏 选择出货人 触发的事件
	searchSelect(item) {
		this.searchForm.shipper = item.customerValue
		this.search()
	},
	// 新增顾客 选择出货人 触发的事件
	addSelect(item) {
		this.addCustomerForm.Shipper = item.customerValue
	},
	// 修改顾客 选择出货人 触发的事件
	editSelect(item) {
		this.editCustomerForm.Shipper = item.customerValue
	},

	//---------------------------------------------------------新增客户信息------------------------------------------------------------------------
	showCustomer() {
		this.customerFormDialogVisible = true
		this.$refs['addCustomerForm'].validate(valid => {
			if (this.addCustomerForm.DeliveryDate < this.addCustomerForm.SaleDate) {
				this.$notify.error({
					title: '错误',
					message: '送货时间晚于出单时间',
					position: 'bottom-right'
				})
			} else if (valid) {
				let para = Object.assign(this.addCustomerForm)
				addCustomerApi(para).then(res => {
					window.sessionStorage.removeItem('customerValue')
					this.getShipper()

					this.getCustomerList()
					this.customerFormDialogVisible = false
					this.$notify.success({
						title: '成功',
						message: '客户信息录入成功',
						position: 'bottom-right'
					})
				})
			} else {
				console.log('验证不通过')
			}
		})
	},

	// ----------------------------------------------------------修改客户信息------------------------------------------
	// 获取选中客户信息
	showEditForm(editForm) {
		this.editCustomerFormDialogVisible = true
		this.editCustomerForm = Object.assign({}, editForm)
		if (editForm.Status == 1) {
			this.editCustomerForm.Status = false
		} else {
			this.editCustomerForm.Status = true
		}
	},

	// 修改客户信息
	editForm() {
		if (this.editCustomerForm.DeliveryDate < this.editCustomerForm.SaleDate) {
			this.$notify.error({
				title: '错误',
				message: '送货时间晚于出单时间',
				position: 'bottom-right'
			})
			return ''
		}

		if (this.editCustomerForm.Status) {
			this.editCustomerForm.Status = 0
		} else {
			this.editCustomerForm.Status = 1
		}

		let para = Object.assign({}, this.editCustomerForm)
		editCustomerApi(this.editCustomerForm.Id, para).then(res => {
			window.sessionStorage.removeItem('customerValue')
			this.getShipper()
			this.getCustomerList()
			this.editCustomerFormDialogVisible = false
			this.$notify.success({
				title: '成功',
				message: '客户信息修改成功',
				position: 'bottom-right'
			})
		})
	},

	// ------------------------------------------------------------ 备注功能 ------------------------------------------------------------

	// 新增备注
	addRemark(row) {
		this.remarkForm.Remarks = row.Remarks
		this.remarkForm.Id = row.Id
		let _params = {
			remarks: this.remarkForm.Remarks
		}
		addCustomerRemarkApi(this.remarkForm.Id, util.getFormDataFromJson(_params)).then(res => {
			this.getCustomerList()
			this.showRemarkFormDialogVisible = false
			this.$notify.success({
				title: '成功',
				message: '修改备注成功',
				position: 'bottom-right'
			})
		})
	},

	// -------------------------------------------删除客户 ----------------------------------
	deleteCustomer(id) {
		this.$confirm('确认删除该用户?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			this.$axios.delete('http://localhost/customer/' + id).then(res => {
				this.getCustomerList()
				this.$notify.success({
					title: '成功',
					message: '删除成功',
					position: 'bottom-right'
				})
			})
		})
	},

	//-----------------------设置 已送货状态客户数据 行样式--------------------
	tableRowClassName({ row }) {
		if (row.Status == 0) {
			return 'over'
		}
		return ''
	},

	//------------------------------显示打印预览---------------------------
	print() {
		this.outVisible = true
	},

	//------------------------------表单重置---------------------------
	formClose(formName) {
		if (formName == 'searchRef') {
			this.searchForm.checked = false
			this.show = false
			this.getCustomerList()
		}
		if (this.$refs[formName] !== undefined) {
			this.$refs[formName].resetFields()
		}
	},

	// ----------------------------------------------------快速编辑 客户出货状态, 出货时间----------------------------------------------------------
	showFastEditStock(editForm) {
		this.showFastEditStockVisible = true
		this.editCustomerForm = Object.assign({}, editForm)
	},

	fastEditStock() {
		this.editCustomerForm.Status = 0
		let para = Object.assign({}, this.editCustomerForm)
		editCustomerApi(this.editCustomerForm.Id, para).then(res => {
			this.getCustomerList()
			this.showFastEditStockVisible = false
			this.$notify.success({
				title: '成功',
				message: '出库成功',
				position: 'bottom-right'
			})
		})
	},

	// 时间格式转换
	dataFormatter(row, column, cellValue, inde) {
		return util.dateTransformation(cellValue)
	},
	// 打印列表时间转换
	dataForma(value) {
		return util.dateTransformation(value)
	},

}
