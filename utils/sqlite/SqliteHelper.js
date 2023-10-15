export const dbVersion = '_v1';

const dbNamePrefix = 'miot_app_';
const dbPathPrefix = '_doc/' + dbNamePrefix;

/**
 * SqliteHelper
 *
 */
class SqliteHelper {
  constructor() {
    const userId = getApp().globalData.userId;
    if (!userId) {
      throw new Error('userId is null');
    } else {
      this.dbName = userId + dbVersion;
      this.loadSqliteStudio();
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new SqliteHelper();
    }
    return this.instance;
  }

  get dbOptions() {
    return {
      name: dbNamePrefix + this.dbName,
      path: dbPathPrefix + this.dbName + '.db',
    };
  }

  async init() {
    // #ifdef APP-PLUS
    await this.closeDb();
    await this.openDatabase();
    return new Promise((resolve, reject) => {
      Promise.all([
        //
      ])
        .then((e) => {
          console.info('数据库初始化完成');
          resolve(e);
        })
        .catch((e) => {
          console.error('数据库初始化失败：' + JSON.stringify(e));
          reject(e);
        });
    });
    // #endif
  }

  /**
   * 加载Sqlite Studio插件
   */
  loadSqliteStudio() {
    // #ifdef APP-PLUS
    // uni获取 appId
    // const appId = plus.runtime.appid;
    // uni.requireNativePlugin("uniplugin_sqlite_studio").init({
    //     appId,
    // });
    // #endif
  }

