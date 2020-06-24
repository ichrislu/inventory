import { getRefrigeratorInventory, getWashingMachineInventory, getAirCconditionerInventory, getTelevisionInventory } from '../../api/chartsApi'
import { test } from 'shelljs'

export default {
	// 冰箱库存
	refrigeratorInventory() {
		// setTimeout(() => {
		let dm = this.$echarts.init(document.getElementById('refrigeratorInventory'))
		getRefrigeratorInventory().then(res => {
			let echartData = res.data.refrigerator
			let option = this.ringSetConfig(echartData, '件')
			dm.setOption(option)
		})
		// }, 100)
	},

	// 洗衣机库存
	washingMachineInventory() {
		let dm = this.$echarts.init(document.getElementById('washingMachineInventory'))
		getWashingMachineInventory().then(res => {
			let echartData = res.data.refrigerator
			let option = this.ringSetConfig(echartData, '件')
			dm.setOption(option)
		})
	},

	// 空调库存
	airCconditionerInventory() {
		let dm = this.$echarts.init(document.getElementById('airCconditionerInventory'))
		getAirCconditionerInventory().then(res => {
			let echartData = res.data.refrigerator
			let option = this.ringSetConfig(echartData, '件')
			dm.setOption(option)
		})
	},

	// 彩电库存
	televisionInventory() {
		let dm = this.$echarts.init(document.getElementById('televisionInventory'))
		getTelevisionInventory().then(res => {
			let echartData = res.data.refrigerator
			let option = this.ringSetConfig(echartData, '件')
			dm.setOption(option)
		})
	},

	// 冰箱销量图
	refrigeratorSales() {
		// setTimeout(() => {
		let dm = this.$echarts.init(document.getElementById('refrigeratorSales'))

		let legend = {
			top: '5%',
			right: '10%',
			textStyle: {
				fontSize: 11
			},
			itemHeight: 15,
			itemWidth: 12,
			data: ['当月总销量', '海尔', '美的', '格力', 'LG']
			// data: ['今年', '去年', '基线']
		}
		let xdata = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
		let echartData = [
			{
				name: '当月总销量',
				data: [4050, 6200, 3212, 2480, 3790, 2220, 2571, 980, 2211, 2870, 1566, 2220],
				type: 'bar',
				smooth: true
			},
			{
				name: '海尔',
				data: [500, 666, 233, 100, 230, 350, 210, 111, 140, 60, 300, 210],
				type: 'line',
				smooth: true
			},
			{
				name: '美的',
				data: [1000, 2666, 2333, 1000, 2301, 102, 110, 95, 140, 400, 1100, 2300],
				type: 'line',
				smooth: true
			},
			{
				name: '格力',
				data: [2000, 3666, 2333, 1200, 2401, 112, 115, 195, 160, 300, 1200, 2400],
				type: 'line',
				smooth: true
			},
			{
				name: 'LG',
				data: [1000, 2636, 1333, 2200, 2201, 120, 160, 295, 260, 340, 1300, 2500],
				type: 'line',
				smooth: true
			}
		]
		let option = this.smoothedLineChart(legend, xdata, '件数', echartData)
		dm.setOption(option)
		// }, 100)
	},
	// 洗衣机销量图
	washingMachineSales() {
		// setTimeout(() => {
		let dm = this.$echarts.init(document.getElementById('washingMachineSales'))

		let legend = {
			top: '5%',
			right: '10%',
			textStyle: {
				fontSize: 11
			},
			itemHeight: 15,
			itemWidth: 12,
			data: ['当月总销量', '海尔', '美的', '格力', 'LG']
			// data: ['今年', '去年', '基线']
		}
		let xdata = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
		let echartData = [
			{
				name: '当月总销量',
				data: [5050, 6000, 3212, 3480, 4790, 1220, 1571, 2300],
				type: 'bar',
				smooth: true
			},
			{
				name: '海尔',
				data: [500, 666, 233, 100, 230, 350, 210, 111],
				type: 'line',
				smooth: true
			},
			{
				name: '美的',
				data: [1000, 2666, 2333, 1000, 2301, 102, 110, 95],
				type: 'line',
				smooth: true
			},
			{
				name: '格力',
				data: [2000, 3666, 2333, 1200, 2401, 112, 115, 195],
				type: 'line',
				smooth: true
			},
			{
				name: 'LG',
				data: [1000, 2636, 1333, 2200, 2201, 120, 160, 295],
				type: 'line',
				smooth: true
			}
		]
		let option = this.smoothedLineChart(legend, xdata, '件数', echartData)
		dm.setOption(option)
		// }, 100)
	},
	// 空调销量图
	airConditionerSales() {
		// setTimeout(() => {
		let dm = this.$echarts.init(document.getElementById('airConditionerSales'))

		let legend = {
			top: '5%',
			right: '10%',
			textStyle: {
				fontSize: 11
			},
			itemHeight: 15,
			itemWidth: 12,
			data: ['当月总销量', '海尔', '美的', '格力', 'LG']
			// data: ['今年', '去年', '基线']
		}
		let xdata = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
		let echartData = [
			{
				name: '当月总销量',
				data: [5050, 6000, 3212, 3480, 4790, 1220, 1571, 2600],
				type: 'bar',
				smooth: true
			},
			{
				name: '海尔',
				data: [500, 666, 233, 100, 230, 350, 210, 111],
				type: 'line',
				smooth: true
			},
			{
				name: '美的',
				data: [1000, 2666, 2333, 1000, 2301, 102, 110, 95],
				type: 'line',
				smooth: true
			},
			{
				name: '格力',
				data: [2000, 3666, 2333, 1200, 2401, 112, 115, 195],
				type: 'line',
				smooth: true
			},
			{
				name: 'LG',
				data: [1000, 2636, 1333, 2200, 2201, 120, 160, 295],
				type: 'line',
				smooth: true
			}
		]
		let option = this.smoothedLineChart(legend, xdata, '件数', echartData)
		dm.setOption(option)
		// }, 100)
	},
	// 彩电销量图
	televisionSales() {
		// setTimeout(() => {
		let dm = this.$echarts.init(document.getElementById('televisionSales'))

		let legend = {
			top: '5%',
			right: '10%',
			textStyle: {
				fontSize: 11
			},
			itemHeight: 15,
			itemWidth: 12,
			data: ['当月总销量', '海尔', '美的', '格力', 'LG']
			// data: ['今年', '去年', '基线']
		}
		let xdata = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
		let echartData = [
			{
				name: '当月总销量',
				data: [5050, 6000, 3212, 3480, 4790, 1220, 1571, 3500],
				type: 'bar',
				smooth: true
			},
			{
				name: '海尔',
				data: [500, 666, 233, 100, 230, 350, 210, 111],
				type: 'line',
				smooth: true
			},
			{
				name: '美的',
				data: [1000, 2666, 2333, 1000, 2301, 102, 110, 95],
				type: 'line',
				smooth: true
			},
			{
				name: '格力',
				data: [2000, 3666, 2333, 1200, 2401, 112, 115, 195],
				type: 'line',
				smooth: true
			},
			{
				name: 'LG',
				data: [1000, 2636, 1333, 2200, 2201, 120, 160, 295],
				type: 'line',
				smooth: true
			}
		]
		let option = this.smoothedLineChart(legend, xdata, '件数', echartData)
		dm.setOption(option)
		// }, 100)
	},

	/**
	 *  饼状配置
	 * @param echartData
	 * @param unit
	 * @returns {{backgroundColor: string, color: string[], legend: {formatter: (function(*): string), orient: string, itemHeight: number, icon: string, x: string, y: string, itemWidth: number, textStyle: {rich: {unit: {fontSize: number}, name: {fontSize: number}, value: {padding: number[], fontSize: number}}}, align: string}, series: [{data: *, center: string[], labelLine: {normal: {length2: number, length: number}}, label: {normal: {formatter: function(*): string, rich: {unit: {padding, fontSize, lineHeight}, value: {fontSize, lineHeight}}}}, type: string, radius: [string, string]}], tooltip: {trigger: string}, title: {top: string, left: string, textStyle: {rich: {val: {color: string, fontSize: number, fontWeight: string}, name: {padding: number[], color: string, fontSize: number, fontWeight: string}}}}}} option
	 */
	ringSetConfig(echartData, unit) {
		let scale = 1
		let bgColor = '#fff'
		let titleColor = '#666'
		let color = ['#55ee72', '#0496ff', '#bf64ff', '#f5c65f', '#00FFFF', '#4AEAB0']
		let formatNumber = function(num) {
			let reg = /(?=(\B)(\d{3})+$)/g
			return num.toString().replace(reg, ',')
		}
		let total = echartData.reduce((a, b) => {
			return a + b.value * 1
		}, 0)

		return {
			backgroundColor: bgColor,
			color: color,
			tooltip: {
				trigger: 'item'
			},
			title: {
				show: true,
				top: 'top',
				left: 'center',
				textStyle: {
					rich: {
						name: {
							fontSize: 22 * scale,
							fontWeight: 'bold',
							color: titleColor,
							padding: [10, 0]
						},
						val: {
							fontSize: 22 * scale,
							fontWeight: 'bold',
							color: titleColor
						}
					}
				}
			},
			legend: {
				left: '300',
				orient: 'vertical',
				icon: 'rect',
				x: '75%',
				y: 'center',
				itemWidth: 12 * scale,
				itemHeight: 12 * scale,
				align: 'left',
				textStyle: {
					rich: {
						name: {
							fontSize: 12 * scale
						},
						value: {
							fontSize: 16 * scale,
							padding: [0, 5, 0, 15]
						},
						unit: {
							fontSize: 12 * scale
						}
					}
				},
				formatter: function(name) {
					let res = echartData.filter(v => v.name === name)
					res = res[0] || {}
					let unit = res.unit || ''
					return '{name|' + name + '}'
				}
			},
			series: [
				{
					type: 'pie',
					// radius: ['50%', '60%'],
					right: '200',
					bottom: '0',
					radius: '50%',
					center: ['50%', '50%'],
					data: echartData,
					labelLine: {
						normal: {
							length: 10,
							length2: 10
						}
					},
					label: {
						normal: {
							formatter: params => {
								return (
									// "{value|" + params.percent + "}" + "{unit|%}"
									params.value + ' ' + unit
								)
							},
							rich: {
								value: {
									fontSize: 16 * scale,
									lineHeight: 16 * scale
								},
								unit: {
									fontSize: 12 * scale,
									lineHeight: 12 * scale,
									padding: [0, 0, 2 * scale, 0]
								}
							}
						}
					}
				}
			]
		}
	},

	/**
	 * 平滑折线图
	 * @param legend
	 * @param xData ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
	 * @param yName
	 * @param echartData
	 */
	smoothedLineChart(legend, xData, yName, echartData) {
		let color = ['#0496ff', '#55ee72', '#bf64ff', '#f5c65f', '#00FFFF', '#4AEAB0']

		return {
			color: color,
			legend: legend,
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				type: 'category',
				data: xData,
				axisLine: {
					show: false
				}
			},
			yAxis: {
				type: 'value',
				name: yName,
				axisLine: {
					show: false
				},
				axisLabel: {
					formatter: function(value, index) {
						// if (value >= 10000 && value < 10000000) {
						// 	value = value / 10000 + '万'
						// } else if (value >= 10000000) {
						// 	value = value / 10000000 + '千万'
						// }

						return value
					}
				}
			},
			series: echartData
		}
	},

}
