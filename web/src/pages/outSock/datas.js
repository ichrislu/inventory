export default {
    init : () => {
        return {
            // 出库列表数据
            outStockList: [],
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
            // 控制 修改备注对话框的显示与隐藏
            showRemarkFormDialogVisible: false,
            // 备注对话框 表单对象
            remarkForm: {
                Remarks: '',
                Id: ''
            },
            // 搜索栏表单对象
            searchForm: {
                shipper: '',
                // 时间选择器绑定对象
                time: [],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            },
        }
    }
}
