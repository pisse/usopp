/**
 * Created by lawrence on 5/6/16.
 */
var joi = require('joi');

module.exports = [
  {
    path: '/secure/setCookie',
    method: 'get',
    meta: {
      use: true,
      auth: false
    },
    controller: {
      name: 'secure',
      action: 'setCookie'
    },
    swagger: {
      tags: ["安全管理"],
      summary: '安全管理',
      description: '设置cookie',
      produces: [
        'application/json'
      ]
    },
    parameters: {
      query: joi.object({
        retUrl: joi.string().description('系统url'),
      })
    },
    responses: {
      200: {
        description: '',
        schema: {
          $ref: '#/definitions/ApiResponse'
        }
      }
    }
  },
  {
    path: '/secure/login',
    method: 'get',
    meta: {
      use: true,
      auth: false
    },
    controller: {
      name: 'secure',
      action: 'login'
    },
    swagger: {
      tags: ["安全管理"],
      summary: '登入',
      description: '登入',
      produces: [
        'application/json'
      ]
    },
    parameters: {
      query: joi.object({
        code: joi.string().description('用户登录凭证code')
      })
    },
    responses: {
      200: {
        description: '',
        schema: {
          $ref: '#/definitions/ApiResponse'
        }
      }
    }
  },
  {
    path: '/secure/logout',
    method: 'get',
    meta: {
      use: true,
      auth: false
    },
    controller: {
      name: 'secure',
      action: 'logout'
    },
    swagger: {
      tags: ["安全管理"],
      summary: '登出',
      description: '登出',
      produces: [
        'application/json'
      ]
    },
    parameters: {
      query: joi.object({})
    },
    responses: {
      200: {
        description: '',
        schema: {
          $ref: '#/definitions/ApiResponse'
        }
      }
    }
  }
];