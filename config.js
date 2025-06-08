function addRow(info = {}) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input class="campo" type="text"></td>
    <td><input class="id" type="text"></td>
    <td><input class="opcoes" type="text"></td>`;
  if (info.campo) tr.querySelector(".campo").value = info.campo;
  if (info.id) tr.querySelector(".id").value = info.id;
  if (info.opcoes) tr.querySelector(".opcoes").value = info.opcoes.join("|");
  document.querySelector("#camposTable tbody").appendChild(tr);
}

document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ tipo: "config_get" }, (res) => {
    document.getElementById("apiKey").value = res.openaiKey || "";
    document.getElementById("prompt").value = res.promptPadrao || "";
    document.getElementById("modelo").value = res.modelo || "gpt-4o";
    (res.campos || []).forEach(c => addRow(c));
  });

  document.getElementById("addCampo").onclick = () => addRow();

  document.getElementById("salvar").onclick = () => {
    const campos = [];
    document.querySelectorAll("#camposTable tbody tr").forEach(tr => {
      const campo = tr.querySelector(".campo").value.trim();
      const id = tr.querySelector(".id").value.trim();
      const op = tr.querySelector(".opcoes").value.trim();
      campos.push({
        campo,
        id,
        opcoes: op ? op.split("|").map(s => s.trim()).filter(Boolean) : []
      });
    });

    const payload = {
      openaiKey: document.getElementById("apiKey").value,
      promptPadrao: document.getElementById("prompt").value,
      modelo: document.getElementById("modelo").value,
      campos
    };
    chrome.runtime.sendMessage({ tipo: "config_set", payload }, () => {
      alert("✅ Configurações salvas!");
    });
  };
});

