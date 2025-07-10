const KEY_UNIVERSAL = "bytonymelivzmontop";

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

document.getElementById("btnGetKey").addEventListener("click", () => {
  window.open("https://discord.gg/xpXJkjDbmv", "_blank");
});
