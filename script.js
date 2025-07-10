const KEY_UNIVERSAL = "bytonymelivzmontop";
const MENSAGEM_FIXA = "@everyone By Tony_Dev Entrem: https://discord.gg/xpXJkjDbmv";

function toast(mensagem, tempo = 3000) {
  const toast = document.getElementById("toast");
  toast.innerText = mensagem;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), tempo);
}

function verificarKey() {
  const key = document.getElementById("keyInput").value.trim();

  if (!key) {
    toast("❗ Preencha a key.");
    return;
  }

  if (key === KEY_UNIVERSAL) {
    abrirRaid(key);
    toast("✅ Login universal ativado!");
  } else {
    toast("❌ Key inválida.");
  }
}

function abrirRaid(key) {
  document.getElementById("telaLogin").style.display = "none";
  document.getElementById("telaRaid").style.display = "block";

  document.getElementById("keyInfo").innerText = key;
  document.getElementById("diasRestantes").innerText = "Ilimitado";
}

function enviarRaid() {
  const webhook = document.getElementById("webhookRaid").value.trim();
  const quant = parseInt(document.getElementById("quantidadeRaid").value);

  if (!webhook || isNaN(quant) || quant < 1) {
    toast("❗ Preencha todos os campos corretamente!");
    return;
  }

  for (let i = 0; i < quant; i++) {
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: MENSAGEM_FIXA })
    }).catch((err) => console.error("Erro ao enviar spam:", err));
  }

  toast("✅ Spam enviado!");
}

document.getElementById("btnGetKey").addEventListener("click", () => {
  window.open("https://discord.gg/xpXJkjDbmv", "_blank");
});
