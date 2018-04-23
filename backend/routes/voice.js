/**
 * Created by lawrence on 5/6/16.
 */
var joi = require('joi');

module.exports = [
  {
    path: '/voice/recognize',
    method: 'post',
    meta: {
      use: true,
      auth: false
    },
    controller: {
      name: 'voice',
      action: 'recognize'
    },
    swagger: {
      tags: ["智能语音"],
      summary: '语音识别',
      description: '语音识别',
      consumes: ['multipart/form-data'],
      produces: [
        'application/json'
      ]
    },
    parameters: {
      formData: joi.object({
        lang: joi.number().description('语言')
      }),
      file: {
        in: 'formData',
        description: '语音',
        required: false,
        type: 'file',
        name: 'record'
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