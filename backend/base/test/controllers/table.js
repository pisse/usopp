/**
 * Created by lawrence on 9/9/16.
 */
module.exports = function () {
    this.getList = function *() {
        //console.log(this.requestParams)
        //throw new Core.restify.InternalServerError('接口异常1111111111!');
        return 'hello';
    }
    this.add = function *() {
        throw new Core.BizError('增加失败!');
    }
}