export default {
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    if (window.NOP_VIEWER) {
      this.isLoading = false;
    } else {
      this.initViewer();
    }
  },
  methods: {
    updateOption(val) {
      if (val.actionName === 'loadViewer' && val.url) {
        this.loadViewer(val.url);
      }
    },
    async initViewer() {
      this.isLoading = true;
      const iframeElement = document.createElement('iframe');
      iframeElement.id = 'bimViewer';
      iframeElement.style.width = '100%';
      iframeElement.style.height = '100%';
      iframeElement.src =
        'http://172.16.40.75:60000/gis/#/GISPreview?scene=resources://scenes/%E6%AD%A6%E6%B1%89%E6%B5%8B%E8%AF%95.scene';
      document.getElementById('viewer').appendChild(iframeElement);
    },
  },
};
