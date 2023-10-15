/*
 * 时间格式化工具函数
 * dayjs官方文档：https://day.js.org/docs/zh-CN/display/format
 */

// 引入dayjs
import dayjs from 'dayjs';
// 引入中文语言包
import 'dayjs/locale/zh-cn';
// 引入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime';
// 引入isSameOrBefore 插件
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
// 配置使用中文语言包
dayjs.locale('zh-cn');
// 配置使用相对时间插件
dayjs.extend(relativeTime);
// 配置使用isSameOrBefore 插件
dayjs.extend(isSameOrBefore);

/**
 * 获取从传入日期到当前日期的所有月份,每一项都是一个对象，对象中包含月份和年份两个属性,
 * 例如：[{month: 1, year: 2021}, {month: 2, year: 2021}, {month: 3, year: 2021}]
 * @param {*} date 传入的日期，格式为'YYYY-MM-DD'，默认为当前日期
 * @returns 返回一个数组，数组中包含从传入日期到当前日期的所有月份，每一项都是一个对象，对象中包含月份和年份两个属性
 */
function getMonthArr(date) {
  // 1. 获取当前日期
  const now = dayjs();
  // 2. 获取传入日期
  let d = dayjs(date || now);
  // 3. 定义一个数组，用来存储每一项
  const arr = [];
  // 4. 循环，从传入日期到当前日期，每次循环都生成一个对象，对象中包含月份和年份两个属性
  while (d.isSameOrBefore(now, 'month')) {
    arr.push({
      month: d.month() + 1,
      year: d.year(),
    });
    // 每次循环，月份加1
    d = d.add(1, 'month');
  }
  return arr;
}

/**
 * 格式化时间
 * @param {*} time 时间戳或者时间字符串
 * @param {*} format 格式化字符串，默认为'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的时间
 */
function formatTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format);
}

/**
 * 生成随机时间，格式为'yyyy-MM-dd HH:mm'
 */
function randomTime() {
  return dayjs()
    .subtract(Math.floor(Math.random() * 10), 'day')
    .format('YYYY-MM-DD HH:mm');
}

export { getMonthArr, formatTime, randomTime };
