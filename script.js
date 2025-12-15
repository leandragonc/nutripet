// ===============================
// NUTRIPET - SCRIPT PRINCIPAL
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // CADASTRO (nutri.html)
  // ===============================
  const cadastroForm = document.querySelector(".cadastro-form");

  if (cadastroForm) {
    cadastroForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const usuario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        petNome: document.getElementById("pet-nome").value,
        petTipo: document.getElementById("pet-tipo").value,
        petRaca: document.getElementById("pet-raca").value,
        petIdade: document.getElementById("pet-idade").value,
        petPeso: document.getElementById("pet-peso").value,
        petInfo: document.getElementById("pet-info").value
      };

      localStorage.setItem("usuarioNutriPet", JSON.stringify(usuario));
      localStorage.setItem("pedidosNutriPet", JSON.stringify([]));

      window.location.href = "portal.html";
    });
  }

  // ===============================
  // PORTAL (portal.html)
  // ===============================
  if (window.location.pathname.includes("portal.html")) {

    const usuario = JSON.parse(localStorage.getItem("usuarioNutriPet"));
    if (!usuario) {
      window.location.href = "nutri.html";
      return;
    }

    // -------- BOAS-VINDAS --------
    const boasVindas = document.getElementById("boasVindas");
    if (boasVindas) {
      boasVindas.textContent = `Olá, ${usuario.nome.split(" ")[0]} 👋`;
    }

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value || "—";
    };

    setText("petNome", usuario.petNome);
    setText("petTipo", usuario.petTipo);
    setText("petPeso", usuario.petPeso);

    // -------- RECOMENDAÇÃO --------
    let recomendacao = "Ração premium balanceada";

    if (usuario.petTipo === "gato") {
      recomendacao = "Ração para gatos com controle urinário";
    } else if (usuario.petPeso >= 15) {
      recomendacao = "Ração para cães de grande porte";
    }
    // ===============================
// DETALHES DO PLANO ALIMENTAR
// ===============================
const btnDetalhes = document.getElementById("verDetalhes");
const detalhesPlano = document.getElementById("detalhesPlano");

if (btnDetalhes && detalhesPlano) {
  btnDetalhes.addEventListener("click", () => {
    const aberto = detalhesPlano.style.display === "block";

    if (aberto) {
      detalhesPlano.style.display = "none";
      btnDetalhes.textContent = "Ver detalhes";
    } else {
      detalhesPlano.style.display = "block";
      btnDetalhes.textContent = "Ocultar detalhes";
    }
  });
}

// Conteúdo dinâmico do plano
const detalhe1 = document.getElementById("detalhe1");
const detalhe2 = document.getElementById("detalhe2");
const detalhe3 = document.getElementById("detalhe3");

if (detalhe1 && detalhe2 && detalhe3) {
  if (usuario.petTipo === "gato") {
    detalhe1.textContent = "✔ Controle urinário";
    detalhe2.textContent = "✔ Alta palatabilidade";
    detalhe3.textContent = "✔ Proteínas de alta digestão";
  } else {
    detalhe1.textContent = "✔ Energia balanceada";
    detalhe2.textContent = "✔ Suporte articular";
    detalhe3.textContent = "✔ Vitaminas e minerais essenciais";
  }
}


    setText("recomendacao", recomendacao);

    // ===============================
    // PEDIDOS
    // ===============================
    const btnPedido = document.getElementById("fazerPedido");
    const historicoEl = document.getElementById("historicoPedidos");
    const notificacoes = document.getElementById("notificacoes");

    const pedidos = JSON.parse(localStorage.getItem("pedidosNutriPet")) || [];

    const renderPedidos = () => {
      if (!historicoEl) return;
      historicoEl.innerHTML = "";

      pedidos.forEach((p, index) => {
        const li = document.createElement("li");
        li.textContent = `Pedido #${index + 1} — ${p.status}`;
        historicoEl.appendChild(li);
      });
    };

    renderPedidos();

    if (btnPedido) {
      btnPedido.addEventListener("click", () => {
        btnPedido.disabled = true;
        btnPedido.textContent = "Processando pedido...";

        setTimeout(() => {
          const novoPedido = {
            data: new Date().toLocaleString(),
            status: "Pedido confirmado ✅"
          };

          pedidos.push(novoPedido);
          localStorage.setItem("pedidosNutriPet", JSON.stringify(pedidos));

          if (notificacoes) {
            notificacoes.textContent =
              "📦 Seu pedido foi realizado com sucesso!";
          }

          btnPedido.textContent = "Pedido Realizado";
          renderPedidos();
        }, 1200);
      });
    }

    // ===============================
    // ESPECIALISTA
    // ===============================
    const btnEspecialista = document.getElementById("falarEspecialista");

    if (btnEspecialista) {
      btnEspecialista.addEventListener("click", () => {
        if (notificacoes) {
          notificacoes.textContent =
            "💬 Especialista NutriPet: Estamos analisando os dados do seu pet!";
        }
      });
    }

    // ===============================
    // LOGOUT
    // ===============================
    const logout = document.getElementById("logout");
    if (logout) {
      logout.addEventListener("click", () => {
        localStorage.removeItem("usuarioNutriPet");
        window.location.href = "nutri.html";
      });
    }
  }
});
