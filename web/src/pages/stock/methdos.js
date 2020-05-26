import util from '../../common/util.js'
import rules from '../../common/js/rules'
import {
    getList
} from '../../api/stockApi'


export default {
    // ---------------------------------------------------- 获取库存列表数据--------------------------------------------------
    getList() {
        // getList.then(res => {
        //     this.stockList = util.setCate(res.data)
        //     if (this.stockList.length > 100) {
        //         this.$notify({
        //             title: '警告',
        //             message: '数据量较大,建议按日期过滤',
        //             position: 'bottom-right',
        //             type: 'warning'
        //         });
        //     }
        // }).catch(err => {
        //     console.log(err);
        // })

        this.$axios.get('http://localhost/stock').then(res => {
            this.stockList = util.setCate(res.data)
            this.options = JSON.parse(window.sessionStorage.getItem('pickValue'))

            if (this.stockList.length > 100) {
                this.$notify({
                    title: '警告',
                    message: '数据量较大,建议按日期过滤',
                    position: 'bottom-right',
                    type: 'warning'
                });
            }
        }).catch(err => {
            console.log(err);
        })
    },

    //-------------------------------------------------------根据 年月日, 供货商查询------------------------------------------------------
    // 查询功能
    search() {
        this.$axios.get('http://localhost/stock', {
            params: {
                provider: this.searchForm.keyword,
                begin: this.searchForm.time[0],
                end: this.searchForm.time[1],
                all: this.searchForm.checked
            }
        }).then(res => {
            this.stockList = util.setCate(res.data)
        }).catch(err => {
            console.log(err.response);
        })
    },

    // ------------------------------------------------------ 新增库存  ------------------------------------------------------------------
    addStock() {
        if (parseFloat(this.addForm.Price) <= 0) {
            this.$notify({
                title: '警告',
                message: '请输入正确的价格',
                position: 'bottom-right',
                type: 'warning'
            });
        } else if (this.addForm.Date == '') {
            this.$notify({
                title: '警告',
                message: '请输入正确的时间',
                position: 'bottom-right',
                type: 'warning'
            });
        } else {
            this.$refs['addForm'].validate(valid => {
                if (valid) {
                    this.$axios.post('http://localhost/stock', {
                        provider: this.addForm.Provider,
                        date: this.addForm.Date,
                        bid: this.addForm.Bid,
                        model: this.addForm.Model,
                        price: parseFloat(this.addForm.Price),
                        Quantity: this.addForm.Quantity,
                    }).then(res => {
                        let _this = this
                        this.addValue = []
                        this.$notify.success({
                            title: '成功',
                            message: '入库成功',
                            position: 'bottom-right'
                        });
                        this.getList()
                        this.showAddFormDialogVisible = false
                    }).catch(err => {
                        this.$notify.error({
                            title: '错误',
                            message: err,
                            position: 'bottom-right'
                        });
                    })

                }
            })
        }
    },
    // 新增库存分类 级联选择
    addChangeRef() {
        const nodesObj = this.$refs['cascader'].getCheckedNodes();
        const Id = nodesObj[0].data.Id
        this.addForm.Bid = Id
    },

    // // 监听新增表单关闭事件
    // addFormClose(ref) {
    //     console.log(ref);

    //     let _this = this
    //     util.resetForm(_this, ref)
    // },


    // ------------------------------------------------------------ 备注功能 ------------------------------------------------------------
    // 获取备注
    showRemark(row) {
        this.remarkForm.Remarks = row.Remarks
        this.remarkForm.Id = row.Id
        this.showRemarkDialogVisible = true
    },

    // 新增备注
    addRemark() {
        let _params = {
            remarks: this.remarkForm.Remarks
        }
        this.$axios.put('http://localhost/stock/' + this.remarkForm.Id + '/remarks', util.getFormDataFromJson(_params)).then(() => {
            this.getList()
            this.showRemarkDialogVisible = false;
        }).catch(err => {
            console.log(err.response);
        })
    },

    // // 监听修改备注表单的关闭
    // eidtRemark(ref) {
    //     let _this = this
    //     util.resetForm(_this, ref)
    // },

    // ----------------------------------------------------------修改库存数据------------------------------------------
    // 获取选中库存数据
    showDditForm(editForm) {
        this.editForm.Provider = editForm.Provider
        this.editForm.Date = editForm.Date
        this.editForm.Model = editForm.Model
        this.editForm.Price = editForm.Price
        this.editForm.Quantity = editForm.Quantity
        this.editForm.Inventory = editForm.Inventory
        this.editForm.Bid = editForm.Bid
        this.editValue = [editForm.Category, editForm.Brand]
        this.showEditFormDialogVisible = true
        this.editForm.Id = editForm.Id
        this.editForm.EditNum = editForm.Quantity - editForm.Inventory
    },

    changePrice() {
        this.$notify({
            title: '警告',
            message: '修改价格需要重新计算利润',
            position: 'bottom-right',
            type: 'warning'
        });

    },

    // 修改库存 分类级联选择
    editChangeRef() {
        const nodesObj = this.$refs['editCascader'].getCheckedNodes();
        const Id = nodesObj[0].data.Id
        this.editForm.Bid = Id
    },

    // 修改库存
    editFormHandler() {
        if (this.editForm.Quantity < this.editForm.EditNum && this.editForm.Quantity != 0) {
            this.$notify.error({
                title: '错误',
                message: '新库存不能少于已销售数量',
                position: 'bottom-right'
            });
            return true
        } else if (this.editForm.Quantity == 0) {
            this.$notify.error({
                title: '错误',
                message: '新库存不能为0',
                position: 'bottom-right'
            });
            return true
        } else if (this.editForm.Date == null) {
            this.$notify.error({
                title: '错误',
                message: '请输入正确的时间',
                position: 'bottom-right'
            });
        } else if (this.editForm.Price == '' || this.editForm.Price == 0) {
            this.$notify.error({
                title: '错误',
                message: '请输入正确的价格',
                position: 'bottom-right'
            });
        } else {
            let _params = {
                Provider: this.editForm.Provider,
                Date: this.editForm.Date,
                Model: this.editForm.Model,
                Price: parseFloat(this.editForm.Price),
                Quantity: this.editForm.Quantity,
                Bid: this.editForm.Bid
            }
            this.$axios.put('http://localhost/stock/' + this.editForm.Id, this.getFormDataFromJson(_params)).then(
                res => {
                    this.$notify.success({
                        title: '成功',
                        message: '修改成功',
                        position: 'bottom-right'
                    });
                    this.getList()
                    this.showEditFormDialogVisible = false
                }
            ).catch(err => {
                console.log(err.response);
                this.$notify.error({
                    title: '错误',
                    message: err.response.data,
                    position: 'bottom-right'
                });
            })
        }
    },

    // ------------------------------------------- 出库功能 ------------------------------
    // 获取 将要出库的商品信息
    showOutStock(outstock) {
        this.outStockFormDialogVisible = true
        this.outStockForm.provider = outstock.Provider
        this.outStockValue = outstock.Category + ' / ' + outstock.Brand
        this.outStockForm.model = outstock.Model
        this.outStockForm.price = outstock.Price
        this.outStockForm.inventory = outstock.Inventory

        this.outStockForm.sid = outstock.Id
        this.outStockForm.inDate = outstock.Date
    },

    // 一键出库
    outStock() {
        if (parseFloat(this.outStockForm.sell) == 0 || this.outStockForm.sell == '') {
            this.$notify.error({
                title: '错误',
                message: '请输入正确的售价',
                position: 'bottom-right'
            });
        } else if (this.outStockForm.quantity <= 0) {
            this.$notify.error({
                title: '错误',
                message: '请输入正确的出库数量',
                position: 'bottom-right'
            });
        } else if (this.outStockForm.quantity > this.outStockForm.inventory) {
            this.$notify.error({
                title: '错误',
                message: '库存不足',
                position: 'bottom-right'
            });
        } else if (this.outStockForm.outDate == '') {
            this.$notify.error({
                title: '错误',
                message: '请输入正确的时间',
                position: 'bottom-right'
            });
        } else if (parseFloat(this.outStockForm.inDate) > parseFloat(this.outStockForm.outDate)) {
            this.$notify.error({
                title: '错误',
                message: '出库时间不能晚于入库时间',
                position: 'bottom-right'
            });
        } else {
            this.$refs['outStockForm'].validate(valid => {
                if (valid) {
                    this.$axios.post('http://localhost/saled', {
                        shipper: this.outStockForm.shipper,
                        date: this.outStockForm.outDate,
                        sid: this.outStockForm.sid,
                        price: parseFloat(this.outStockForm.sell),
                        quantity: this.outStockForm.quantity
                    }).then(() => {
                        this.outStockFormDialogVisible = false
                        this.getList()
                        this.$notify.success({
                            title: '成功',
                            message: '出库成功',
                            position: 'bottom-right'
                        });
                    }).catch(err => {
                        if (err.response.data == '出库数量不正确') {
                            this.$notify.error({
                                title: '错误',
                                message: err.response.data,
                                position: 'bottom-right'
                            });
                        } else if (err.response.data == '库存数量不足') {
                            this.$notify.error({
                                title: '错误',
                                message: err.response.data,
                                position: 'bottom-right'
                            });
                        }
                    })
                } else {
                    console.log('出库信息验证未通过');
                }
            })
        }
    },

    //-----------------------------------------表单重置中心-----------------------------------------
    formClose(ref) {
        let _this = this
        switch (ref) {
            //查询表单
            case 'searchRef':
                _this.searchForm.checked = false
                util.resetForm(_this, 'searchRef')
                _this.getList()
                break;
            // 备注表单
            case 'remarkForm':
                util.resetForm(_this, 'remarkForm')
                break;
            //新增库存表单
            case 'addForm':
                util.resetForm(_this, 'addForm')
                break;
            //出库表单
            case 'outStockForm':
                util.resetForm(_this, 'outStockForm')
                break;
            default:
                break;
        }
    },

    //-----------------------设置表格每行样式--------------------
    tableRowClassName({
        row
    }) {
        if (row.Inventory == 0) {
            return 'over'
        }
        return ''
    },

    // -------------------------------------------删除库存 ----------------------------------
    deleteStock(id) {
        this.$confirm('确认删除该库存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$axios.delete('http://localhost/stock/' + id).then(res => {
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


}
