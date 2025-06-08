document.getElementById("start-btn").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const campos = document.querySelectorAll("input, select, textarea");
      let dados = [];

      campos.forEach(campo => {
        const label = campo.closest("label")?.textContent || campo.name || campo.id || "Desconhecido";
        dados.push({ campo: label.trim(), valor: campo.value || "", origem: "HTML" });
      });

      chrome.runtime.sendMessage({ tipo: "captura", payload: dados });
    }
  });
});