/* 是否手机号码*/
export function isPhone(rule, value, callback) {
	const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
	if( value==''||value==undefined||value==null ) {
		callback()
	}else {
		if((!reg.test(value)) && value !='') {
			callback( new Error('请输入正确的手机号'))
		}else {
			callback()
		}
	}
}


// 判断进货价格是否正确
export function isPurchasePrice( rule, value, callback) {
	const reg =/^[0-9]*[1-9][0-9]*$/
	if( value==''||value==undefined||value==null || value == 0 ) {
		callback( new Error('请输入正确的进货价格') )
	}else {
		if((!reg.test(value)) && value !='') {
			callback( new Error('请输入正确的进货价格'))
		}else {
			callback()
		}
	}
}

// 判断 修改库存中 新库存 是否为0
export function isQuantity(rule, value, callback) {
	if( value == 0 ){
		callback( new Error('新库存不能为0'))
	}
}

// 判断 售价 是否正确
export function isSell( rule, value, callback) {
	const reg =/^[0-9]*[1-9][0-9]*$/
	if( value==''|| value == 0 ) {
		callback( new Error('请输入正确的售价'))
	} else {
		if((!reg.test(value)) && value !='') {
			callback( new Error('请输入正确的售价'))
		}else {
			callback()
		}
	}
}
