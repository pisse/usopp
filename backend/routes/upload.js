/**
 * Created by lawrence on 5/6/16.
 */
var joi = require('joi');

module.exports = [
  {
    path: '/upload/img',
    method: 'post',
    meta: {
      use: true,
      auth: false
    },
    controller: {
      name: 'upload',
      action: 'img'
    },
    swagger: {
      tags: ["文件上传"],
      summary: '文件上传',
      description: '图片上传',
      consumes: ['multipart/form-data'],
      produces: [
        'application/json'
      ]
    },
    parameters: {
      formData: joi.object({
        // id: joi.string().description('需求id')
      }),
      file: {
        in: 'formData',
        description: '图片',
        required: false,
        type: 'file',
        name: 'image'
      }
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