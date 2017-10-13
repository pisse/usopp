/**
 * Created by wangxinyang on 9/13/16.
 */
var joi = require('joi');

//定义接口请求数据

module.exports = {
    /*DishSetParam: joi.object({
        dishSetID: joi.number().required().description("套餐菜品ID"),
        dishList: joi.array().items({
            dishID: joi.number().required().description('菜品ID'),
            dishNumber: joi.number().required().description('当前数量'),
            typeName: joi.string().description('分类名称')
        })
    }),
    PrinterParam: joi.object({
        shopName: joi.string().required().description("商户名称"),
        printerID: joi.number().required().description("物理打印机ID"),
        configType: joi.number().required().description("打印类别:1为菜品分类打印;2为区域打印;3为结账打印;4为菜品打印"),
        copies: joi.number().required().description("打印份数"),
        printInvoiceType: joi.number().required().description("打印单据类型:1为结账单;2为预结单;3为送厨总单;4为分单;8为蓝牙标签"),
        status: joi.number().required().description("状态:1正常;0禁用"),
        dishTypeList: joi.array().items({
            forignID: joi.number().required().description('打印类别为菜品分类时,值为"菜品分类ID";为区域打印时,值为"区域ID";为结账打印时,值为-1'),
            forignName: joi.string().description('名称')
        })
    })*/
};