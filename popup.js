document.getElementById("start-btn").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

          if (cfg.campo.toLowerCase() === "category") {
            const lbl = Array.from(document.querySelectorAll("label")).find(l =>
              l.textContent.toLowerCase().includes("category")
            );
            if (lbl && lbl.nextElementSibling) {
              const checks = lbl.nextElementSibling.querySelectorAll(
                "input[type=checkbox]"
              );
              valor = Array.from(checks)
                .filter(c => c.checked)
                .map(c => (c.nextElementSibling ? c.nextElementSibling.textContent.trim() : ""))
                .join("|");
            }
          } else {
            const el = document.getElementById(cfg.id);
            if (el) {
              if (el.type === "checkbox") {
                valor = el.checked ? "true" : "false";
              } else {
                valor = el.value || "";
              }
      target: { tabId: tab.id },
      func: (lista) => {
        const dados = [];
        let bikeId = "";
        const img = document.querySelector("img[src*='/bikes/']");
        if (img) {
          const m = img.src.match(/bikes\/([A-Za-z0-9]+)-/);
          if (m) bikeId = m[1];
        }
        if (!bikeId) {
          const u = window.location.href.match(/bikeId=([^&#]+)/);
          if (u) bikeId = u[1];
        }
        dados.push({ campo: "Bike ID", valor: bikeId, origem: "URL" });

        lista.forEach(cfg => {
          const el = document.getElementById(cfg.id);
          let valor = "";
          if (el) {
            if (el.type === "checkbox") {
              valor = el.checked ? "true" : "false";
            } else {
              valor = el.value || "";
            }
          }
          dados.push({ campo: cfg.campo, valor, origem: "HTML" });
        });

        chrome.runtime.sendMessage({ tipo: "captura", payload: dados });
      },
      args: [camposConf]
    });
  });
});

