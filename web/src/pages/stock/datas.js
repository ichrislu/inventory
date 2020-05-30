export default {
    init: () => {

        //TODO  自定义规则

        return {
            // 品类品牌缓存对象
            session: [],
            // 搜索栏 表单对象
            searchForm: {
                keyword: '',
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

            // 新增库存 分类选择器绑定属性
            addValue: [],
            // 修改库存 分类选择器绑定属性
            editValue: [],
            // 搜索条件集合
            keyword: '',
            // 分类选择器绑定数组
            options: [],
            // 库存列表数据
            stockList: [],
            // 控制 新增库存的显示与隐藏
            showAddFormDialogVisible: false,
            // 新增库存表单
            addForm: {
                Provider: '',
                Date: '',
                Bid: '',
                Model: '',
                Price: '',
                Quantity: '',
                pickerOptions: {
                    disabledDate(time) {
                      return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                      text: '今天',
                      onClick(picker) {
                        picker.$emit('pick', new Date());
                      }
                    }, {
                      text: '昨天',
                      onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                      }
                    }, {
                      text: '一周前',
                      onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                      }
                    }]
                  },
            },
            // 新增库存表单对象预验证规则
            addFormRules: {
                Provider: [{
                    required: true,
                    message: '请输入供应商',
                    trigger: 'blur'
                }],
                Date: [{
                    required: true,
                    message: '请输入时间',
                    trigger: 'blur'
                }],
                date: [{
                    required: true,
                    message: '请输入时间',
                    trigger: 'blur'
                }],
                Cate: [{
                    required: true,
                    message: '请输入品类品牌',
                    trigger: 'blur'
                }],
                Model: [{
                    required: true,
                    message: '请输入型号',
                    trigger: 'blur'
                }],
                Price: [{
                    required: true,
                    message: '请输入进货价格',
                    trigger: 'blur'
                }, ],
                Quantity: [{
                    required: true,
                    message: '请输入数量',
                    trigger: 'blur'
                }],
                Inventory: [{
                    required: true,
                    message: '请输入数量',
                    trigger: 'blur'
                }],
                Sell: [{
                    required: true,
                    message: '请输入售价',
                    trigger: 'blur'
                }],
                Shipper: [{
                    required: true,
                    message: '请输入出货人',
                    trigger: 'blur'
                }],
                OutDate: [{
                    required: true,
                    message: '请输入时间',
                    trigger: 'blur'
                }],
                outQuantity: [{
                    required: true,
                    message: '请输入数量',
                    trigger: 'blur'
                }],
                // addValue: [{
                //     required: true,
                //     message: '请输入品类品牌',
                //     trigger: 'blur'
                // }],
            },
            // 控制 修改库存对话框
            showEditFormDialogVisible: false,
            // 修改库存表单对象
            editForm: {
                Id: '',
                Provider: '',
                Date: '',
                Bid: '',
                Model: '',
                Price: '',
                Quantity: '',
                Inventory: '',
                Brand: '',
                Category: '',
                EditNum: '',

            },
            //----------------------
            // 备注对话框 表单对象
            remarkForm: {
                // 备注内容
                Remarks: '',
                Id: ''
            },
            // 控制备注框显示与隐藏
            showRemarkDialogVisible: false,
            // 控制出库表单的显示与隐藏
            outStockFormDialogVisible: false,
            // 出库表单对象
            outStockForm: {
                Provider: '',
                Cate: '',
                Brand: '',
                Model: '',
                Price: '',
                Inventory: '',
                InDate: '',

                Sid: '',
                OutDate: '',
                Quantity: '',
                Shipper: '',
                Sell: '',
            },
            // 出库表单对象 分类属性
            outStockValue: '',
            filters: {},
            // 时间快捷选项
            pickerOptions: {
                shortcuts: [{
                  text: '今天',
                  onClick(picker) {
                    picker.$emit('pick', new Date());
                  }
                }, {
                  text: '昨天',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                  }
                }, {
                  text: '一周前',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                  }
                }]
              },
        }
    }
}
