document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ tipo: "config_get" }, (res) => {
    document.getElementById("apiKey").value = res.openaiKey || "";
    document.getElementById("prompt").value = res.promptPadrao || "";
    document.getElementById("modelo").value = res.modelo || "gpt-4o";
  });

  document.getElementById("salvar").onclick = () => {
    const payload = {
      openaiKey: document.getElementById("apiKey").value,
      promptPadrao: document.getElementById("prompt").value,
      modelo: document.getElementById("modelo").value
    };
    chrome.runtime.sendMessage({ tipo: "config_set", payload }, (res) => {
      alert("✅ Configurações salvas!");
    });
  };
});