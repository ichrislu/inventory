import Mock from 'mockjs';

//角色模板生成随机数据
const Role = [];
for (let i = 0; i < 40; i++) {
    Role.push(Mock.mock({
        id: Mock.Random.guid(),
        description: Mock.Random.cname(),
        isActive: Mock.Random.integer(0, 1),
        changeBy: Mock.Random.last(),
        changeDate: Mock.Random.date(),
        remark: Mock.Random.name()
    }));
}

//项目生成随机数据
const Project = [];
for (let i = 0; i < 30; i++) {
    Project.push(Mock.mock({
        organization_description: Mock.Random.integer(3, 10),
        id: Mock.Random.guid(),
        description: Mock.Random.cname(),
        address: Mock.Random.cname(),
        trade: Mock.Random.cname(),
        buildArea: Mock.Random.integer(90, 300),
        usableArea: Mock.Random.integer(100, 200),
        projCode: Mock.Random.zip(),
        changeBy: Mock.Random.last(),
        buildDate: Mock.Random.date(),
        changeDate: Mock.Random.date(),
        hasLogo: Mock.Random.image('220x200'),
        hasImage: Mock.Random.image('720x240')
    }));
}

//企业及机构生成随机数据
const Organization = [];
for (let i = 0; i < 40; i++) {
    Organization.push(Mock.mock({
        oid: Mock.Random.integer(3, 10),
        id: Mock.Random.guid(),
        description: Mock.Random.cname(),
        isActive: Mock.Random.integer(0, 1),
        type: Mock.Random.last(),
        grantAllBizType: Mock.Random.integer(0, 1),                                      //拥有所有业务类型权限(boolean)
        changeDate: Mock.Random.date(),
        buildDate: Mock.Random.date(),
        changeBy: Mock.Random.last(),
        remark: Mock.Random.last(),
        orgCode: Mock.Random.name(),
        typecode: Mock.Random.integer(3, 20),
        typename: Mock.Random.cname(),
    }));
}

//企业业务类型生成随机数据
const OrganizationType = [];
for (let i = 0; i < 40; i++) {
    OrganizationType.push(Mock.mock({
        id: Mock.Random.guid(),                                                     //企业业务类型ID(bigint)
        orgId:Mock.Random.guid(),                                                 //企业ID(bigint)
        code:Mock.Random.zip(),                                                   //编码(varchar)
        description: Mock.Random.cname(),                                        //描述(varchar)
        remark: Mock.Random.last(),                                                //备注(varchar)
        changeBy: Mock.Random.last(),                                           //修改人(bigint)
        changeDate: Mock.Random.date(),                                            //修改时间(datetime)
        createBy:Mock.Random.last(),                                              //创建人(bigint)
        createDate:Mock.Random.date(),                                            //创建日期(datetime)
        isActive:Mock.Random.integer(0, 1),                                               //是否有效(boolean)
    }));
}
export { Role ,Project ,Organization ,OrganizationType };