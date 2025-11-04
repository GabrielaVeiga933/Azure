const sasUrl = "https://blobstorage289.blob.core.windows.net/uploads?sp=racwdl&st=2025-11-03T23:52:01Z&se=2025-11-04T08:07:01Z&spr=https&sv=2024-11-04&sr=c&sig=k%2Fs8hT0F49ZjjoE8Fenj8S4vre5y0bL1azkBciWgpLI%3D";
 
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const status = document.getElementById("status");
 
uploadBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) return alert("Selecione um arquivo primeiro!");
 
  const blobUrl = `${sasUrl.split("?")[0]}/${file.name}${sasUrl.substring(sasUrl.indexOf("?"))}`;
 
  try {
    status.textContent = "⏳ Enviando arquivo...";
 
    const response = await fetch(blobUrl, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file
    });
 
    if (response.ok) {
      status.innerHTML = `✅ Upload concluído!<br>URL: <a href="${blobUrl.split('?')[0]}" target="_blank">${blobUrl.split('?')[0]}</a>`;
      console.log("Upload concluído:", blobUrl);
    } else {
      const text = await response.text();
      throw new Error(`Falha no upload: ${response.status} ${response.statusText}\n${text}`);
    }
  } catch (error) {
    console.error("Erro ao enviar arquivo:", error);
    status.textContent = `❌ Erro ao enviar arquivo: ${error.message}`;
  }
});