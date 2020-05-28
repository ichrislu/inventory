import { getList } from '../../api/stockApi'
import util from '../../common/js/util';

export default {
    // 获取库存列表数据
    getList() {
        // getList(para).then(res => {
        //     let arr = res.data;
        //     this.setCate(arr)
        //     this.outStockList = arr;

        //     if (this.outStockList.length > 100) {
        //         this.$notify({
        //             title: '成功',
        //             message: '数据量较大,建议按日期过滤',
        //             position: 'bottom-right',
        //             type: 'warning'
        //         });
        //     }
        // })
        if( window.sessionStorage.length == 0) {
            this.$router.push({path : '/category'})
        }

        this.$axios.get('http://localhost/saled').then(res => {
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
        this.$axios.get('http://localhost/saled', {
            params: {
                shipper: this.searchForm.shipper,
                begin: this.searchForm.time[0],
                end: this.searchForm.time[1],
            }
        }).then(res => {
            this.outStockList = util.setCate(res.data)
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
        this.$axios.put('http://localhost/saled/' + this.remarkForm.Id + '/remarks', util.getFormDataFromJson(_params)).then(() => {
            this.getList()
            this.showRemarkFormDialogVisible = false;
        }).catch(function (err) {
            console.log(err);

        })
    },

    //--------------------------------表单重置---------------------------------------------
       formClose(ref) {
        let _this = this
        util.resetForm(_this, ref)

        if(ref == 'searchRef') {
            _this.searchForm.checked = false
            _this.getList()
        }
    },
}
