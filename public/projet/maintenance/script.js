new Vue({
  el: "#app",
  data() {
    return {
      image: "",
      readyToSubmit: false,
    };
  },
  methods: {
    reset() {
      fetch("/maintenance/reset/")
        .then((response) => response)
        .then(({ data }) => {
          window.location.href = "/maintenance";
        });
    },
    uploadFile() {
      if (this.$refs.file.files[0]) {
        this.image = this.$refs.file.files[0];
      }
    },
    submitUpload() {
      this.readyToSubmit = true;
      let body = new FormData();
      body.append("file", this.image);
      axios
        .post("/upload-products", body)
        .then((response) => window.location.replace("/produit"));
    },
  },
  vuetify: new Vuetify(),
});
