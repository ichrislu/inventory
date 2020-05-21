export default {
    // ---------------------------------------------------- 获取库存列表数据--------------------------------------------------
    getList() {
        this.$axios.get('http://localhost/stock').then(res => {
            this.stockList = this.setCate(res.data)
            // console.log(this.stockList.length);
            if (this.stockList.length > 100) {
                this.$notify({
                    title: '成功',
                    message: '数据量较大,建议按日期过滤',
                    position: 'bottom-right',
                    type: 'warning'
                });
            }
        }).catch(err => {
            console.log(err.response);
        })

    },

    setCate(arr) {
        for (let i = 0; i < arr.length; i++) {
            var obj = JSON.parse(window.sessionStorage.getItem('key_' + arr[i].Bid))
            arr[i].Brand = obj.brand,
                arr[i].Category = obj.category
        }
        return arr
    },
    //-------------------------------------------------------根据 年月日, 供货商查询------------------------------------------------------
    // 查询功能
    search() {
        this.$axios.get('http://localhost/stock', {
            params: {
                'provider': this.searchForm.keyword,
                'begin': this.searchForm.time[0],
                'end': this.searchForm.time[1],
                'all': this.searchForm.checked
            }
        }).then(res => {
            this.stockList = this.setCate(res.data)
        }).catch(err => {
            console.log(err.response);
        })
    },
    // 重置查询功能
    reset(ref) {
        this.searchForm.checked = false
        this.resetForm(ref)
        this.getList()
    },

    // ------------------------------------------------------ 新增库存  ------------------------------------------------------------------
    addStock() {
        // this.$refs.addForm.validate( valid => {
        //     if (valid) {
        //         this.$axios.post('http://localhost/stock', {
        //         provider: this.addForm.Provider,
        //         date: this.addForm.Date,
        //         bid: this.addForm.Bid,
        //         model: this.addForm.Model,
        //         price: parseFloat(this.addForm.Price),
        //         Quantity: this.addForm.Quantity,
        //     }).then(res => {
        //         // this.resetForm(addForm)
        //         this.$notify.success({
        //             title: '成功',
        //             message: '入库成功',
        //             position: 'bottom-right'
        //         });
        //         this.getList()
        //         this.showAddFormDialogVisible = false
        //     }).catch(err => {
        //         // console.log(err.response);
        //         this.$notify.error({
        //             title: '错误',
        //             message: err.response.data,
        //             position: 'bottom-right'
        //         });

        //     })
        //     return true
        //     }
        // })

        if (parseFloat(this.addForm.Price) <= 0) {
            this.$notify({
                title: '警告',
                message: '请输入正确的价格',
                position: 'bottom-right',
                type: 'warning'
            });
            return true
        } else if (this.addForm.Date == '') {
            this.$notify({
                title: '警告',
                message: '请输入正确的时间',
                position: 'bottom-right',
                type: 'warning'
            });
            return true
        } else {

            this.$axios.post('http://localhost/stock', {
                provider: this.addForm.Provider,
                date: this.addForm.Date,
                bid: this.addForm.Bid,
                model: this.addForm.Model,
                price: parseFloat(this.addForm.Price),
                Quantity: this.addForm.Quantity,
            }).then(res => {
                // this.resetForm(addForm)
                this.$notify.success({
                    title: '成功',
                    message: '入库成功',
                    position: 'bottom-right'
                });
                this.getList()
                this.showAddFormDialogVisible = false
            }).catch(err => {
                // console.log(err.response);
                this.$notify.error({
                    title: '错误',
                    message: err.response.data,
                    position: 'bottom-right'
                });
            })
        }
    },
    // 新增库存分类 级联选择
    addChangeRef() {
        const nodesObj = this.$refs['cascader'].getCheckedNodes();
        const Id = nodesObj[0].data.Id
        this.addForm.Bid = Id
    },

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
        this.$axios.put('http://localhost/stock/' + this.remarkForm.Id + '/remarks', this.getFormDataFromJson(_params)).then(() => {
            this.getList()
            this.showRemarkDialogVisible = false;
        }).catch(err => {
            console.log(err.response);
        })
    },

    getFormDataFromJson(json) {
        let params = new URLSearchParams()
        for (var key in json) {
            params.append(key, json[key]);
        }
        return params;
    },

    // ----------------------------------------------------------修改库存数据------------------------------------------
    // 获取选中库存数据
    showDditForm(editForm) {
        // console.log(editForm);

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
        // console.log('改变了');
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
        // console.log(this.editForm.Price);

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
                // Inventory: this.editForm.Inventory,
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
    //--------------------------------------------------------------------- 获取分类  --------------------------------------------
    getCateList() {
        // debugger
        this.$axios.get('http://localhost/category').then(res => {
            this.options = res.data
        }).catch(err => {
            console.log(err.response);
        })
    },

    // ------------------------------------------------ 重置表单 ---------------------------------
    resetForm(formName) {
        if (this.$refs[formName] !== undefined) {
            this.$refs[formName].resetFields();
        }
        // this.$refs[formName].resetFields()
    },

    // ------------------------------------------- 出库功能 ------------------------------
    // 获取 将要出库的商品信息
    showOutStock(outstock) {
        this.outStockFormDialogVisible = true
        this.outStockForm.provider = outstock.Provider
        this.outStockValue = [outstock.Category, outstock.Brand]
        this.outStockForm.model = outstock.Model
        this.outStockForm.price = outstock.Price
        this.outStockForm.inventory = outstock.Inventory

        this.outStockForm.sid = outstock.Id
        // this.outStockForm.date = outstock.Date
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
        } else if (this.outStockForm.quantity > this.outStockForm.inventory) {
            this.$notify.error({
                title: '错误',
                message: '库存不足',
                position: 'bottom-right'
            });
        } else if (this.outStockForm.date == '') {
            this.$notify.error({
                title: '错误',
                message: '请输入正确的时间',
                position: 'bottom-right'
            });
        } else if (this.outStockForm.price == '' || this.outStockForm.price == 0) {
            this.$notify.error({
                title: '错误',
                message: '请输入正确的价格',
                position: 'bottom-right'
            });
        } else {
            this.$axios.post('http://localhost/saled', {
                shipper: this.outStockForm.shipper,
                date: this.outStockForm.date,
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
            }).catch(error => {
                console.log(error.response);
                this.$notify.error({
                    title: '错误',
                    message: error.response.data,
                    position: 'bottom-right'
                });
            })
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
        // console.log(id);

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
                // console.log(err.response);
                this.$notify.error({
                    title: '错误',
                    message: err.response.data,
                    position: 'bottom-right'
                });
            });
        })
    }
}
