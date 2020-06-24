import util from '../../common/js/util'
// import { isPhone } from '../../common/js/validator'
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
					shortcuts: [
						{
							text: '最近一周',
							onClick(picker) {
								const end = util.getTime()
								const start = util.getTime()
								start.setTime(start - 3600 * 1000 * 24 * 7)
								picker.$emit('pick', [start, end])
							}
						},
						{
							text: '最近一个月',
							onClick(picker) {
								const end = util.getTime()
								const start = util.getTime()
								start.setTime(start - 3600 * 1000 * 24 * 30)
								picker.$emit('pick', [start, end])
							}
						},
						{
							text: '最近三个月',
							onClick(picker) {
								const end = util.getTime()
								const start = util.getTime()
								start.setTime(start - 3600 * 1000 * 24 * 90)
								picker.$emit('pick', [start, end])
							}
						}
					]
				}
			},
			// 搜索提示对象数据
			restaurants: [],
			// 控制 打印提示 "包含已送货信息"的显示和隐藏
			show: false,
			// 控制客户信息表单的 显示与隐藏
			customerFormDialogVisible: false,
			// 新增顾客信息表单
			addCustomerForm: {
				Shipper: '',
				Model: '',
				Name: '',
				Phone: '',
				Address: '',
				SaleDate: '',
				DeliveryDate: '',
				Remarks: '',
				Status: 1
			},

			// 新增顾客 出单时间快捷选项

			issuingTimePickerOptions: {
				disabledDate(time) {
					return time.getTime() > util.getTime() - 0
				},
				shortcuts: [
					{
						text: '前天',
						onClick(picker) {
							picker.$emit('pick', util.getTime() - 3600 * 1000 * 24 * 2)
						}
					},
					{
						text: '昨天',
						onClick(picker) {
							picker.$emit('pick', util.getTime() - 3600 * 1000 * 24)
						}
					},
					{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', util.getTime())
						}
					}
				]
			},

			// 新增顾客 出货时间快捷选项

			deliveryTimePickerOptions: {
				shortcuts: [
					{
						text: '前天',
						onClick(picker) {
							picker.$emit('pick', util.getTime() - 3600 * 1000 * 24 * 2)
						}
					},
					{
						text: '昨天',
						onClick(picker) {
							picker.$emit('pick', util.getTime() - 3600 * 1000 * 24)
						}
					},
					{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', util.getTime())
						}
					},
					{
						text: '明天',
						onClick(picker) {
							picker.$emit('pick', util.getTime() - 0 + 3600 * 1000 * 24)
						}
					},
					{
						text: '后天',
						onClick(picker) {
							picker.$emit('pick', util.getTime() - 0 + 3600 * 1000 * 24 * 2)
						}
					}
				]
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
				Shipper: [
					{
						required: true,
						message: '请输入出货人',
						trigger: 'change'
					}
				],
				Model: [
					{
						required: true,
						message: '请输入型号',
						trigger: 'blur'
					}
				],
				Name: [
					{
						required: true,
						message: '请输入顾客',
						trigger: 'blur'
					}
				],
				Phone: [
					{
						required: true,
						message: '请输入联系方式',
						trigger: 'blur'
					}
					// { validator: isPhone, trigger: 'blur' }
				],
				Address: [
					{
						required: true,
						message: '请输入收货地址',
						trigger: 'blur'
					}
				],
				SaleDate: [
					{
						required: true,
						message: '请输入出单时间',
						trigger: 'blur'
					}
				],
				DeliveryDate: [
					{
						required: true,
						message: '请输入送货时间',
						trigger: 'blur'
					}
				]
			},
			// 打印窗口
			outVisible: false,
			// 控制出库窗口的显示和隐藏
			showFastEditStockVisible: false,
			// loading 开启
			loading: false
		}
	}
}
