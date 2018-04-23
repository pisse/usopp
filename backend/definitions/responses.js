/**
 * Created by lawrence on 4/18/16.
 */
var joi = require('joi');

module.exports = {
    ApiResponse: joi.object({
        status: joi.number().integer().description('代码'),
        message: joi.string().description('提示消息'),
        data: joi.any().description('返回数据')
    })
};