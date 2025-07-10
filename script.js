const KEY_UNIVERSAL = "bytonymelivzmontop";
const MENSAGEM_FIXA = "@everyone By Tony_Dev Entrem: https://discord.gg/xpXJkjDbmv";

function toast(mensagem, tempo = 3000) {
  const toast = document.getElementById("toast");
  toast.innerText = mensagem;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), tempo);
}

function verificarKey() {
  const usuario = document.getElementById("username").value.trim();
  const key = document.getElementById("keyInput").value.trim();

  if (!usuario || !key) return toast("❗ Preencha todos os campos.");

  if (key === KEY_UNIVERSAL) {
    abrirRaid({ username: usuario, subscriptions: [{ expiry: 9999999999 }] });
    toast("✅ Login universal ativado!");
  } else {
    toast("❌ Key inválida.");
  }
}

function abrirRaid(info) {
  document.getElementById("telaLogin").style.display = "none";
  document.getElementById("telaRaid").style.display = "block";

  document.getElementById("userInfo").innerText = info.username || "Desconhecido";
  document.getElementById("diasRestantes").innerText = "Ilimitado";
}

function enviarRaid() {
  const webhook = document.getElementById("webhookRaid").value.trim();
  const quant = parseInt(document.getElementById("quantidadeRaid").value);

  if (!webhook || isNaN(quant)) return toast("❗ Preencha todos os campos!");

  for (let i = 0; i < quant; i++) {
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: MENSAGEM_FIXA })
    }).catch((err) => console.log("Erro:", err));
  }

  toast("✅ Spam enviado!");
}

// Botão "Get Key" abre o Discord numa nova aba
document.getElementById("btnGetKey").addEventListener("click", () => {
  window.open("https://discord.gg/xpXJkjDbmv", "_blank");
});
