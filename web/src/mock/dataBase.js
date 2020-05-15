const Mock = require('mockjs');
const Random = Mock.Random;
const data = Mock.mock({
    'list|8': [{
        sup : '@cname',
        date : '@date("yyyy-MM-dd")' ,
        cate : '@ctitle(2)',
        brand : '@ctitle(2)',
        model : '@id',
        price : '@natural(0,50000)',
        num : '@natural(50,100)',
        o_num : '@natural(0,50)',
        tip : '@cparagraph(1, 3)'
    }]
});

// console.log(data);
console.log(JSON.stringify(data, null, 4));
