import {
    searchOutStockAPI,
    addRemarkAPI,
    getShipperAPI
} from '../../api/outStockApi'
import util from '../../common/js/util';

export default {

    scroll() {
        // 数据量提示
        this.loading = true
        if (this.outStockList.length > 100 && this.count == 120) {
            this.$notify({
                title: '警告',
                message: '数据量较大,建议按日期过滤',
                position: 'bottom-right',
                type: 'warning'
            });
        }

        let para = {
            last: this.last,
            limit: this.limit,
            shipper: this.searchForm.shipper
        }

        if (this.searchForm.time[0] !== undefined) {
            // let para = {
            //     last: this.last,
            //     limit: this.limit,
            //     begin: this.searchForm.time[0],
            //     end: this.searchForm.time[1],
            //     shipper: this.searchForm.shipper
            // }
            para.begin = this.searchForm.time[0],
                para.end = this.searchForm.time[1]

            // searchOutStockAPI(para).then(res => {
            //     this.outStockList = this.outStockList.concat(util.setCate(res.data))
            //     this.last = this.outStockList[this.outStockList.length - 1].OutDate
            // }).catch(req => {
            //     // console.log(req);
            // })
        }
        // else {
        //     let para = {
        //         last: this.last,
        //         limit: this.limit,
        //         shipper: this.searchForm.shipper
        //     }
        // searchOutStockAPI(para).then(res => {
        //     this.outStockList = this.outStockList.concat(util.setCate(res.data))
        //     this.last = this.outStockList[this.outStockList.length - 1].OutDate
        // }).catch(req => {
        //     // console.log(req);
        // })
        // }
        searchOutStockAPI(para).then(res => {
            this.outStockList = this.outStockList.concat(util.setCate(res.data))
            this.last = this.outStockList[this.outStockList.length - 1].OutDate
            this.loading = false
        }).catch(req => {
            // console.log(req);
        })
    },

    //-------------------------------------------------------根据 年月日, 供货商查询------------------------------------------------------
    search() {
        if (this.searchForm.time == null) {
            this.searchForm.time = []
        }
        this.last = ''
        this.outStockList.length = 0
        // this.outStockList = []
        this.scroll()
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
            return (restaurant.outStockValue.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },

    // 获取所有供货商
    getShipper() {
        if (window.sessionStorage.getItem('outStockValue') == null) {
            getShipperAPI().then(res => {
                if (res.data == null) {
                    this.$notify({
                        title: '警告',
                        message: '没有出货人数据可查询',
                        type: 'warning',
                        position: 'bottom-right'
                    })
                    return ''
                }

                var list = res.data
                var arr = []
                for (var i = 0; i < list.length; i++) {
                    arr.push({
                        outStockValue: list[i]
                    })
                }
                window.sessionStorage.setItem('outStockValue', JSON.stringify(arr))
                this.restaurants = arr
            })
        } else {
            this.restaurants = JSON.parse(window.sessionStorage.getItem('outStockValue'))
        }
    },

    handleSelect(item) {
        this.searchForm.shipper = item.outStockValue
        this.search()
    },

    // ------------------------------------------------------------ 备注功能 ------------------------------------------------------------
    // 新增备注
    addRemark(row) {
        this.remarkForm.Remarks = row.Remarks
        this.remarkForm.Id = row.Id
        let _params = {
            remarks: this.remarkForm.Remarks
        }
        addRemarkAPI(this.remarkForm.Id, util.getFormDataFromJson(_params)).then(() => {
            this.scroll()
            this.$notify.success({
                title: '成功',
                message: '备注添加成功',
                position: 'bottom-right'
            })
        })
    },

    //--------------------------------表单重置---------------------------------------------
    formClose(formName) {
        if (this.$refs[formName] !== undefined) {
            this.$refs[formName].resetFields();
        }
        if (formName == 'searchRef') {
            this.last = ''
            // this.outStockList = []
            this.outStockList.length = 0
            this.scroll()
        }
    },

    // 时间格式转换
    dataFormatter(row, column, cellValue, inde) {
        return util.Datetransformation(cellValue)
    },
}
