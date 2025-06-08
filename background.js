chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.tipo === "captura") {
    const csv = req.payload.map(l => `${l.campo},,${l.valor},${l.origem},`).join("\n");
    const csvContent = "Campo,% Certeza,Valor sugerido,Origem,Detalhes\n" + csv;
    const base64 = btoa(unescape(encodeURIComponent(csvContent)));
    const url = "data:text/csv;base64," + base64;

    chrome.downloads.download({
      url,
      filename: "envio/bike_dados.csv",
      saveAs: false
    });

    sendResponse("Dados capturados e CSV salvo.");
  }
});