  /**
   * 打开数据库
   *
   * 如果数据库不存在则创建，存在则打开
   *
   * @returns {Promise} Promise对象
   */
  openDatabase() {
    // #ifdef APP-PLUS
    if (this.isOpenDb()) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      plus.sqlite.openDatabase({
        ...this.dbOptions,
        success: (e) => {
          console.info('数据库打开成功');
          resolve(e);
        },
        fail: (e) => {
          console.error('数据库打开失败：' + JSON.stringify(e));
          resolve(e);
        },
      });
    });
    // #endif
  }

  /**
   * 数据库是否打开
   * @returns {boolean} true: 打开; false: 未打开
   */
  isOpenDb() {
    // #ifdef APP-PLUS
    return plus.sqlite.isOpenDatabase(this.dbOptions);
    // #endif
    // #ifndef APP-PLUS
    // eslint-disable-next-line no-unreachable
    return false;
    // #endif
  }

  /**
   * table是否存在
   * @param {string} tableName 表名
   * @returns {boolean} true: 存在; false: 不存在
   */
  async isTableExist(tableName) {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      const sql = `SELECT COUNT(*) AS count FROM sqlite_master WHERE type='table' AND name='${tableName}'`;
      this.selectSql(sql)
        .then((e) => {
          resolve(e[0].isTable ? true : false);
        })
        .catch((e) => {
          resolve(false);
        });
    });
    // #endif
  }

  /**
   * 执行sql语句
   * @param {string|string[]} sql
   * @returns {Promise} Promise对象
   */
  async executeSql(sql) {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: this.dbOptions.name,
        sql: sql,
        success: (e) => {
          console.log(`执行sql语句成功`);
          resolve(e);
        },
        fail: (e) => {
          console.error(`执行sql语句失败: ` + JSON.stringify(e));
          reject(e);
        },
      });
    });
    // #endif
  }

  /**
   * 执行查询语句
   * @param {string|array} sql
   * @returns {Promise} Promise对象
   */
  async selectSql(sql) {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      plus.sqlite.selectSql({
        name: this.dbOptions.name,
        sql: sql,
        success: (e) => {
          // resolve(this.serialize(e));
          // TODO: 是否在这里 serialize ，还是在调用的地方 serialize
          resolve(e);
        },
        fail: (e) => {
          console.error('selectSql failed: ' + JSON.stringify(e));
          reject(e);
        },
      });
    });
    // #endif
  }

  /**
   * select list
   * @param {object} { tableName, fields, where, orderBy, limit } 条件
   * @param {string} tableName 表名
   * @param {array} fields 字段
   * @param {string} orderBy 排序
   * @param {string} where 条件
   * @returns {Promise} Promise对象
   */
  selectList({ tableName, fields, where, orderBy }) {
    return new Promise((resolve, reject) => {
      try {
        const fieldsStr = fields ? fields.join(',') : '*';
        const whereStr = where ? where : 'where 1=1';
        const orderByStr = orderBy ? `ORDER BY ${orderBy}` : '';
        const sql = `SELECT ${fieldsStr} FROM ${tableName} ${whereStr} ${orderByStr}`;
        this.selectSql(sql)
          .then((res) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * insert sql
   * @param {string|array} tableName 表名
   * @param {object} data 数据
   * @returns {Promise} Promise对象
   */
  async insertSql(tableName, data) {
    // #ifdef APP-PLUS
    const filterFields = (await this.getFieldsByTableName(tableName)).map((e) => e.name);
    return new Promise((resolve, reject) => {
      try {
        const fieldsStr = filterFields.join(',');
        const values = [];
        filterFields.forEach((item) => {
          const value = this.formatValue(data[item]);
          values.push(`'${value}'`);
        });
        const valStr = values.join(',');
        const sql = `INSERT INTO ${tableName} (${fieldsStr}) VALUES (${valStr})`;
        console.log('insertSql: ' + sql);
        this.executeSql(sql)
          .then((e) => {
            resolve(e);
          })
          .catch((e) => {
            reject(e);
          });
      } catch (error) {
        reject(error);
      }
    });
    // #endif
  }

  /**
   * update sql
   * @param {string} tableName 表名
   * @param {object} data 数据
   * @param {object} whereOjb where条件
   * @returns {Promise} Promise对象
   */
  async updateSql(tableName, data, whereOjb) {
    try {
      let allFields = await this.getFieldsByTableName(tableName);
      return new Promise((resolve, reject) => {
        let filterFields = this.filterFields(allFields, data);
        console.log('filterFields: ' + JSON.stringify(filterFields));
        const values = [];
        filterFields.forEach((item) => {
          const value = this.formatValue(data[item]);
          values.push(`${item}='${value}'`);
        });
        const valStr = values.join(',');
        const whereStr = this.getWhereStr(whereOjb);
        const sql = `UPDATE ${tableName} SET ${valStr} ${whereStr}`;
        console.log('updateSql: ' + sql);
        this.executeSql(sql)
          .then((e) => {
            resolve(e);
          })
          .catch((e) => {
            reject(e);
          });
      });
    } catch (error) {
      console.error('updateSql error: ' + error);
      reject(error);
    }
  }

  /**
   * insert list sql
   * @todo 待优化
   * @param {string} tableName 表名
   * @param {object[]} dataList 数据列表
   * @returns {Promise} Promise对象
   */
  async insertListSql(tableName, dataList) {
    // #ifdef APP-PLUS
    const filterFields = (await this.getFieldsByTableName(tableName)).map((e) => e.name);
    return new Promise((resolve, reject) => {
      try {
        // const filterFields = this.filterFields(fields, dataList[0]);
        const fieldsStr = filterFields.join(',');
        const values = [];
        dataList.forEach((data) => {
          const value = [];
          filterFields.forEach((item) => {
            const val = this.formatValue(data[item]);
            value.push(`'${val}'`);
          });
          values.push(`(${value.join(',')})`);
        });
        const valStr = values.join(',');
        const sql = `INSERT INTO ${tableName} (${fieldsStr}) VALUES ${valStr}`;
        this.executeSql(sql)
          .then((e) => {
            resolve(e);
          })
          .catch((e) => {
            reject(e);
          });
      } catch (error) {
        reject(error);
      }
    });
    // #endif
  }

  /**
   * delete sql
   * @param {string} tableName 表名
   * @param {object} whereOjb where条件
   * @returns {Promise} Promise对象
   */
  deleteSql(tableName, whereOjb) {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      try {
        const whereStr = this.getWhereStr(whereOjb);
        const sql = `DELETE FROM ${tableName} ${whereStr}`;
        console.log('deleteSql: ' + sql);
        this.executeSql(sql)
          .then((e) => {
            resolve(e);
          })
          .catch((e) => {
            reject(e);
          });
      } catch (error) {
        reject(error);
      }
    });
    // #endif
  }

  /**
   * 表结构添加多列字段
   * @param {string} tableName 表名
   * @param {object[]} fields 字段列表
   * @returns {Promise} Promise对象
   */
  async addColumns(tableName, fields) {
    // #ifdef APP-PLUS
    try {
      const filterFields = this.filterFields(await this.getFieldsByTableName(tableName), fields);
      return new Promise((resolve, reject) => {
        const sqlList = [];
        filterFields.forEach((item) => {
          sqlList.push(`ALTER TABLE ${tableName} ADD COLUMN ${item.name} ${item.type}`);
        });
        this.executeSql(sqlList)
          .then((e) => {
            resolve(e);
          })
          .catch((e) => {
            reject(e);
          });
      });
    } catch (error) {
      reject(error);
    }
    // #endif
  }

  /**
   * delete columns
   * @param {string} tableName 表名
   * @param {string[]} columns 字段列表
   * @returns {Promise} Promise对象
   */
  deleteColumns(tableName, columns) {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      try {
        const sqlList = [];
        columns.forEach((item) => {
          sqlList.push(`ALTER TABLE ${tableName} DROP COLUMN ${item}`);
        });
        this.executeSql(sqlList)
          .then((e) => {
            resolve(e);
          })
          .catch((e) => {
            reject(e);
          });
      } catch (error) {
        reject(error);
      }
    });
    // #endif
  }

  /**
   * 删除表
   * @param {string} tableName 表名
   * @returns {Promise} Promise对象
   */
  dropTable(tableName) {
    // #ifdef APP-PLUS
    return new Promise((resolve, reject) => {
      const sql = `DROP TABLE ${tableName}`;
      this.executeSql(sql)
        .then((e) => {
          resolve(e);
        })
        .catch((e) => {
          reject(e);
        });
    });
    // #endif
  }

  /**
   * get where str
   * @param {object} whereOjb where条件
   * @returns {string} where字符串
   */
  getWhereStr(whereOjb) {
    let whereStr = '';
    if (whereOjb) {
      const whereArr = [];
      for (let i in whereOjb) {
        whereArr.push(`${i}='${whereOjb[i]}'`);
      }
      whereStr = `WHERE ${whereArr.join(' AND ')}`;
    }
    return whereStr;
  }

  /**
   * 通过tableName获取字段
   * @param {string} tableName 表名
   * @returns {Promise} Promise对象
   */
  getFieldsByTableName(tableName) {
    return new Promise((resolve, reject) => {
      const sql = `PRAGMA table_info(${tableName})`;
      this.selectSql(sql)
        .then((e) => {
          // 过滤掉自增长字段
          // e = e.filter((item) => item.pk != 1);
          // console.log("getFieldsByTableName: " + JSON.stringify(e));
          resolve(e);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  /**
   * 过滤字段
   * @param {array} fieldList 字段列表
   * @param {object} data 数据
   * @returns {object} 过滤后的字段
   */
  filterFields(fieldList, data) {
    let arrField = {};
    for (let i in fieldList) {
      arrField[fieldList[i].name] = null;
    }
    let keys = [];
    for (let i in arrField) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(i) && data[i] != null) {
        keys.push(i);
      }
    }
    return keys;
  }

  /**
   * 格式化字符串
   * @param {string} str 字符串
   * @returns {string} 转换后的字符串
   */
  formatValue(str) {
    if (typeof str === 'number') {
      return str;
    } else if (typeof str === 'boolean') {
      return str ? 1 : 0;
    } else if (typeof str === 'string') {
      return str.replace(/'/g, "''");
    } else if (typeof str === 'object') {
      return JSON.stringify(str).replace(/'/g, "''");
    } else if (!str && str !== 0) {
      return 'NULL';
    } else {
      return str;
    }
  }

  /**
   * 序列化查询结果
   * 判断是否是数组或者对象，如果是则序列化
   * 判断字段是否是JSON字符串，如果是则反序列化
   * @param {array} data 查询结果
   * @returns {array} 序列化后的查询结果
   */
  serialize(data) {
    console.log(data);
    if (data && data.length > 0) {
      data.forEach((item) => {
        for (let i in item) {
          if (typeof item[i] === 'string') {
            try {
              const obj = JSON.parse(item[i]);
              if (typeof obj === 'object' && obj) {
                item[i] = obj;
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
      });
    }
    return data;
  }

  /**
   * 关闭数据库
   */
  closeDb() {
    if (!this.isOpenDb()) return;
    console.log('数据库名称: ' + this.dbOptions.name + ' 关闭');
    return new Promise((resolve, reject) => {
      plus.sqlite.closeDatabase({
        name: this.dbOptions.name,
        success: function () {
          console.info('数据库关闭成功');
          resolve();
        },
        fail: function (e) {
          console.error('数据库关闭失败: ' + JSON.stringify(e));
          reject(e);
        },
      });
    });
  }

  /**
   * destroy
   */
  async destroy() {
    console.log('数据库销毁');
    await this.closeDb();
    this.instance = null;
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  /**
   * 删除数据库文件
   */
  deleteDb() {
    return new Promise((resolve, reject) => {
      plus.io.resolveLocalFileSystemURL(
        `_doc/${this.dbOptions.name}.db`,
        (entry) => {
          entry.remove(
            (entry) => {
              console.log('数据库文件删除成功');
              resolve();
            },
            (e) => {
              console.error('数据库文件删除失败: ' + JSON.stringify(e));
              reject(e);
            },
          );
        },
        (e) => {
          console.error('数据库文件删除失败: ' + JSON.stringify(e));
          reject(e);
        },
      );
    });
  }
}

export default SqliteHelper;
