// 引入 modules 目录下的所有文件
import * as device from './modules/device.js';
import * as user from './modules/user.js';
import * as file from './modules/file.js';
import * as maintain from './modules/maintain.js';
import * as message from './modules/message.js';
import * as repair from './modules/repair.js';
import * as task from './modules/task.js';
import * as enterprise from './modules/enterprise.js';
import * as project from './modules/project.js';
import * as job from './modules/job.js';

uni.$service = {
  deviceService: device,
  userService: user,
  fileService: file,
  maintainService: maintain,
  messageService: message,
  repairService: repair,
  taskService: task,
  enterpriseService: enterprise,
  projectService: project,
  jobService: job,
};

/**
 * 下面的方法在手机端运行会报错
 *
 * 手机端不可用用 import.meta.glob 等方法
 */

// const modules = import.meta.glob('./modules/*.js');

// uni.$service = {};

// for (const path in modules) {
//   modules[path]().then((mod) => {
//     const moduleName = path.replace(/\.\/modules\/(.*)\.js/, '$1');
//     uni.$service[moduleName + 'Service'] = mod;
//   });
// }
