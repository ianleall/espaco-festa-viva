import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import bolo from "@/assets/bolo.png.asset.json";
import painel from "@/assets/painel.png.asset.json";
import mesa from "@/assets/mesa.png.asset.json";

export const Route = createFileRoute("/")({ component: FestaViva });

const INSTAGRAM = "https://www.instagram.com/espacofestaviva/";
const WHATSAPP = "557399992045";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}`;
const ENDERECO = "R. da Coelba, 204-250 — Camacan, BA, 45880-000";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Espaço+Festa+Viva+Camacan+BA";
const TIPOS = ["Aniversário infantil", "Aniversário adulto", "Formatura", "Confraternização", "Outro"];
const DIFERENCIAIS = [
  { titulo: "Decoração que já é festa", texto: "Um cenário acolhedor, com detalhes que ajudam a tornar cada comemoração especial." },
  { titulo: "Conforto para todos", texto: "Um espaço para reunir crianças e adultos e aproveitar a celebração juntos." },
  { titulo: "Atendimento direto", texto: "Converse com a equipe, tire suas dúvidas e planeje os detalhes antes da data." },
  { titulo: "Para cada comemoração", texto: "Aniversários, formaturas, confraternizações e encontros em família." },
];
const AVALIACOES = [
  { nome: "Vitinho Costa", texto: "Um ótimo espaço com um histórico de eventos praticamente impecável." },
  { nome: "Avaliação no Google", texto: "Experiência agradável, me senti confortável no evento." },
  { nome: "Avaliação no Google", texto: "Ótimo espaço, adorei o lugar, a localização e o atendimento." },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
:root{--ink:#17120e;--surface:#2b2018;--gold:#c99a45;--gold-light:#e6bd68;--ivory:#f7f1e7;--muted:#c4b5a2}
html{scroll-behavior:smooth;scroll-padding-top:88px}
.fv{background:var(--ink);color:var(--muted);font:16px/1.7 Inter,system-ui,sans-serif;min-height:100vh;-webkit-font-smoothing:antialiased}
.fv *{box-sizing:border-box}.fv h1,.fv h2,.fv h3{font-family:'Cormorant Garamond',Georgia,serif;color:var(--ivory);font-weight:600;line-height:1.08;margin:0}
.fv h1{font-size:clamp(2.7rem,6vw,5rem);max-width:700px}.fv h2{font-size:clamp(2.2rem,4vw,3.25rem)}.fv h3{font-size:1.65rem;color:var(--gold-light)}
.fv p{margin:0}.fv a{color:inherit}.fv-wrap{width:min(1200px,100% - 40px);margin-inline:auto}.fv-section{padding:64px 0}.fv-alt{background:var(--surface)}
.fv-header{position:sticky;top:0;z-index:10;background:rgba(23,18,14,.96);backdrop-filter:blur(12px);border-bottom:1px solid #c99a4538}
.fv-header-inner{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:18px}
.fv-brand{font:600 1.65rem/1.1 'Cormorant Garamond',serif;color:var(--ivory)!important;text-decoration:none;white-space:nowrap}.fv-brand span{color:var(--gold-light);font-style:italic}
.fv-nav{display:none;gap:26px}.fv-nav a{text-decoration:none;color:var(--ivory);font-size:14px}.fv-nav a:hover{color:var(--gold-light)}
.fv-btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 22px;border:1px solid var(--gold);border-radius:7px;text-decoration:none;font:600 14px Inter,sans-serif;transition:background .2s,color .2s,transform .2s;cursor:pointer}
.fv-primary{background:var(--gold);color:var(--ink)!important}.fv-primary:hover{background:var(--gold-light);transform:translateY(-1px)}
.fv-secondary{background:transparent;color:var(--ivory)!important}.fv-secondary:hover{background:#c99a4520}
.fv a:focus-visible,.fv button:focus-visible,.fv input:focus-visible,.fv select:focus-visible,.fv textarea:focus-visible{outline:3px solid var(--gold-light);outline-offset:3px}
.fv-hero{position:relative;overflow:hidden;background:radial-gradient(ellipse at 82% 30%,#c99a4524,transparent 45%),var(--ink)}
.fv-hero-inner{display:grid;align-items:center;gap:42px;padding-block:58px 68px}.fv-lead{max-width:590px;margin-top:24px!important;font-size:clamp(1.05rem,2vw,1.2rem)}
.fv-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.fv-kicker{display:flex;align-items:center;gap:12px;color:var(--gold-light);font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;margin-bottom:18px}.fv-kicker:before{content:'';height:1px;width:32px;background:var(--gold)}
.fv-art{position:relative;min-height:340px;aspect-ratio:4/4.2;border:1px solid #c99a4560;border-radius:48% 48% 10px 10px;overflow:hidden;background:radial-gradient(circle at 50% 34%,#d5a64b38,transparent 20%),radial-gradient(ellipse at 50% 75%,#8a5e2d60,transparent 45%),linear-gradient(145deg,#483324,#21170f 65%);display:grid;place-items:center}
.fv-art:before,.fv-art:after{content:'';position:absolute;border:1px solid #d4a84d99;border-radius:50%;width:64%;aspect-ratio:1}.fv-art:after{width:48%;border-color:#e6bd685c}
.fv-emblem{position:relative;z-index:1;text-align:center;color:var(--gold-light);font:600 clamp(1.4rem,3vw,2.3rem) 'Cormorant Garamond',serif;letter-spacing:.12em;text-shadow:0 2px 20px #000}.fv-emblem small{display:block;font:500 .65rem Inter,sans-serif;letter-spacing:.28em;margin-top:12px}
.fv-intro{max-width:660px;margin-top:16px!important}.fv-grid{display:grid;gap:16px;margin-top:36px}.fv-card{padding:26px;border:1px solid #c99a4540;border-radius:9px;background:#17120e;box-shadow:0 12px 30px #0002}.fv-card p{margin-top:12px}
.fv-gallery{display:grid;gap:16px;margin-top:34px}.fv-gallery-art{min-height:240px;border:1px solid #c99a4550;border-radius:9px;position:relative;overflow:hidden;display:flex;align-items:end;padding:24px;background:radial-gradient(ellipse at 50% 20%,#e6bd6850,transparent 35%),linear-gradient(140deg,#76563a,#2b2018 70%)}.fv-gallery-art:nth-child(2){background:radial-gradient(ellipse at 70% 25%,#d6a65c50,transparent 32%),linear-gradient(135deg,#5b3d31,#20160f)}.fv-gallery-art:nth-child(3){background:radial-gradient(ellipse at 45% 30%,#d2a85a55,transparent 30%),linear-gradient(135deg,#3b2c20,#17120e)}.fv-gallery-art span{color:var(--ivory);font:600 1.4rem 'Cormorant Garamond',serif}
.fv-rating{display:flex;align-items:center;gap:16px;margin-top:22px;flex-wrap:wrap}.fv-rating strong{font:600 3.4rem/1 'Cormorant Garamond',serif;color:var(--gold-light)}.fv-reviews{display:grid;gap:16px;margin-top:30px}.fv-reviews figure{margin:0}.fv-reviews blockquote{margin:0;color:var(--ivory);font-size:1rem}.fv-reviews figcaption{margin-top:16px;color:var(--gold-light);font-size:13px}
.fv-contact{display:grid;gap:34px}.fv-info{display:grid;gap:20px;margin-top:28px}.fv-info b{display:block;color:var(--gold-light);font-size:12px;letter-spacing:.08em;text-transform:uppercase}.fv-info a{color:var(--ivory);text-underline-offset:4px}
.fv-form{display:grid;gap:18px;padding:24px;background:var(--surface);border:1px solid #c99a4540;border-radius:10px}.fv-field label{display:block;color:var(--ivory);font-size:13px;font-weight:600;margin-bottom:7px}.fv-field input,.fv-field select,.fv-field textarea{width:100%;min-height:48px;padding:12px 14px;border:1px solid #594532;border-radius:6px;background:var(--ink);color:var(--ivory);font:400 16px Inter,sans-serif}.fv-field textarea{min-height:100px;resize:vertical}.fv-field select option{background:var(--ink)}.fv-two{display:grid;gap:18px}.fv-note{font-size:12px;line-height:1.5}
.fv-footer{border-top:1px solid #c99a4538;padding:30px 0;font-size:13px}.fv-footer-inner{display:flex;flex-wrap:wrap;justify-content:space-between;gap:14px;align-items:center}.fv-skip{position:absolute;left:-10000px;top:8px;background:var(--gold);color:var(--ink);padding:10px;z-index:50}.fv-skip:focus{left:8px}
@media(min-width:700px){.fv-nav{display:flex}.fv-section{padding:88px 0}.fv-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.fv-gallery{grid-template-columns:1.2fr 1fr 1fr}.fv-gallery-art{min-height:320px}.fv-reviews{grid-template-columns:repeat(3,minmax(0,1fr))}.fv-two{grid-template-columns:1fr 1fr}.fv-form{padding:30px}}
@media(min-width:960px){.fv-hero-inner{grid-template-columns:1.05fr .95fr;padding-block:88px 96px;gap:70px}.fv-art{max-height:580px}.fv-contact{grid-template-columns:1fr 1fr;gap:70px;align-items:start}.fv-section{padding:100px 0}}
@media(max-width:520px){.fv-wrap{width:calc(100% - 32px)}.fv-brand{font-size:1.3rem}.fv-header-inner{min-height:68px}.fv-header .fv-btn{padding-inline:12px;font-size:12px;min-height:44px}.fv-actions .fv-btn{width:100%}.fv-art{min-height:290px}.fv-card{padding:22px}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.fv *{transition:none!important}}
`;

