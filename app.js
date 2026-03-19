const { createApp } = Vue;

createApp({
  data() {
    return {
      file: null,
      fileName: "",
      downloadUrl: "",
      downloadName: "",
      status: "",
    };
  },

  methods: {
    openFileDialog() {
      document.querySelector("#fileInput").click();
    },

    handleFileSelect(e) {
      this.file = e.target.files[0];
      this.fileName = this.file?.name || "";
    },

    dragOver() {
      document.querySelector("#dropzone").classList.add("hover");
    },

    dragLeave() {
      document.querySelector("#dropzone").classList.remove("hover");
    },

    handleDrop(e) {
      document.querySelector("#dropzone").classList.remove("hover");
      this.file = e.dataTransfer.files[0];
      this.fileName = this.file?.name || "";
    },

    async convert() {
      if (!this.file) {
        this.status = "Please select a HEIC file first";
        return;
      }

      this.status = "Converting...";

      try {
        const jpgBlob = await heic2any({
          blob: this.file,
          toType: "image/jpeg",
          quality: 0.9,
        });

        this.downloadUrl = URL.createObjectURL(jpgBlob);
        this.downloadName = this.file.name.replace(/\.heic$/i, ".jpg");
        this.status = "Conversion complete!";
      } catch (err) {
        console.error(err);
        this.status = "Error converting file";
      }
    },
  },
}).mount("#app");
