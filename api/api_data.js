define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./main.js",
    "group": "D_______kiratechmeme_techmeme_backend_api_main_js",
    "groupTitle": "D_______kiratechmeme_techmeme_backend_api_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/v1/addRestaurant",
    "title": "发布餐厅信息",
    "name": "______",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>餐厅的名字</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>价格</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>图片</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "topic",
            "description": "<p>主题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reason",
            "description": "<p>推荐理由</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>地点</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "businessHours",
            "description": "<p>工作时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>经度</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>纬度</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>状态信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>状态结果.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"data\": \"餐厅信息保存成功\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./restaurant.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/v1/getAll/:page",
    "title": "获取所有餐厅信息",
    "name": "________",
    "group": "all",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>页数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>餐厅的名字</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>价格</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>图片</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "topic",
            "description": "<p>主题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reason",
            "description": "<p>推荐理由</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>地点</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "businessHours",
            "description": "<p>工作时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>经度</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>纬度</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "comments",
            "description": "<p>评论信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n  status: 200,\n  data: {\n    name: '可可西里',\n    price: 880,\n    picture: ['www.baidu.com'],\n    topic: '美味天下',\n    reason: '美女钟爱',\n    address: '可可西里',\n    businessHours: ['8','17.30'],\n    longitude: 120,\n    latitude: 87,\n    comments: [\n      {\n        openId: 65465465464,\n        userName: 'kiratech'\n        avatar: 'www.baidu.com',\n        contents: '这家餐厅不错'\n        likes: ['美美的', '小么么'],\n        nominate:[]\n      }\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./restaurant.js",
    "groupTitle": "all"
  }
] });