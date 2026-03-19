const S = {
  file: null
};

const dropzone = IVGS.el("#dropzone");
const fileInput = IVGS.el("#fileInput");
const convertBtn = IVGS.el("#convertBtn");
const downloadLink = IVGS.el("#downloadLink");

// Click → open file dialog
IVGS.on(dropzone, "click", () => fileInput.click());

// File selected
IVGS.on(fileInput, "change", (e) => {
  S.file = e.target.files[0];
  dropzone.querySelector("p").textContent = S.file.name;
});

// Drag over
IVGS.on(dropzone, "dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("ivgs-dropzone-hover");
});

// Drag leave
IVGS.on(dropzone, "dragleave", () => {
  dropzone.classList.remove("ivgs-dropzone-hover");
});

// Drop file
IVGS.on(dropzone, "drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("ivgs-dropzone-hover");

  S.file = e.dataTransfer.files[0];
  dropzone.querySelector("p").textContent = S.file.name;
});

// Convert button
IVGS.on(convertBtn, "click", async () => {
  if (!S.file) {
    IVGS.toast("Please select a HEIC file first");
    return;
  }

  try {
    const jpgBlob = await heic2any({
      blob: S.file,
      toType: "image/jpeg",
      quality: 0.9
    });

    const url = URL.createObjectURL(jpgBlob);
    downloadLink.href = url;
    downloadLink.download = S.file.name.replace(/\.heic$/i, ".jpg");
    downloadLink.classList.remove("ivgs-hidden");

    IVGS.toast("Conversion complete!");
  } catch (err) {
    console.error(err);
    IVGS.toast("Error converting file");
  }
});
