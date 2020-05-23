export default {


    // 获取库存列表数据
    getList() {
        this.$axios.get('http://localhost/saled').then(res => {
            let arr = res.data;
            this.setCate(arr)
            this.outStockList = arr;

            if (this.outStockList.length > 100) {
                this.$notify({
                    title: '成功',
                    message: '数据量较大,建议按日期过滤',
                    position: 'bottom-right',
                    type: 'warning'
                });
            }
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
    search() {
        // console.log(this.searchForm.shipper);

        this.$axios.get('http://localhost/saled', {
            params: {
                shipper: this.searchForm.shipper,
                begin: this.searchForm.time[0].begin,
                end: this.searchForm.time[0].end,
            }
        }).then(res => {
            this.outStockList = this.setCate(res.data)

            // console.log(res.data);
            // console.log(this.outStockList);
        })
    },

    // 重置查询功能
    reset(ref) {
        this.resetForm(ref)
        this.getList()
    },
    // 重置表单
    resetForm(formName) {
        if (this.$refs[formName] !== undefined) {
            this.$refs[formName].resetFields();
        }
    },
    // ------------------------------------------------------------ 备注功能 ------------------------------------------------------------
    // 获取备注
    showRemark(row) {
        this.remarkForm.Remarks = row.Remarks
        this.remarkForm.Id =row.Id
        this.showRemarkFormDialogVisible = true
        // console.log(row);
    },

    // 新增备注
    addRemark() {
        let _params = {
            remarks: this.remarkForm.Remarks
        }
        this.$axios.put('http://localhost/saled/' + this.remarkForm.Id + '/remarks', this.getFormDataFromJson(_params)).then(() => {
            this.getList()
            this.showRemarkFormDialogVisible = false;
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

    // ----------------------------------------------------确认出库----------------------------------------------------------
    outStock() {
        this.$confirm('确认出库该商品?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$notify({
                title: '成功',
                message: '成功出库',
                type: 'success',
                position: 'bottom-right'
              });
        }).catch(() => {
            this.$notify.error({
                title: '错误',
                message: '出库失败',
                position: 'bottom-right'
              });
        });
    }
}
