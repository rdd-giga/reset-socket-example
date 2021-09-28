const Ajv = require('ajv');
const addFormats = require("ajv-formats");


/**
 * Validate the message format.
 * @param {Object} message The message you want to push to server.
 * @param {String} type The message type: one of 'monitors' or 'readings'.
 * @return {Boolean} The result of validate.
 */
 function validate(message, type){
  let schema = setMessageSchema(type)
  let ajv = new Ajv({ validateSchema: 'log', strict: false });
  addFormats(ajv);

  let valid = ajv.validate(schema, message);
  if (!valid) {
    console.log(ajv.errors);
  }
  return valid;
}

/**
 * Define the schema for message base on mesage type.
 * @param {String} type The message type: one of 'monitors' or 'readings'.
 * @return {Object} The schema of message.
 */
function setMessageSchema(type){
    switch ( type ) {
    case 'readings':
      return {
        'type': 'object',
        'properties': {
          'message_id': {
            'type': 'string',
          },
          'data':  {
            'type': 'object',
            'properties': {
              'connection_id': {
                 'type': 'string',
              },
              'readings': {
                'type': 'array',
                'maxItems': 48,
                'items': {
                  'properties': {
                    'tvoc': {
                      'type': ['number', 'string', 'null'],
                    },
                    'pm2p5': {
                      'type': ['number', 'string', 'null'],
                    },
                    'co2': {
                      'type': ['number', 'string', 'null'],
                    },
                    'rh': {
                      'type': ['number', 'string', 'null'],
                    },
                    'temp': {
                      'type': ['number', 'string', 'null'],
                    },
                    'reading_time': {
                      'format': 'date-time',
                    },
                  },
                  'required': ['connection_id', 'reading_time', 'co2', 'pm2p5', 'tvoc'],
                },
              },
            },
            'required': ['readings', 'connection_id'],
          },
        },
      'required': ['data', 'message_id'],
    };


    case 'monitors':
      return {
        'oneOf': [
          {
            'type': 'object',
            'properties': {
              'message_id': {
                'type': 'string',
              },
              'message_type': {
                'type': 'string',
                'const': 'create',
              },
              'data': {
                'type': 'object',
                'properties': {
                  'connection_id': {
                    'type': 'string',
                  },
                  'module': {
                    type: 'string',
                    pattern: '^air|energy|water|waste|circularity$'
                  },
                  meta: {
                    'type': 'object',
                    'properties': {
                      'monitor_detail' : {
                        'type': 'object',
                        'properties': {
                          'monitor_brand': {
                            'type': 'string',
                          },
                          'monitor_brand': {
                            'type': 'string',
                          },
                          'monitor_serial_id': {
                            'type': 'string',
                          },
                          'last_monitor_calibration_date': {
                            'format': 'date-time'
                          }
                        },
                        'required': ['monitor_brand', 'monitor_sku', 'monitor_serial_id'],
                      },
                      'included_parameters': {
                        'type': 'object',
                        'properties': {
                          'pm2p5': {
                            'nullable': true,
                            'type': 'object',
                            'properties': {
                                'unit': {
                                  'type': 'string'
                                }
                            }
                          },
                          'co2': {
                            'nullable': true,
                            'type': 'object',
                            'properties': {
                              'unit': {
                                'type': 'string'
                              }
                            }
                          },
                          'tvoc': {
                            'nullable': true,
                            'type': 'object',
                            'properties': {
                              'unit': {
                                'type': 'string'
                              }
                            }
                          },
                          'temp': {
                            'nullable': true,
                            'type': 'object',
                            'properties': {
                              'unit': {
                                'type': 'string'
                              }
                            }
                          },
                          'rh': {
                            'nullable': true,
                            'type': 'object',
                            'properties': {
                              'unit': {
                                'type': 'string'
                              }
                            }
                          }
                        },
                        'required': ['co2', 'pm2p5', 'tvoc'],
                      },
                    },
                    'required': ['monitor_detail', 'included_parameters'],
                  },
                },
                'required': ['meta', 'connection_id', 'label', 'module'],
              },
            },
            'required': ['data', 'message_id', 'message_type'],
          },
          {
            'type': 'object',
            'properties': {
              'message_id': {
                'type': 'string',
              },
              'message_type': {
                'type': 'string',
                'const': 'modify',
              },
              'data': {
                'type': 'object',
                'properties': {
                  'connection_id': {
                    'type': 'string',
                  },
                  meta: {
                    'type': 'object',
                    'properties': {
                      'monitor_detail' : {
                        'type': 'object',
                        'properties': {
                          'monitor_brand': {
                            'type': 'string',
                          },
                          'monitor_brand': {
                            'type': 'string',
                          },
                          'monitor_serial_id': {
                            'type': 'string',
                          },
                          'last_monitor_calibration_date': {
                            'format': 'date-time'
                          }
                        },
                        'required': ['monitor_brand', 'monitor_sku', 'monitor_serial_id'],
                      },
                      'included_parameters': {
                        'type': 'object',
                        'properties': {
                          'pm2p5': {
                            'nullable': true,
                            'type': 'object',
                            'properties': {
                                'unit': {
                                  'type': 'string'
                                }
                            }
                          },
                          'co2': {
                            'nullable': true,
                            'type': 'object',
                            'properties': {
                              'unit': {
                                'type': 'string'
                              }
                            }
                          },
                          'tvoc': {
                            'nullable': true,
                            'type': 'object',
                            'properties': {
                              'unit': {
                                'type': 'string'
                              }
                            }
                          },
                          'temp': {
                            'nullable': true,
                            'type': 'object',
                            'properties': {
                              'unit': {
                                'type': 'string'
                              }
                            }
                          },
                          'rh': {
                            'nullable': true,
                            'type': 'object',
                            'properties': {
                              'unit': {
                                'type': 'string'
                              }
                            }
                          }
                        },
                        'required': ['co2', 'pm2p5', 'tvoc'],
                      },
                    },
                    'required': ['monitor_detail', 'included_parameters'],
                  },
                },
                'required': ['meta', 'connection_id', 'label'],
              },
            },
            'required': ['data', 'message_id', 'message_type'],
          },
          {
            'type': 'object',
            'properties': {
              'message_id': {
                'type': 'string',
              },
              'message_type': {
                'type': 'string',
                'const': 'disable',
              },
              'data': {
                'type': 'object',
                'properties': {
                  connection_id: {
                    'type': 'string',
                  },
                },
                'required': ['connection_id'],
              },
            },
            'required': [ 'message_id', 'message_type'],
          },
          {
            'type': 'object',
            'properties': {
              'message_id': {
                'type': 'string',
              },
              'message_type': {
                'type': 'string',
                'const': 'enable',
              },
              'data': {
                'type': 'object',
                'properties': {
                  connection_id: {
                    'type': 'string',
                  },
                },
                'required': ['connection_id'],
              },
            },
            'required': [ 'message_id', 'message_type'],
          },
        ],
        definitions: {
          moduleItems: {
            id: 'moduleItems',
            type: 'string',
            pattern: '^air|energy|water|waste$'
          }
        },
      };

    default:
      this.errors = 'invalid type';
      break;
    }
}

module.exports = {
  validate: validate
}
