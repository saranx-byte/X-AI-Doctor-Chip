const fs = require('fs');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>X-AI Chip Doctor | VLSI Intelligence Platform</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"><\/script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0e1a;--card:rgba(20,29,53,0.7);--cyan:#00d4ff;--green:#00ff88;--orange:#ff6b35;--red:#ff4444;--yellow:#ffd700;--purple:#8b5cf6;--pink:#ec4899;--text:#e2e8f0;--text2:#94a3b8;--text3:#4b5563;--border:rgba(0,212,255,0.15);--font:"Inter",sans-serif;--mono:"JetBrains Mono",monospace}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--font);min-height:100vh;overflow-x:hidden;background-image:linear-gradient(rgba(0,212,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.02) 1px,transparent 1px);background-size:40px 40px}
.page{display:none;min-height:100vh;padding-top:70px}.page.active{display:block}
.pi{max-width:1200px;margin:0 auto;padding:32px 24px}
nav{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(10,14,26,0.96);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);height:70px;display:flex;align-items:center;padding:0 20px;gap:12px}
.nlogo{display:flex;align-items:center;gap:10px;cursor:pointer;margin-right:auto}
.nicon{width:36px;height:36px;background:linear-gradient(135deg,var(--cyan),var(--purple));border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:18px;position:relative}
.ndot{position:absolute;top:-3px;right:-3px;width:10px;height:10px;background:var(--green);border-radius:50%;border:2px solid var(--bg);animation:blink 2s infinite}
.glow{background:linear-gradient(90deg,var(--cyan),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.nlinks{display:flex;gap:2px}
.nlink{padding:7px 12px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;color:var(--text2);transition:all .2s;border:none;background:none}
.nlink:hover,.nlink.active{color:var(--cyan);background:rgba(0,212,255,0.1)}
.nright{display:flex;align-items:center;gap:8px}
.mbtn{display:none;cursor:pointer;font-size:20px;color:var(--text2);padding:4px 8px;background:none;border:none}
.mmenu{display:none;position:fixed;top:70px;left:0;right:0;background:rgba(10,14,26,0.98);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);z-index:999;padding:12px}
.mmenu.open{display:block}
.mlink{padding:12px 16px;border-radius:8px;cursor:pointer;font-size:14px;color:var(--text2);transition:all .2s;display:block;border:none;background:none;width:100%;text-align:left}
.mlink:hover,.mlink.active{color:var(--cyan);background:rgba(0,212,255,0.08)}
@media(max-width:900px){.nlinks{display:none}.mbtn{display:block}}
.btn{padding:9px 18px;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;border:none;display:inline-flex;align-items:center;gap:7px;font-family:var(--font)}
.bp{background:linear-gradient(135deg,var(--cyan),var(--purple));color:#000}.bp:hover{opacity:.85;transform:translateY(-1px)}
.bs{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:var(--text)}.bs:hover{border-color:var(--cyan);color:var(--cyan)}
.bd{background:rgba(255,68,68,0.15);border:1px solid rgba(255,68,68,0.3);color:var(--red)}
.bg{background:rgba(0,255,136,0.12);border:1px solid rgba(0,255,136,0.3);color:var(--green)}
.bsm{padding:7px 14px;font-size:12px}.bxs{padding:4px 10px;font-size:11px;border-radius:7px}
.card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:24px;backdrop-filter:blur(10px)}
.csm{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px}
.ch{background:var(--card);border:1px solid var(--border);border-radius:16px;transition:all .3s;cursor:pointer}.ch:hover{border-color:rgba(0,212,255,0.35);transform:translateY(-2px)}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
@media(max-width:1024px){.g4{grid-template-columns:1fr 1fr}.g3{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.g2,.g3,.g4{grid-template-columns:1fr}}
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700}
.br{background:rgba(255,68,68,.15);color:var(--red);border:1px solid rgba(255,68,68,.3)}
.by{background:rgba(255,215,0,.15);color:var(--yellow);border:1px solid rgba(255,215,0,.3)}
.bge{background:rgba(0,255,136,.15);color:var(--green);border:1px solid rgba(0,255,136,.3)}
.bc{background:rgba(0,212,255,.15);color:var(--cyan);border:1px solid rgba(0,212,255,.3)}
.stitle{font-size:16px;font-weight:700;color:#fff;display:flex;align-items:center;gap:8px;margin-bottom:16px}
.mono{font-family:var(--mono)}
.pbar{height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden}
.pfill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--cyan),var(--purple));transition:width 1s ease}
.tabs{display:flex;gap:4px;background:rgba(255,255,255,.04);border-radius:12px;padding:4px;margin-bottom:20px;flex-wrap:wrap}
.tab{padding:8px 16px;border-radius:9px;cursor:pointer;font-size:13px;font-weight:500;color:var(--text2);border:none;background:none;transition:all .2s}
.tab.active{background:rgba(0,212,255,.12);color:var(--cyan);border:1px solid rgba(0,212,255,.2)}
.tpanel{display:none}.tpanel.active{display:block}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);z-index:2000;display:none;align-items:center;justify-content:center;padding:20px}
.overlay.open{display:flex}
.modal{background:#0f1629;border:1px solid var(--border);border-radius:20px;padding:28px;width:100%;max-width:740px;max-height:88vh;overflow-y:auto;position:relative}
.mx{position:absolute;top:14px;right:14px;background:rgba(255,255,255,.08);border:none;color:var(--text2);width:30px;height:30px;border-radius:7px;cursor:pointer;font-size:15px}
.mx:hover{background:rgba(255,68,68,.2);color:var(--red)}
.lg{margin-bottom:18px}.lgt{font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid rgba(255,255,255,.05)}
.lgg{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:5px}
.lgi{padding:8px 10px;border-radius:9px;cursor:pointer;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.02);transition:all .2s}
.lgi:hover{border-color:rgba(0,212,255,.3);background:rgba(0,212,255,.05)}.lgi.sel{border-color:var(--cyan);background:rgba(0,212,255,.1)}
.lgn{font-size:13px;font-weight:600;color:#fff}.lge{font-size:10px;color:var(--text3);margin-top:1px}
#toasts{position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px}
.toast{padding:12px 18px;border-radius:12px;font-size:13px;font-weight:500;display:flex;align-items:center;gap:10px;animation:slideIn .3s ease;box-shadow:0 8px 32px rgba(0,0,0,.4);max-width:320px}
.tok{background:#0f2a1a;border:1px solid rgba(0,255,136,.3);color:var(--green)}
.terr{background:#2a0f0f;border:1px solid rgba(255,68,68,.3);color:var(--red)}
.tinf{background:#0f1a2a;border:1px solid rgba(0,212,255,.3);color:var(--cyan)}
.cwrap{position:relative;height:220px}
.codeblock{background:#060a14;border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:16px;font-family:var(--mono);font-size:12px;line-height:1.8;overflow-x:auto;max-height:380px;overflow-y:auto}
.cf{color:#ff6b6b}.cx{color:#6ee7b7}.cc{color:#6a9955}.ck{color:#569cd6}.cw{color:#9cdcfe}.cm{color:#4ec9b0}
.dz{border:2px dashed rgba(255,255,255,.1);border-radius:16px;padding:40px;text-align:center;cursor:pointer;transition:all .3s}
.dz:hover,.dz.drag{border-color:var(--cyan);background:rgba(0,212,255,.03)}
.chat-outer{display:flex;flex-direction:column;height:calc(100vh - 260px);min-height:400px}
.chat-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px}
.chat-msgs::-webkit-scrollbar{width:4px}.chat-msgs::-webkit-scrollbar-thumb{background:rgba(0,212,255,.3);border-radius:2px}
.bbl-bot{background:rgba(0,212,255,.06);border:1px solid rgba(0,212,255,.15);border-radius:14px 14px 14px 4px;padding:12px 14px;font-size:13px;color:var(--text2);line-height:1.7;max-width:85%}
.bbl-user{background:linear-gradient(135deg,rgba(0,212,255,.2),rgba(139,92,246,.2));border:1px solid rgba(0,212,255,.2);border-radius:14px 14px 4px 14px;padding:12px 14px;font-size:13px;color:#fff;line-height:1.7;max-width:85%}
.crow{display:flex;gap:10px;align-items:flex-start}.crow.user{flex-direction:row-reverse}
.cav{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}
.cav.bot{background:linear-gradient(135deg,var(--cyan),var(--purple))}.cav.user{background:linear-gradient(135deg,var(--orange),var(--yellow))}
.ctime{font-size:10px;color:var(--text3);margin-top:4px;padding:0 4px}
.cinrow{padding:12px 16px;border-top:1px solid var(--border);display:flex;gap:10px;align-items:flex-end;background:rgba(10,14,26,.8)}
.cin{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:10px 14px;color:#fff;font-family:var(--font);font-size:13px;resize:none;outline:none;transition:border-color .2s;max-height:120px}
.cin:focus{border-color:rgba(0,212,255,.4)}
.tdots{display:flex;gap:4px;padding:4px 0}.tdot{width:7px;height:7px;background:var(--cyan);border-radius:50%;animation:bounce .8s infinite}
.tdot:nth-child(2){animation-delay:.15s}.tdot:nth-child(3){animation-delay:.3s}
.chip{padding:6px 12px;background:rgba(0,212,255,.07);border:1px solid rgba(0,212,255,.2);border-radius:20px;font-size:12px;color:var(--cyan);cursor:pointer;transition:all .2s;white-space:nowrap}
.chip:hover{background:rgba(0,212,255,.15)}
#mic-btn{width:42px;height:42px;border-radius:50%;border:2px solid rgba(0,212,255,.3);background:rgba(0,212,255,.08);color:var(--cyan);font-size:18px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;flex-shrink:0}
#mic-btn.rec{background:rgba(255,68,68,.2);border-color:var(--red);color:var(--red);animation:pulsered 1s infinite}
#mic-status{font-size:11px;color:var(--red);text-align:center;min-height:16px;margin-top:4px}
.spkbtn{background:none;border:none;cursor:pointer;font-size:12px;opacity:.4;transition:opacity .2s;padding:2px 5px;border-radius:4px;margin-left:6px;color:var(--cyan)}.spkbtn:hover{opacity:1}
.diff-wrap{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
.diff-panel{border-radius:10px;overflow:hidden;border:1px solid var(--border)}
.diff-hdr{padding:8px 12px;font-size:11px;font-weight:700;border-bottom:1px solid var(--border)}
.dline{padding:2px 10px;font-family:var(--mono);font-size:12px;white-space:pre-wrap;word-break:break-all;line-height:1.6}
.dline.err{background:rgba(255,68,68,.12);border-left:3px solid var(--red)}.dline.fix{background:rgba(0,255,136,.08);border-left:3px solid var(--green)}
@media(max-width:640px){.diff-wrap{grid-template-columns:1fr}}
.fedit{padding:14px;border-radius:10px;border:1px solid rgba(255,215,0,.2);background:rgba(255,215,0,.02);margin-bottom:10px}
.einput{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:7px 10px;color:#fff;font-size:12px;font-family:var(--font);outline:none;width:100%;transition:border-color .2s}
.einput:focus{border-color:rgba(0,212,255,.4)}
.esel{background:#0d1224;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:7px 10px;color:#fff;font-size:12px;font-family:var(--font);outline:none;cursor:pointer;width:100%}
.tool-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px}
.tool-result{background:#060a14;border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:14px;font-family:var(--mono);font-size:13px;color:var(--green);min-height:60px;margin-top:10px;white-space:pre-wrap}
.tinput{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:13px;font-family:var(--font);outline:none;width:100%;margin-bottom:8px;transition:border-color .2s}
.tinput:focus{border-color:rgba(0,212,255,.4)}
#vpaste{width:100%;min-height:160px;background:#060a14;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px;color:#9cdcfe;font-family:var(--mono);font-size:12px;line-height:1.8;resize:vertical;outline:none;transition:border-color .2s}
#vpaste:focus{border-color:rgba(0,212,255,.3)}
.astep{display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:10px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);transition:all .4s}
.astep.active{border-color:var(--cyan);background:rgba(0,212,255,.05)}.astep.done{border-color:var(--green);background:rgba(0,255,136,.04)}
.adot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.1)}
.astep.active .adot{background:var(--cyan);color:#000;border-color:var(--cyan);animation:blink 1s infinite}.astep.done .adot{background:var(--green);color:#000;border-color:var(--green)}
.circuit-wrap{background:rgba(0,0,0,.3);border-radius:12px;border:1px solid rgba(255,255,255,.05);overflow-x:auto}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
@keyframes pulsered{0%,100%{box-shadow:0 0 0 0 rgba(255,68,68,.4)}50%{box-shadow:0 0 0 8px rgba(255,68,68,0)}}
.fadeup{animation:fadeUp .4s ease forwards}.spin{animation:spin 1s linear infinite}
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:rgba(255,255,255,.02)}::-webkit-scrollbar-thumb{background:rgba(0,212,255,.25);border-radius:3px}
@media print{nav,.noprint{display:none!important}.page{padding-top:0}body{background:#fff;color:#000}.card,.csm{background:#f5f5f5;border:1px solid #ddd}}
</style>
</head>
<body>
<div id="toasts"></div>`;

fs.writeFileSync('app.html', html, 'utf8');
console.log('Header written: ' + html.length + ' chars');

