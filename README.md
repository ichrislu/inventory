基础功能
- [x] 删除品类时，存在品牌，则不能删除
- [x] 删除品牌时，存在品牌的入库记录，则不能删除
- [x] 删除入库记录时，入库数量与库存数量不一致（说明有卖出），则不能删除
- [x] 修改库存时，对应销售的总数量不能低于新库存量（前端需要提示）
- [x] 修改价格时，对应销售的利润需要重新计算（前端需要提示）
- [x] 出库功能（事务中添加出库记录，修改库存表）
- [x] 出库数据是多个时，利润计算是否正确
- [x] 出库记录显示（按时间、出货人查询）
- [x] 显示总利润（SQL聚合算出来）
- [x] 查库存时，按库存数量倒序，入库时间升序次之
- [x] 查库存/出库，不分页，当返回数量超过100条时，前端提示：数据量较大，建议按日期过滤
- [x] 查库存界面，添加一个选项：包含已售出（inventory=0），默认为不包含
- [x] 报错时，不包含model对象
- [x] 出库表默认显示前100条（没有任何条件时，也可考虑前端其他方案做为默认过滤）

高级功能
- [x] （高）出货人/供货商，使用带输入建议的Input（需要后端提供接口，获取所有出货人/供货商[去重]）
- [x] （高）入库时间/出库时间/送货时间，使用带快捷选项的日期控件（比如：前天/昨天/今天/明天/后天）
- [x] （高）删除确认，改成气泡确认框
- [x] （中）操作提示，根据结果状态使用不同颜色
- [x] （可选）所有操作加Loading效果
- [x] （高）出库改为每次显示10条记录，无限滚动（需要后端提供接口）
- [x] （低）按钮全部改成圆形 + 更达意的Icon
- [x] （中）是否已送货，改为勾选
- [x] （中）数量的按钮位置改右边的上下方式
- [x] （高）品类/品牌，品类；品牌使用动态添加标签的方式，而非弹出框，删除类同
- [x] （高）页面上部，缩小高度
- [x] （中）修改功能应能修改允许修改的所有字段，包含备注（服务端做trim操作）
- [x] （高）添加favicon.ico
- [ ] （低）报表功能：按周/月出销售业绩折线图或柱状图（显示该时间的总销售业绩）；按月/年出销售利润折线图或柱状图（显示该时间的总利润）；按供货商/出货人出饼图；
- [x] 搜索栏宽度不一致
- [x] 顾客信息，送货地址太窄
- [ ] 大量改为指针
- [ ] 改用gin
- [ ] 库存页，使用Badge显示库存余量，节省一个列宽

当前难点：
- [x] 在修改库存时，如何知道此次修改提交是否需要修改入库数量和价格？因为存在当前提交值与数据库值相同的可能；另外，程序还需要知道如果成功修改了入库数量和价格，还有其他操作需要在同一事务中完成。解决方案：查出来一一对比，非零值都更新，（备注零值时可更新），记录更新中是否包含价格和入库数量，以备下一步更新利润和数量核实校验。
- [x] 流程：入库 -> 接单（录顾客信息登记表，全是必填项，状态默认为待送货） -> 线下送货 -> 晚上统一录入出库 -> 修改顾客信息表送货状态
- [x] 顾客信息登记表 和 出库表，只通过送货人关联
- [x] Id改为id服务方案
- [x] 打开浏览器失败
- [x] 顾客信息表可以按时间、送货人查询，加一个显示已送货功能，按id升序，默认显示所有未送货的记录。页面可打印
- [x] Win检测命令行窗口关闭事件，发生时执行停程序操作停Echo，关闭数据库连接）
- [x] 锁库bug

Bug
- [x] 无法添加类目，控制台有见报错
- [x] 顾客信息去掉删除按钮
- [x] 多次请求category的问题
- [x] 打印页头有undefined信息
- [x] 打印的表格线加粗
