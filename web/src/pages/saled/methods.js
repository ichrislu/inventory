import {
    getSaledListApi,
    editRemarkApi,
    getShipperApi
} from '../../api/saledApi'
import util from '../../common/js/util';

export default {

	// 滚动加载触发的方法
    getSaledList() {
        // 数据量提示
        this.loading = true
        if (this.outStockList.length > 100) {
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
            para.begin = this.searchForm.time[0],
                para.end = this.searchForm.time[1]
        }
        getSaledListApi(para).then(res => {
            this.loading = false
            this.outStockList = this.outStockList.concat(util.setCate(res.data))
            this.last = this.outStockList[this.outStockList.length - 1].OutDate
        }).catch(req => {
			// console.log(req);
			this.loading = false
        })
    },

    //-------------------------------------------------------根据 年月日, 供货商查询------------------------------------------------------
    search() {
        if (this.searchForm.time == null) {
            this.searchForm.time = []
        }
        this.last = ''
        this.outStockList.length = 0
        this.getSaledList()
    },

    //--------------------------------------------搜索提醒方法-----------------------------------
    querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);

        // 调用 callback 返回建议列表的数据
    },
	//根据搜索框内容过滤
    createFilter(queryString) {
        return (restaurant) => {
            return (restaurant.outStockValue.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },

    // 获取所有供货商
    getShipper() {
        if (window.sessionStorage.getItem('outStockValue') == null) {
            getShipperApi().then(res => {
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

	// 搜索栏 选择出货人 触发的事件
    searchSelect(item) {
        this.searchForm.shipper = item.outStockValue
        this.search()
    },

    // ------------------------------------------------------------ 备注功能 ------------------------------------------------------------
    // 新增/修改备注
    addRemark(row) {
        this.remarkForm.Remarks = row.Remarks
        this.remarkForm.Id = row.Id
        let _params = {
            remarks: this.remarkForm.Remarks
        }
        editRemarkApi(this.remarkForm.Id, util.getFormDataFromJson(_params)).then(() => {
            this.getSaledList()
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
            this.getSaledList()
        }
    },

    // 时间格式转换
    dataFormatter(row, column, cellValue, inde) {
        return util.Datetransformation(cellValue)
    },
}
