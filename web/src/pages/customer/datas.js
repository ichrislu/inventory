export default {
    init: () => {
        return {
            // 出库列表数据
            customerList: [],

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
                checked: false,
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
            // 搜索提示对象数据
            restaurants: [],
            // 控制 打印提示 "包含已送货信息"的显示和隐藏
            show: false,
            // 控制客户信息表单的 显示与隐藏
            customerFormDialogVisible: false,
            // 录入客户信息表单
            setCustomerForm: {
                Shipper: '',
                Model: '',
                Name: '',
                Phone: '',
                Address: '',
                SaleDate: '',
                DeliveryDate: '',
                Remarks: '',
                Status: 1,

            },

            // 控制修改客户信息表单的显示和隐藏,
            editCustomerFormDialogVisible: false,
            // 修改客户信息表单对象
            editCustomerForm: {
                Id: '',
                Shipper: '',
                Model: '',
                Name: '',
                Phone: '',
                Address: '',
                SaleDate: '',
                DeliveryDate: '',
                Remarks: '',
                Status: ''
            },

            // 表单验证规则
            formRules: {
                Shipper: [{
                    required: true,
                    message: '请输入出货人',
                    trigger: 'change'
                }],
                Model: [{
                    required: true,
                    message: '请输入型号',
                    trigger: 'blur'
                }],
                Name: [{
                    required: true,
                    message: '请输入顾客',
                    trigger: 'blur'
                }],
                Phone: [{
                    required: true,
                    message: '请输入联系方式',
                    trigger: 'blur'
                }],
                Address: [{
                    required: true,
                    message: '请输入收货地址',
                    trigger: 'blur'
                }],
                SaleDate: [{
                    required: true,
                    message: '请输入出单时间',
                    trigger: 'blur'
                }],
                DeliveryDate: [{
                    required: true,
                    message: '请输入送货时间',
                    trigger: 'blur'
                }],
            },
            // 打印窗口
            outVisible: false,
            // 控制出库窗口的显示和隐藏
            sendStockVisible: false,
            // 时间快捷选项
            pickerOptions: {
                // disabledDate(time) {
                //     return time.getTime() > Date.now();
                // },
                shortcuts: [{
                        text: '前天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 2);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {

                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    },
                    {
                        text: '明天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    },
                    {

                        text: '后天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 2);
                            picker.$emit('pick', date);
                        }
                    },
                ]
            },
        }
    }
}
