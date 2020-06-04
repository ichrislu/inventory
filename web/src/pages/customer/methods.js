import util from '../../common/js/util'
import {
    getCustomerListAPI,
    searchCustomerAPI,
    addCustomerAPI,
    editCustomerAPI,
    addCustomerRemarkAPI,
    getShipperAPI
} from '../../api/customerAPI'

export default {
    // ---------------------------------------------------获取顾客列表数据-----------------------------
    getList() {
        getCustomerListAPI().then(res => {
            this.customerList = res.data
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
            });
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
        searchCustomerAPI(para).then(res => {
            this.customerList = res.data
            this.show = true
        })
    },

    //--------------------------------------------搜索提醒方法-----------------------------------
    querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);

        // 调用 callback 返回建议列表的数据
    },

    createFilter(queryString) {
        return (restaurant) => {
            return (restaurant.customerValue.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },

    // 获取所有出货人
    getShipper() {
        if (window.sessionStorage.getItem('customerValue') == null) {
            getShipperAPI().then(res => {
                if( res.data == null) {
                    this.$notify({
                        title : '警告',
                        message : '没有出货人数据可查询',
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
    handleSelect(item) {
        this.searchForm.shipper = item.customerValue
    },
    addSelect(item) {
        this.setCustomerForm.Shipper = item.customerValue
    },
    editSelect(item) {
        this.editCustomerForm.Shipper = item.customerValue
    },


    //---------------------------------------------------------新增客户信息------------------------------------------------------------------------
    showCustomer() {
        this.customerFormDialogVisible = true
        this.$refs['setCustomerForm'].validate(valid => {
            if (this.setCustomerForm.DeliveryDate < this.setCustomerForm.SaleDate) {
                this.$notify.error({
                    title: '错误',
                    message: '送货时间晚于出单时间',
                    position: 'bottom-right'
                });

            } else if (valid) {
                let para = Object.assign(this.setCustomerForm)

                addCustomerAPI(para).then(res => {

                    window.sessionStorage.removeItem('customerValue');
                    this.getShipper()

                    this.getList()
                    this.customerFormDialogVisible = false
                    this.$notify.success({
                        title: '成功',
                        message: '客户信息录入成功',
                        position: 'bottom-right'
                    });
                })
            } else {
                console.log('验证不通过');

            }
        })
    },

    // ----------------------------------------------------------修改客户信息------------------------------------------
    // 获取选中库存数据
    showEditForm(editForm) {
        this.editCustomerFormDialogVisible = true
        this.editCustomerForm = Object.assign({}, editForm)
        if (editForm.Status == 1) {
            this.editCustomerForm.Status = false
        } else {
            this.editCustomerForm.Status = true
        }
    },

    EditForm() {
        if (this.editCustomerForm.DeliveryDate < this.editCustomerForm.SaleDate) {
            this.$notify.error({
                title: '错误',
                message: '送货时间晚于出单时间',
                position: 'bottom-right'
            });
            return ''
        }

        if (this.editCustomerForm.Status) {
            this.editCustomerForm.Status = 0
        } else {
            this.editCustomerForm.Status = 1
        }

        let para = Object.assign({}, this.editCustomerForm)
        editCustomerAPI(this.editCustomerForm.Id, para).then(res => {

            window.sessionStorage.removeItem('customerValue');
            this.getShipper()

            this.getList()
            this.editCustomerFormDialogVisible = false
            this.$notify.success({
                title: '成功',
                message: '客户信息修改成功',
                position: 'bottom-right'
            });
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
        addCustomerRemarkAPI(this.remarkForm.Id, util.getFormDataFromJson(_params)).then(res => {
            this.getList()
            this.showRemarkFormDialogVisible = false;
            this.$notify.success({
                title: '成功',
                message: '修改备注成功',
                position: 'bottom-right'
            });
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
                this.getList()
                this.$notify.success({
                    title: '成功',
                    message: '删除成功',
                    position: 'bottom-right'
                });
            })
        })
    },

    //-----------------------设置表格每行样式--------------------
    tableRowClassName({
        row
    }) {
        if (row.Status == 0) {
            return 'over'
        }
        return ''
    },

    //------------------------------打印事件---------------------------
    print() {
        this.outVisible = true
    },

    //------------------------------表单重置---------------------------
    formClose(formName) {
        if (formName == 'searchRef') {
            this.searchForm.checked = false
            this.show = false
            this.getList()
        }
        if (this.$refs[formName] !== undefined) {
            this.$refs[formName].resetFields();
        }

    },

    // ----------------------------------------------------确认出库----------------------------------------------------------
    showSendStock(editForm) {
        this.sendStockVisible = true
        this.editCustomerForm = Object.assign({}, editForm)
    },

    sendStock() {
        this.editCustomerForm.Status = 0
        let para = Object.assign({}, this.editCustomerForm)
        editCustomerAPI(this.editCustomerForm.Id, para).then(res => {
            this.getList()
            this.sendStockVisible = false
            this.$notify.success({
                title: '成功',
                message: '出库成功',
                position: 'bottom-right'
            });
        })
    },

    test(){
        console.log(this.editCustomerForm.Status);
        this.sendStockVisible = false

    },



    // 时间格式转换
    dataFormatter(row, column, cellValue, inde) {
        return util.Datetransformation(cellValue)
    },
    // 打印列表时间转换
    dataForma(value) {
        return util.Datetransformation(value)
    },

}
