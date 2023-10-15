import { ref } from "vue";

const useTabBar = (paging, taskList) => {
  const tabs = [
    {
      name: "未处理",
    },
    {
      name: "已处理",
    },
  ];

  const current = ref(0);

  const tabChange = (e) => {
    current.value = e;
    taskList.value = [];
    setTimeout(() => {
      paging.value.reload();
    }, 0);
  };

  return {
    tabs,
    current,
    tabChange,
  };
};

export { useTabBar };
