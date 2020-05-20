export default {


    // 获取库存列表数据
    getList() {
        this.$axios.get('http://localhost/saled').then(res => {
            let arr = res.data;
            for (let i = 0; i < arr.length; i++) {
                var obj = JSON.parse(window.sessionStorage.getItem('key_' + arr[i].Bid))
                arr[i].Brand = obj.brand,
                arr[i].Category = obj.category
            }
            this.outStockList = arr;
        })
    },

    //-------------------------------------------------------根据 年月日, 供货商查询------------------------------------------------------
    search() {
        this.$axios.get('http://localhost/saled', {
            params: {
                'shipper': this.searchForm.shipper,
                'begin': this.searchForm.time[0],
                'end': this.searchForm.time[1],
            }
        }).then(res => {
            this.outStockList = res.data
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
            this.$message({
                type: 'success',
                message: '出库成功!'
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消出库'
            });
        });
    }
}
