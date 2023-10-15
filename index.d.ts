import { HttpRequestAbstract } from 'luch-request';

export {};

declare global {
  interface Uni extends UniNamespaces {
    $service: {
      deviceService: typeof import('./service/modules/device');
      userService: typeof import('./service/modules/user');
      fileService: typeof import('./service/modules/file');
      maintainService: typeof import('./service/modules/maintain');
      messageService: typeof import('./service/modules/message');
      repairService: typeof import('./service/modules/repair');
      taskService: typeof import('./service/modules/task');
      enterpriseService: typeof import('./service/modules/enterprise');
      projectService: typeof import('./service/modules/project');
      jobService: typeof import('./service/modules/job');
    };
    $uniUtils: typeof import('./utils/uni');
    $http: HttpRequestAbstract;
  }
}
