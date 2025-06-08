const CAMPOS_PADRAO = [
  { campo: "brand", id: "input-brand" },
  { campo: "model", id: "input-model" },
  { campo: "color", id: "headlessui-combobox-input-:ra:" },
  { campo: "category", id: "category" },
  { campo: "Frame Type", id: "input-frameType", opcoes: ["Closed", "Open"] },
  { campo: "Rack position", id: "input-rackPosition", opcoes: ["Front", "rear", "front and rear"] },
  { campo: "Rear rack max load", id: "input-Rear rack max load" },
  { campo: "year", id: "input-year" },
  { campo: "seatTube (cm)", id: "input-seatTube" },
  { campo: "size (manufacturer)", id: "input-size" },
  { campo: "minSize", id: "input-minSize" },
  { campo: "maxSize", id: "input-maxSize" },
  { campo: "Brakes", id: "headlessui-combobox-input-:r16:" },
  { campo: "tyreBrand", id: "input-tyreBrand" },
  { campo: "etrto", id: "input-etrto" },
  { campo: "wheelsSize", id: "input-wheelsSize" },
  { campo: "transmissionBrand", id: "input-transmissionBrand" },
  { campo: "transmissionModel", id: "input-transmissionModel" },
  { campo: "transmissionSpeed", id: "input-transmissionSpeed" },
  { campo: "Transmission system", id: "input-transmissionSystem" },
  { campo: "Drivetrain", id: "input-drivetrain" },
  { campo: "mileage", id: "input-mileage" },
  { campo: "engineBrand", id: "input-engineBrand" },
  { campo: "engineModel", id: "input-engineModel" },
  { campo: "engineLocation", id: "input-engineLocation" },
  { campo: "completedCycles", id: "input-completedCycles" },
  { campo: "Bosch Display Model", id: "headlessui-combobox-input-:ro8:" },
  { campo: "Bosch Remote Model", id: "headlessui-combobox-input-:roc:" },
  { campo: "batteryCapacity (Wh)", id: "input-batteryCapacity (Wh)" },
  { campo: "batteryVolts", id: "input-batteryVolts" },
  { campo: "Battery Location", id: "input-batteryLocation" },
  { campo: "Battery Removability", id: "headlessui-combobox-input-:r2t:" }
];

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
  } else if (req.tipo === "config_get") {
    chrome.storage.sync.get(["openaiKey", "promptPadrao", "modelo", "campos"], (res) => {
      if (!res.campos) res.campos = CAMPOS_PADRAO;
      sendResponse(res);
    });
    return true;
  } else if (req.tipo === "config_set") {
    chrome.storage.sync.set(req.payload, () => sendResponse(true));
    return true;
  }
});