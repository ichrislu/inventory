// 电话
let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

// 必须为数字
let numberReg = /^\d+$|^\d+[.]?\d+$/

// 联系人
let contactsReg = /^[\u0391-\uFFE5A-Za-z]+$/

let FormValidate = (function () {
  function FormValidate () {}
  // From表单验证规则  可用于公用的校验部分
  FormValidate.Form = function () {
    return {

      // 只能数字的验证
      validateNumber (rule, value, callback) {
        if (value !== '') {
          if (!numberReg.test(value)) {
            callback(new Error('员工数量必须为数字'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },

      // 联系人
      validateContacts (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入联系人'))
        }
        if (!contactsReg.test(value)) {
          callback(new Error('联系人不可输入特殊字符'))
        } else {
          callback()
        }
      },

      // 电话号码的验证
      validatePhone (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入手机号码'))
        }
        if (!phoneReg.test(value)) {
          callback(new Error('手机格式不正确'))
        } else {
          callback()
        }
      },
    }
  }

  return FormValidate
}())

exports.FormValidate = FormValidate
