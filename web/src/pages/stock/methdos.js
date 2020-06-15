import util from '../../common/js/util'
import {
	getStockListApi,
	searchStockApi,
	addStockApi,
	addRemarkApi,
	editStockApi,
	saledApi,
	deleteStockApi,
	getProviderApi
} from '../../api/stockApi'
export default {
	// ---------------------------------------------------- 获取库存列表数据--------------------------------------------------
	getList() {
		if (window.sessionStorage.length == 0) {
			this.$router.push({
				path: '/category'
			})
		}
		this.loading = true
		getStockListApi().then(res => {
			this.stockList = util.setCategory(res.data)
			this.options = JSON.parse(window.sessionStorage.getItem('pickValue'))
			this.loading = false
			if (this.stockList.length > 100) {
				this.$notify({
					title: '警告',
					message: '数据量较大,建议按日期过滤',
					position: 'bottom-right',
					type: 'warning'
				})
			}
		})
	},

	//-------------------------------------------------------根据 年月日, 供货商查询------------------------------------------------------
	// 查询功能
	search() {
		this.loading = true
		if (this.searchForm.time == null) {
			this.searchForm.time = []
		}
		let para = {
			provider: this.searchForm.keyword,
			begin: this.searchForm.time[0],
			end: this.searchForm.time[1],
			all: this.searchForm.checked
		}
		searchStockApi(para)
			.then(res => {
				this.stockList = util.setCategory(res.data)
				this.loading = false
			})
			.catch(err => {
				console.log(err.response)
			})
	},

	// ------------------------------------------------------ 新增库存  ------------------------------------------------------------------
	addStock() {
		this.$refs['addForm'].validate(valid => {
			if (valid) {
				let para = Object.assign(this.addForm)
				console.log(para.Bid);

				para.Price = parseFloat(this.addForm.Price)
				addStockApi(para).then(res => {
					this.addValue = []
					this.$notify.success({
						title: '成功',
						message: '入库成功',
						position: 'bottom-right'
					})
					window.sessionStorage.removeItem('stockValue')
					this.getProvider()
					this.getList()
					this.showAddFormDialogVisible = false
				})
			}
		})
	},
	// 新增库存分类 级联选择
	addChangeRef() {
		const nodesObj = this.$refs['cascader'].getCheckedNodes()
		const Id = nodesObj[0].data.Id
		this.addForm.Bid = Id
	},

	// ------------------------------------------------------------ 备注功能 ------------------------------------------------------------

	// 新增备注
	addRemark(row) {
		this.remarkForm.Remarks = row.Remarks
		this.remarkForm.Id = row.Id

		let _params = {
			remarks: this.remarkForm.Remarks
		}
		addRemarkApi(this.remarkForm.Id, util.getFormDataFromJson(_params))
			.then(() => {
				this.getList()
				this.$notify.success({
					title: '成功',
					message: '备注添加成功',
					position: 'bottom-right'
				})
			})
			.catch(err => {
				console.log(err.response)
			})
	},

	// ----------------------------------------------------------修改库存数据------------------------------------------
	// 获取选中库存数据
	showDditForm(editForm) {
		this.editForm = Object.assign({}, editForm)
		this.editValue = [editForm.Category, editForm.Brand]
		this.editForm.Id = editForm.Id
		this.editForm.EditNum = editForm.Quantity - editForm.Inventory
		this.showEditFormDialogVisible = true
	},

	changePrice() {
		this.$notify({
			title: '警告',
			message: '修改价格需要重新计算利润',
			position: 'bottom-right',
			type: 'warning'
		})
	},

	// 修改库存 分类级联选择
	editChangeRef() {
		const nodesObj = this.$refs['editCascader'].getCheckedNodes()
		const Id = nodesObj[0].data.Id
		this.editForm.Bid = Id
	},

	// 修改库存
	editFormHandler() {
			this.$refs['editForm'].validate(valid => {
				if (valid) {
					let para = Object.assign({}, this.editForm)
					para.Price = parseFloat(this.editForm.Price)
					editStockApi(this.editForm.Id, util.getFormDataFromJson(para)).then(res => {
						this.$notify.success({
							title: '成功',
							message: '修改成功',
							position: 'bottom-right'
						})
						window.sessionStorage.removeItem('stockValue')
						this.getProvider()
						this.getList()
						this.showEditFormDialogVisible = false
					})
				}
			})
	},

	// ------------------------------------------- 出库功能 ------------------------------
	// 获取 将要出库的商品信息
	showSaled(saled) {
		this.saledForm = Object.assign({}, saled)
		this.classification = saled.Category + ' / ' + saled.Brand
		this.saledForm.Sid = saled.Id
		this.saledForm.Quantity = 0
		this.saledFormDialogVisible = true
	},

	// 一键出库
	Saled() {
		if (this.saledForm.Date > this.saledForm.OutDate && this.saledForm.OutDate != null ) {

			this.$notify.error({
				title: '错误',
				message: '出库时间不能早于入库时间',
				position: 'bottom-right'
			})
		} else {
			this.$refs['saledForm'].validate(valid => {
				if (valid) {
					let para = Object.assign(this.saledForm)
					para.Price = parseFloat(this.saledForm.Sell)
					para.Date = this.saledForm.OutDate

					saledApi(para).then(() => {
						this.saledFormDialogVisible = false
						this.getList()
						this.$notify.success({
							title: '成功',
							message: '出库成功',
							position: 'bottom-right'
						})
					})
				} else {
					console.log('出库信息验证未通过')
				}
			})
		}
	},

	//-----------------------设置表格每行样式--------------------
	tableRowClassName({ row }) {
		if (row.Inventory == 0) {
			return 'over'
		}
		return ''
	},

	// -------------------------------------------删除库存 ----------------------------------
	deleteStock(id) {
		deleteStockApi(id).then(res => {
			this.getList()
			this.$notify.success({
				title: '成功',
				message: '删除成功',
				position: 'bottom-right'
			})
		})
	},

	// 时间格式转换
	dataFormatter(row, column, cellValue, inde) {
		return util.dateTransformation(cellValue)
	},

	//-----------------------------------------表单重置-----------------------------------------
	formClose(formName) {
		if (formName === 'addForm') {
			this.addValue = []
		}

		if (formName === 'searchRef') {
			this.searchForm.checked = false
			this.getList()
		}

		if (this.$refs[formName] !== undefined) {
			this.$refs[formName].resetFields()
		}
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
			return restaurant.stockValue.toLowerCase().indexOf(queryString.toLowerCase()) === 0
		}
	},

	// 获取所有供货商
	getProvider() {
		if (window.sessionStorage.getItem('stockValue') == null) {
			getProviderApi().then(res => {
				if (res.data == null) {
					this.$notify({
						title: '警告',
						message: '没有供货商数据可查询',
						type: 'warning',
						position: 'bottom-right'
					})
					return ''
				}
				var list = res.data
				var arr = []
				for (var i = 0; i < list.length; i++) {
					arr.push({
						stockValue: list[i]
					})
				}
				window.sessionStorage.setItem('stockValue', JSON.stringify(arr))
				this.restaurants = arr
			})
		} else {
			this.restaurants = JSON.parse(window.sessionStorage.getItem('stockValue'))
		}
	},

	handleSelect(item) {
		this.searchForm.keyword = item.stockValue
		this.search()
	},

	addSelect(item) {
		this.addForm.Provider = item.stockValue
	},
	editSelect(item) {
		this.editForm.Provider = item.stockValue
	}
}
