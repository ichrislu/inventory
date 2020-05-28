import util from '../../common/js/util'

export default {
    // ---------------------------------------------------获取顾客列表数据-----------------------------
    getList() {
        this.$axios.get('http://localhost/customer').then(res => {
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
        this.$axios.get('http://localhost/customer', {
            params: {
                shipper: this.searchForm.shipper,
                begin: this.searchForm.time[0],
                end: this.searchForm.time[1],
                all: this.searchForm.checked
            }
        }).then(res => {
            this.customerList = res.data
            this.show = true
        }).catch(err => {
            // console.log(err.response);
        })
    },



    //---------------------------------------------------------录入客户信息------------------------------------------------------------------------
    showCustomer() {
        this.customerFormDialogVisible = true
        this.$refs['setCustomerForm'].validate(valid => {
            if (valid) {
                this.$axios.post('http://localhost/customer', {
                    Shipper: this.setCustomerForm.shipper,
                    Name: this.setCustomerForm.name,
                    Phone: this.setCustomerForm.phone,
                    Address: this.setCustomerForm.address,
                    SaleDate: this.setCustomerForm.saleDate,
                    DeliveryDate: this.setCustomerForm.deliveryDate,
                    Model: this.setCustomerForm.model,
                    Status: this.setCustomerForm.status,
                    Remarks: this.setCustomerForm.remarks
                }).then(res => {
                    this.getList()
                    this.customerFormDialogVisible = false
                    this.$notify.success({
                        title: '成功',
                        message: '客户信息录入成功',
                        position: 'bottom-right'
                    });
                }).catch(err => {
                    this.$notify.error({
                        title: '失败',
                        message: '客户信息录入失败',
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
        this.editCustomerForm.shipper = editForm.Shipper
        this.editCustomerForm.model = editForm.Model
        this.editCustomerForm.name = editForm.Name
        this.editCustomerForm.phone = editForm.Phone
        this.editCustomerForm.address = editForm.Address
        this.editCustomerForm.saleDate = editForm.SaleDate
        this.editCustomerForm.deliveryDate = editForm.DeliveryDate
        this.editCustomerForm.status = editForm.Status
        this.editCustomerForm.id = editForm.Id
    },

    EditForm() {
        this.$axios.put('http://localhost/customer/' + this.editCustomerForm.id, {
            shipper: this.editCustomerForm.shipper,
            model: this.editCustomerForm.model,
            name: this.editCustomerForm.name,
            phone: this.editCustomerForm.phone,
            address: this.editCustomerForm.address,
            saleDate: this.editCustomerForm.saleDate,
            deliveryDate: this.editCustomerForm.deliveryDate,
            status: this.editCustomerForm.status
        }).then(res => {
            this.getList()
            this.editCustomerFormDialogVisible = false
            this.$notify.success({
                title: '成功',
                message: '客户信息修改成功',
                position: 'bottom-right'
            });
        }).catch(err => {
            this.$notify.error({
                title: '失败',
                message: '修改客户信息失败',
                position: 'bottom-right'
            });
        })
    },

    // ------------------------------------------------------------ 备注功能 ------------------------------------------------------------
    // 获取备注
    showRemark(row) {
        this.remarkForm.Remarks = row.Remarks
        this.remarkForm.Id = row.Id
        this.showRemarkFormDialogVisible = true
    },

    // 新增备注
    addRemark() {
        let _params = {
            remarks: this.remarkForm.Remarks
        }
        this.$axios.put('http://localhost/customer/' + this.remarkForm.Id + '/remarks', util.getFormDataFromJson(_params)).then(res => {

            this.getList()
            this.showRemarkFormDialogVisible = false;
            this.$notify.success({
                title: '成功',
                message: '修改备注成功',
                position: 'bottom-right'
            });
        }).catch(err => {
            this.$notify.error({
                title: '失败',
                message: '修改备注失败',
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
            }).catch(err => {
                this.$notify.error({
                    title: '错误',
                    message: err.response.data,
                    position: 'bottom-right'
                });
            });
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
    formClose(ref) {
        let _this = this
        util.resetForm(_this, ref)

        if (ref == 'searchRef') {
            _this.searchForm.checked = false
            _this.getList()
        }
    },

    // ----------------------------------------------------确认出库----------------------------------------------------------
    showSendStock(editForm) {
        this.sendStockVisible = true
        this.editCustomerForm.shipper = editForm.Shipper
        this.editCustomerForm.model = editForm.Model
        this.editCustomerForm.name = editForm.Name
        this.editCustomerForm.phone = editForm.Phone
        this.editCustomerForm.address = editForm.Address
        this.editCustomerForm.saleDate = editForm.SaleDate
        this.editCustomerForm.deliveryDate = editForm.DeliveryDate
        this.editCustomerForm.status = editForm.Status
        this.editCustomerForm.id = editForm.Id
    },
    sendStock() {
        this.$axios.put('http://localhost/customer/' + this.editCustomerForm.id, {
            shipper: this.editCustomerForm.shipper,
            model: this.editCustomerForm.model,
            name: this.editCustomerForm.name,
            phone: this.editCustomerForm.phone,
            address: this.editCustomerForm.address,
            saleDate: this.editCustomerForm.saleDate,
            deliveryDate: this.editCustomerForm.deliveryDate,
            status: 0
        }).then(res => {
            this.getList()
            this.sendStockVisible = false
            this.$notify.success({
                title: '成功',
                message: '出库成功',
                position: 'bottom-right'
            });
        }).catch(err => {
            this.$notify.error({
                title: '失败',
                message: '出库失败',
                position: 'bottom-right'
            });
        })
    }
}
