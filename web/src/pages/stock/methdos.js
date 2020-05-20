export default {
    // ---------------------------------------------------- 获取库存列表数据--------------------------------------------------
    getList() {
        this.$axios.get('http://localhost/stock').then(res => {
            let arr = res.data;

            for (let i = 0; i < arr.length; i++) {
                var obj = JSON.parse(window.sessionStorage.getItem('key_' + arr[i].Bid))
                arr[i].Brand = obj.brand,
                    arr[i].Category = obj.category
            }
            this.stockList = arr;
        }).catch(err => {
            console.log(err);
        })

    },
    //-------------------------------------------------------根据 年月日, 供货商查询------------------------------------------------------
    // 查询功能
    search() {
        this.$axios.get('http://localhost/stock', {
            params: {
                'provider': this.searchForm.keyword,
                'begin': this.searchForm.time[0],
                'end': this.searchForm.time[1],
            }
        }).then(res => {
            this.stockList = res.data
        })
    },
    // 重置查询功能
    reset(ref) {
        this.resetForm(ref)
        this.getList()
    },

    // ------------------------------------------------------ 新增库存  ------------------------------------------------------------------
    addStock() {
        //时间转换
        this.addForm.Date = new Date().getTime()
        // console.log(parseFloat(this.addForm.Price));

        this.$axios.post('http://localhost/stock', {
            provider: this.addForm.Provider,
            date: this.addForm.Date,
            bid: this.addForm.Bid,
            model: this.addForm.Model,
            price: parseFloat(this.addForm.Price),
            Quantity: this.addForm.Quantity,
        }).then(() => {
                // this.resetForm(addForm)
                this.getList()
                this.showAddFormDialogVisible = false
            }

        )
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
        }).catch (function (error) {
        })
    },
    getFormDataFromJson(json) {
        let params = new URLSearchParams()
        for (var key in json) {
            params.append(key, json[key]);
        }
        return params;
    },

    // ----------------------------------------------------------获取选中库存数据------------------------------------------
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
    },

    // 新增库存分类 级联选择
    editChangeRef() {
        const nodesObj = this.$refs['editCascader'].getCheckedNodes();
        const Id = nodesObj[0].data.Id
        this.editForm.Bid = Id
    },

    // 修改库存
    editFormHandler() {
        this.$axios.post('http://localhost/stock', {
            Provider: this.editForm.Provider,
            Date: this.editForm.Date,
            Model: this.editForm.Model,
            Price: this.editForm.Price,
            Quantity: this.editForm.Quantity,
            Inventory: this.editForm.Inventory,
            Bid: this.editForm.Bid
        }).then(
            () => {
                this.getList()
                this.showEditFormDialogVisible = false
            }
        )
    },
    //--------------------------------------------------------------------- 获取分类  --------------------------------------------
    getCateList() {
        // debugger
        this.$axios.get('http://localhost/category').then(res => {
            this.options = res.data
        })
    },

    // ------------------------------------------------ 重置表单 ---------------------------------
    resetForm(formName) {
        if (this.$refs[formName] !== undefined) {
            this.$refs[formName].resetFields();
        }
        // this.$refs[formName].resetFields()
    },

    // ------------------------------------------- 出库 ------------------------------
    // 获取 将要出库的商品信息
    showOutStock(outstock) {
        this.outStockFormDialogVisible = true
        this.outStockForm.provider = outstock.Provider
        this.outStockValue = [outstock.Category, outstock.Brand]
        this.outStockForm.model = outstock.Model
        this.outStockForm.price = outstock.Price

        this.outStockForm.sid = outstock.Id
        this.outStockForm.date = outstock.date
    },
    // 一键出库
    outStock() {
        this.$axios.post('http://localhost/saled', {
            shipper: this.outStockForm.shipper,
            date: this.outStockForm.date,
            sid: this.outStockForm.sid,
            price: parseFloat(this.outStockForm.sell) ,
            quantity: this.outStockForm.quantity
        }).then(() => {
            this.outStockFormDialogVisible = false
            this.$message({
                type: 'success',
                message: '出库成功'
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '出库失败'
            })
        })
    },

    //获取Bid
    getBid(id) {
        console.log(id);

    }

}
