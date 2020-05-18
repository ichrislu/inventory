export default {


    // 获取库存列表数据
    getList() {
        var _this = this
        this.$axios.get('/outstock').then(res => {
            // _this.stockList = _this.stockList.concat(res.data)
            _this.outStockList = res.data
        })
    },

    // 按供应商查询
    searchSup() {
        console.log(this.keyword)
        var _this = this
        this.$axios.get('/stock/search', {
            params: {
                key: keyword
            }
        }).then(res => {
            _this.outStockList = res.data
        })
    }

}
