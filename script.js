
const KeyAuthApp = new KeyAuth({
  name: "PAINEL FHX TEAM",
  ownerid: "Ngs25UE5fj",
  version: "1.0"
});

function toast(mensagem, tempo = 3000) {
  const toast = document.getElementById("toast");
  toast.innerText = mensagem;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), tempo);
}

function verificarKey() {
  const usuario = document.getElementById("username").value;
  const key = document.getElementById("keyInput").value;

  if (!usuario || !key) return toast("❗ Preencha todos os campos.");

  KeyAuthApp.login(usuario, key)
    .then((res) => {
      if (res.success) abrirRaid(res.info);
      else toast("❌ Login inválido.");
    })
    .catch(() => toast("❌ Erro na conexão com KeyAuth."));
}

function abrirRaid(info) {
  document.getElementById("telaLogin").style.display = "none";
  document.getElementById("telaRaid").style.display = "block";

  document.getElementById("userInfo").innerText = info.username || "Desconhecido";
  document.getElementById("diasRestantes").innerText = info.subscriptions[0].expiry
    ? calcularDias(info.subscriptions[0].expiry)
    : "Ilimitado";

  toast("✅ Login bem-sucedido!", 2500);
}

function calcularDias(expiryTimestamp) {
  const agora = Math.floor(Date.now() / 1000);
  const segundosRestantes = expiryTimestamp - agora;
  const dias = Math.floor(segundosRestantes / 86400);
  return dias >= 0 ? dias + " dias" : "Expirada";
}

function enviarRaid() {
  const webhook = document.getElementById("webhookRaid").value;
  const msg = document.getElementById("mensagemRaid").value;
  const quant = parseInt(document.getElementById("quantidadeRaid").value);

  if (!webhook || !msg || isNaN(quant)) return toast("❗ Preencha todos os campos!");

  for (let i = 0; i < quant; i++) {
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: msg })
    }).catch((err) => console.log("Erro:", err));
  }

  toast("✅ Spam enviado!");
}
