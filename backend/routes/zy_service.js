/**
 * Created by lawrence on 5/6/16.
 */
var joi = require('joi');

module.exports = [
  {
    path: '/zy_service/query',
    method: 'get',
    meta: {
      use: true,
      auth: false
    },
    controller: {
      name: 'zy_service',
      action: 'qa'
    },
    swagger: {
      tags: ["追一客服"],
      summary: '追一客服',
      description: '客服问答',
      // consumes: ['multipart/form-data'],
      produces: [
        'application/json'
      ]
    },
    parameters: {
      query: joi.object({
        question: joi.string().required().description('用户问句'),
        cid: joi.string().description('坐席辅助必填字段'),
        // pub_key: joi.string().description('分配的PublicKey'),
        eid: joi.string().description('业务入口'),
        account: joi.string().description('提问者唯一标识（如手机）'),
        // session_id: joi.string().description('会话ID'),
        labels: joi.string().description('答案标签'),
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
    path: '/zy_service/top',
    method: 'get',
    meta: {
      use: true,
      auth: false
    },
    controller: {
      name: 'zy_service',
      action: 'topTopic'
    },
    swagger: {
      tags: ["追一客服"],
      summary: '热点话题',
      description: '热点话题',
      // consumes: ['multipart/form-data'],
      produces: [
        'application/json'
      ]
    },
    parameters: {
      query: joi.object({
        num: joi.string().description('前几条热点'),
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
  }
];