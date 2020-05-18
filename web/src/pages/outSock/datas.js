export default {
    init : () => {
        return {
            activeCollapse : 'search',
            // 出库列表数据
            outStockList: [],
            showAddFormDialogVisible: false,
            date: '',
            // 表单对象预验证规则
            addFormRules: {
                name: [{
                    required: true,
                    message: '请输入供应商',
                    trigger: 'blur'
                }],
                cate: [{
                    required: true,
                    message: '请输入品类',
                    trigger: 'blur'
                }],
                brand: [{
                    required: true,
                    message: '请输入品牌',
                    trigger: 'blur'
                }],
                mod: [{
                    required: true,
                    message: '请输入型号',
                    trigger: 'blur'
                }],
                price: [{
                    required: true,
                    message: '请输入进货价格',
                    trigger: 'blur'
                }],
                num: [{
                    required: true,
                    message: '请输入数量',
                    trigger: 'blur'
                }]
            },
            value1: '',
            value2: '',
            // 搜索关键字
            keyword: '',
            // 控制 修改备注对话框的显示与隐藏
            showRemarkFormDialogVisible: false,
            // 备注对话框 表单对象
            remarkForm: {
                // 备注内容
                textarea: ''
            },

        }
    }
}
