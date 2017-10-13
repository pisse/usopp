/**
 * Created by lawrence on 4/19/16.
 */
var Mysql = {
    DataTypes: null,
    db: null,
    init: function (conf) {
        require('util').log('Mysql: Intializing Mysql client by the sequelize...');
        var Sequelize = Mysql.DataTypes = require('sequelize');

        Mysql.db = new Sequelize(getConfig('db', 'mysql').database, getConfig('db', 'mysql').user, getConfig('db', 'mysql').password, {
            host: getConfig('db', 'mysql').host,
            port: getConfig('db', 'mysql').port,
            dialect: 'mysql',
            timezone: '+08:00',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        });
    }
}

module.exports = Mysql;