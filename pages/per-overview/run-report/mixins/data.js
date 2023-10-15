export const reportType = {
  all: Symbol(),
  week: Symbol(),
  month: Symbol(),
  custom: Symbol(),
};

export default {
  data() {
    return {
      list: [
        {
          startDate: "2023-02-01",
          endDate: "2023-02-01",
          reportType: reportType.week,
          name: "创建人",
          createDate: "2023-02-01",
        },
        {
          startDate: "2023-02-01",
          endDate: "2023-02-01",
          reportType: reportType.month,
          name: "创建人",
          createDate: "2023-02-01",
        },
        {
          startDate: "2023-02-01",
          endDate: "2023-02-01",
          reportType: reportType.custom,
          name: "创建人",
          createDate: "2023-02-01",
        },
        {
          startDate: "2023-02-01",
          endDate: "2023-02-01",
          reportType: reportType.month,
          name: "创建人",
          createDate: "2023-02-01",
        },
      ],
      currentReportType: reportType.all,
    };
  },
  computed: {
    showList() {
      return this.list;
    },
    showEmpty() {
      return !!this.list.length;
    },
  },
};
