import { getOutStockListAPI,searchOutStockAPI,addRemarkAPI } from '../../api/outStockApi'
import util  from '../../common/js/util';

export default {
    // 获取库存列表数据
    getList() {
        if( window.sessionStorage.length == 0) {
            this.$router.push({path : '/category'})
        }

        getOutStockListAPI().then(res => {
            let arr = res.data;
            // 设置 品类品牌
            util.setCate(arr)
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

    //-------------------------------------------------------根据 年月日, 供货商查询------------------------------------------------------
    search() {
        let para = {
            shipper: this.searchForm.shipper,
            begin: this.searchForm.time[0],
            end: this.searchForm.time[1],
        }
        searchOutStockAPI(para).then(res => {
            this.outStockList = util.setCate(res.data)
        })
    },


    // ------------------------------------------------------------ 备注功能 ------------------------------------------------------------
    // 获取备注
    // showRemark(row) {
    //     this.remarkForm.Remarks = row.Remarks
    //     this.remarkForm.Id = row.Id
    //     this.showRemarkFormDialogVisible = true
    // },

    // 新增备注
    addRemark(row) {
        this.remarkForm.Remarks = row.Remarks
        this.remarkForm.Id = row.Id
        let _params = {
            remarks: this.remarkForm.Remarks
        }
        addRemarkAPI(this.remarkForm.Id, util.getFormDataFromJson(_params)).then(() => {
            this.getList()
            this.$notify.success({
                title: '成功',
                message: '备注添加成功',
                position: 'bottom-right'
            })
        })
    },

    //--------------------------------表单重置---------------------------------------------
       formClose(formName) {
        if(formName == 'searchRef') {
            this.searchForm.checked = false
            this.getList()
        }

        if (this.$refs[formName] !== undefined) {
            this.$refs[formName].resetFields();
        }
    },


    // 时间格式转换
    dataFormatter(row, column, cellValue, inde ) {
        return util.Datetransformation(cellValue)
    }
}