function Orcamento() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState(TIPOS[0]);
  const [data, setData] = useState("");
  const [convidados, setConvidados] = useState("");
  const [obs, setObs] = useState("");

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dataFormatada = data ? new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR") : "ainda não definida";
    const mensagem = [
      "Olá! Gostaria de um orçamento no Espaço Festa Viva.",
      `Nome: ${nome}`,
      `Tipo de festa: ${tipo}`,
      `Data desejada: ${dataFormatada}`,
      `Convidados: ${convidados || "a definir"}`,
      obs ? `Observações: ${obs}` : "",
    ].filter(Boolean).join("\n");
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(mensagem)}`, "_blank", "noopener,noreferrer");
  }

  return <form className="fv-form" onSubmit={enviar}>
    <div className="fv-field"><label htmlFor="fv-nome">Seu nome</label><input id="fv-nome" autoComplete="name" required value={nome} onChange={e => setNome(e.target.value)} /></div>
    <div className="fv-field"><label htmlFor="fv-tipo">Tipo de festa</label><select id="fv-tipo" value={tipo} onChange={e => setTipo(e.target.value)}>{TIPOS.map(t => <option key={t}>{t}</option>)}</select></div>
    <div className="fv-two">
      <div className="fv-field"><label htmlFor="fv-data">Data desejada</label><input id="fv-data" type="date" value={data} onChange={e => setData(e.target.value)} /></div>
      <div className="fv-field"><label htmlFor="fv-convidados">Número de convidados</label><input id="fv-convidados" inputMode="numeric" placeholder="Ex.: 60" value={convidados} onChange={e => setConvidados(e.target.value.replace(/\D/g, ""))} /></div>
    </div>
    <div className="fv-field"><label htmlFor="fv-obs">Quer contar mais alguma coisa?</label><textarea id="fv-obs" value={obs} onChange={e => setObs(e.target.value)} /></div>
    <button className="fv-btn fv-primary" type="submit">Preparar pedido de orçamento</button>
    <p className="fv-note">O WhatsApp será aberto com sua mensagem pronta para enviar. Nenhum dado fica guardado neste site.</p>
  </form>;
}

function FestaViva() {
  return <div className="fv">
    <style>{css}</style>
    <a className="fv-skip" href="#fv-conteudo">Ir para o conteúdo</a>
    <header className="fv-header"><div className="fv-wrap fv-header-inner">
      <a className="fv-brand" href="#topo" aria-label="Espaço Festa Viva, início">Espaço <span>Festa Viva</span></a>
      <nav className="fv-nav" aria-label="Navegação principal"><a href="#espaco">O espaço</a><a href="#galeria">Celebrações</a><a href="#avaliacoes">Avaliações</a><a href="#contato">Contato</a></nav>
      <a className="fv-btn fv-primary" href="#contato">Solicitar orçamento</a>
    </div></header>
    <main id="fv-conteudo">
      <section className="fv-hero" id="topo"><div className="fv-wrap fv-hero-inner">
        <div><div className="fv-kicker">Festas &amp; eventos · Camacan, Bahia</div><h1>Celebre momentos especiais</h1><p className="fv-lead">Um salão de festas em Camacan que combina elegância, calor e celebração, pronto para receber quem você mais ama.</p><div className="fv-actions"><a className="fv-btn fv-primary" href="#contato">Solicitar orçamento</a><a className="fv-btn fv-secondary" href="#galeria">Conhecer o espaço</a></div></div>
        <div className="fv-art" role="img" aria-label="Emblema decorativo dourado inspirado na identidade do Espaço Festa Viva"><div className="fv-emblem">ESPAÇO<br/>FESTA VIVA<small>FESTAS &amp; EVENTOS</small></div></div>
      </div></section>
      <section className="fv-section fv-alt" id="espaco"><div className="fv-wrap"><div className="fv-kicker">Um lugar para celebrar</div><h2>Tudo pronto para a sua festa acontecer</h2><p className="fv-intro">Você escolhe a data e conta o que imagina. O espaço cuida do cenário.</p><div className="fv-grid">{DIFERENCIAIS.map(d => <article className="fv-card" key={d.titulo}><h3>{d.titulo}</h3><p>{d.texto}</p></article>)}</div></div></section>
      <section className="fv-section" id="galeria"><div className="fv-wrap"><div className="fv-kicker">Detalhes que fazem a diferença</div><h2>Veja como as festas ganham vida</h2><div className="fv-gallery">{[
        { src: painel.url, alt: "Painel com balões azuis e prateados e letreiro neon Happy Birthday", t: "Momentos inesquecíveis" },
        { src: bolo.url, alt: "Bolo de três andares em azul, preto e prata", t: "Cada detalhe importa" },
        { src: mesa.url, alt: "Mesa de doces com arranjo de flores e balões azuis", t: "Feito para celebrar" },
      ].map(f => <figure className="fv-gallery-art" key={f.t} style={{margin:0}}><img src={f.src} alt={f.alt} loading="lazy" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/><span style={{position:"relative",textShadow:"0 2px 12px #000"}}>{f.t}</span></figure>)}</div></div></section>
      <section className="fv-section fv-alt" id="avaliacoes"><div className="fv-wrap"><div className="fv-kicker">Experiências compartilhadas</div><h2>Quem já celebrou aqui</h2><div className="fv-rating"><strong>4,3</strong><span><span aria-label="11 avaliações no Google">★★★★★</span><br/>Nota no Google, com 11 avaliações · <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{color:"var(--gold-light)"}}>Ver todas</a></span></div><div className="fv-reviews">{AVALIACOES.map((a,i)=><figure className="fv-card" key={i}><blockquote>“{a.texto}”</blockquote><figcaption>{a.nome}</figcaption></figure>)}</div></div></section>
      <section className="fv-section" id="contato"><div className="fv-wrap fv-contact"><div><div className="fv-kicker">Vamos conversar</div><h2>Vamos planejar a sua festa?</h2><p className="fv-intro">Preencha os dados ao lado e retornaremos com datas disponíveis e valores.</p><div className="fv-info"><div><b>Onde fica</b><span>{ENDERECO}</span><br/><a href={MAPS_URL} target="_blank" rel="noreferrer">Ver no mapa ↗</a></div><div><b>WhatsApp</b><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Enviar mensagem pelo WhatsApp ↗</a></div><div><b>Instagram</b><a href={INSTAGRAM} target="_blank" rel="noreferrer">@espacofestaviva ↗</a></div></div></div><Orcamento/></div></section>
    </main>
    <footer className="fv-footer"><div className="fv-wrap fv-footer-inner"><span className="fv-brand">Espaço <span>Festa Viva</span></span><span>{ENDERECO}</span><span>© {new Date().getFullYear()} Espaço Festa Viva</span></div></footer>
  </div>;
}
