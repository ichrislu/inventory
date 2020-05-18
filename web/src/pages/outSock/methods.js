export default {


    // 获取库存列表数据
    getList() {
        // var _this = this
        // this.$axios.get('/outstock').then(res => {
        //     // _this.stockList = _this.stockList.concat(res.data)
        //     _this.outStockList = res.data
        // })
    },

     //-------------------------------------------------------根据 年月日, 供货商查询------------------------------------------------------
     search() {
        this.$axios.get('http://localhost/outStock', {
            params: {
                'provider': this.searchForm.keyword,
                'begin': this.searchForm.time[0],
                'end': this.searchForm.time[1],
            }
        }).then(res => {
            this.stockList = res.data
        })
    },
}
