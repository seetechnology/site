/* SeeTech — JavaScript puro (sem frameworks, sem JSON) */
(function () {
  "use strict";

  /* ===== Altere aqui seus dados de contato reais ===== */
  var WHATSAPP = "5511999999999"; // 55 + DDD + número (somente dígitos)
  var WHATSAPP_LABEL = "(11) 99999-9999";
  var EMAIL = "contato@seetech.com.br";
  var CIDADE = "São Paulo — Zona Norte, SP";
  /* ================================================== */

  function whatsLink(msg) {
    return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
  }

  function byId(id) {
    return document.getElementById(id);
  }

  // Dados de contato na página
  byId("year").textContent = String(new Date().getFullYear());
  byId("whatsLabel").textContent = WHATSAPP_LABEL;
  byId("cityLine").textContent = CIDADE;

  var emailLink = byId("emailLink");
  emailLink.textContent = EMAIL;
  emailLink.href = "mailto:" + EMAIL;

  byId("headerWhats").href = whatsLink("Olá, SeeTech! Vim pelo site e gostaria de um orçamento.");

  var links = document.querySelectorAll(".js-whats");
  for (var i = 0; i < links.length; i++) {
    links[i].href = whatsLink(links[i].getAttribute("data-msg") || "Olá, SeeTech!");
  }

  // Menu mobile
  var toggle = byId("menuToggle");
  const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

menuToggle.addEventListener("click", () => {
    mobileNav.toggleAttribute("hidden");

    menuToggle.setAttribute(
        "aria-expanded",
        !mobileNav.hasAttribute("hidden")
    );
});
  mobileNav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      mobileNav.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }
  });

  // Formulário
  var form = byId("contactForm");

  function setError(campo, mensagem) {
    var el = form.querySelector('[data-err="' + campo + '"]');
    if (el) el.textContent = mensagem || "";
  }

  function valores() {
    return {
      nome: byId("nome").value.trim(),
      contato: byId("contato").value.trim(),
      assunto: byId("assunto").value,
      mensagem: byId("mensagem").value.trim(),
    };
  }

  function validar(v) {
    var ok = true;
    setError("nome", "");
    setError("contato", "");
    setError("mensagem", "");

    if (v.nome.length < 2) {
      setError("nome", "Informe seu nome");
      ok = false;
    }
    if (v.contato.length < 8) {
      setError("contato", "Informe um telefone ou e-mail");
      ok = false;
    }
    if (v.mensagem.length < 10) {
      setError("mensagem", "Conte um pouco mais sobre o que você precisa");
      ok = false;
    }
    return ok;
  }

  function montarMensagem(v) {
    return (
      "Olá, SeeTech! Meu nome é " + v.nome + ".\n" +
      "Assunto: " + v.assunto + "\n" +
      "Contato: " + v.contato + "\n\n" +
      v.mensagem
    );
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = valores();
    if (!validar(v)) return;
    window.open(whatsLink(montarMensagem(v)), "_blank", "noopener,noreferrer");
  });

  byId("btnEmail").addEventListener("click", function () {
    var v = valores();
    var corpo = validar(v) ? montarMensagem(v) : "Olá, SeeTech! Gostaria de mais informações.";
    window.location.href =
      "mailto:" + EMAIL +
      "?subject=" + encodeURIComponent("Orçamento — " + v.assunto) +
      "&body=" + encodeURIComponent(corpo);
  });
})();
