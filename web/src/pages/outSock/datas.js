import util from '../../common/js/util'
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
                            const end = util.getTime();
                            const start = util.getTime()
                            start.setTime(start - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = util.getTime();
                            const start = util.getTime()
                            start.setTime(start - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = util.getTime();
                            const start = util.getTime()
                            start.setTime(start - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            },
            // 搜索提示对象数据
            restaurants: [],
             // 每次加载的数据
             list: [],
             // 每次加载数据数量
             limit : 20,
             // 控制页面是否停止加载数据
             busy : false,
             // 每组最后一条数据的OutDate
             last : '',
             // 控制重置按钮的使用
            //  rest : true
        }
    }
}
