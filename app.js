// --- State ---
const S = IVGSJS.state({
  file: null,
  outputBlob: null
});

// --- Elements ---
const fileInput = IVGSJS.$("#fileInput");
const convertBtn = IVGSJS.$("#convertBtn");
const downloadLink = IVGSJS.$("#downloadLink");

// --- File selection ---
IVGSJS.on(fileInput, "change", (e) => {
  S.file = e.target.files[0] || null;
  S.outputBlob = null;
  downloadLink.classList.add("ivgs-hidden");
});

// --- Convert ---
IVGSJS.on(convertBtn, "click", async () => {
  if (!S.file) {
    IVGSJS.toast("Please select a HEIC file first");
    return;
  }

  try {
    const jpgBlob = await heic2any({
      blob: S.file,
      toType: "image/jpeg",
      quality: 0.9
    });

    S.outputBlob = jpgBlob;

    const url = URL.createObjectURL(jpgBlob);
    downloadLink.href = url;
    downloadLink.download = S.file.name.replace(".heic", ".jpg");
    downloadLink.classList.remove("ivgs-hidden");

    IVGSJS.toast("Conversion complete!");
  } catch (err) {
    console.error(err);
    IVGSJS.toast("Error converting file");
  }
});
