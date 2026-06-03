(function(){
  const whatsappNumber = '6281291068802';
  const siteUrl = 'https://rafanmuh972-web.github.io/liks-mobile-website/';
  const catalogUrl = siteUrl + 'katalog.html';

  const style = document.createElement('style');
  style.textContent = `
    .lm-chat-toggle{position:fixed;right:18px;bottom:18px;z-index:9999;border:0;border-radius:999px;background:#0A2647;color:#fff;padding:14px 18px;font-weight:800;box-shadow:0 12px 28px rgba(0,0,0,.28);cursor:pointer;font-family:inherit}
    .lm-chat-box{position:fixed;right:18px;bottom:78px;width:min(360px,calc(100vw - 36px));height:500px;max-height:calc(100vh - 110px);background:#fff;color:#0A2647;border-radius:18px;box-shadow:0 18px 50px rgba(0,0,0,.35);z-index:9999;overflow:hidden;display:none;font-family:Arial,sans-serif}
    .lm-chat-box.open{display:flex;flex-direction:column}
    .lm-chat-head{background:linear-gradient(135deg,#062c63,#001f3f);color:#fff;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px}
    .lm-chat-head strong{font-size:15px}.lm-chat-head small{display:block;color:#c5d3e8;margin-top:2px}.lm-chat-close{background:transparent;color:#fff;border:0;font-size:22px;cursor:pointer}
    .lm-chat-body{flex:1;padding:14px;overflow:auto;background:#f3f6fb;display:flex;flex-direction:column;gap:10px}
    .lm-msg{max-width:86%;padding:10px 12px;border-radius:14px;font-size:14px;line-height:1.45}.lm-bot{align-self:flex-start;background:#fff;border:1px solid #dbe5f3}.lm-user{align-self:flex-end;background:#0A2647;color:#fff}.lm-quick{display:flex;flex-wrap:wrap;gap:7px;margin-top:4px}.lm-quick button{border:1px solid #7db9e8;background:#fff;color:#0A2647;border-radius:999px;padding:7px 10px;font-size:12px;cursor:pointer;font-weight:700}
    .lm-chat-form{display:flex;gap:8px;padding:12px;border-top:1px solid #dbe5f3;background:#fff}.lm-chat-form input{flex:1;border:1px solid #cbd5e1;border-radius:999px;padding:10px 12px;outline:0}.lm-chat-form button{border:0;border-radius:999px;background:#0A2647;color:#fff;padding:10px 14px;font-weight:800;cursor:pointer}
    .lm-wa-link{color:#0A2647;font-weight:800;text-decoration:underline}
  `;
  document.head.appendChild(style);

  const box = document.createElement('div');
  box.className = 'lm-chat-box';
  box.innerHTML = `
    <div class="lm-chat-head"><div><strong>Chat Liks Mobile</strong><small>Asisten otomatis katalog iPhone</small></div><button class="lm-chat-close" aria-label="Tutup">×</button></div>
    <div class="lm-chat-body" id="lmChatBody"></div>
    <form class="lm-chat-form" id="lmChatForm"><input id="lmChatInput" type="text" placeholder="Tulis pertanyaan..." autocomplete="off"><button type="submit">Kirim</button></form>
  `;
  const toggle = document.createElement('button');
  toggle.className = 'lm-chat-toggle';
  toggle.textContent = 'Chat Liks Mobile';
  document.body.appendChild(box);
  document.body.appendChild(toggle);

  const body = box.querySelector('#lmChatBody');
  const form = box.querySelector('#lmChatForm');
  const input = box.querySelector('#lmChatInput');
  const closeBtn = box.querySelector('.lm-chat-close');

  function waLink(text){ return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`; }
  function addMsg(text, who='bot'){
    const div = document.createElement('div');
    div.className = 'lm-msg ' + (who === 'user' ? 'lm-user' : 'lm-bot');
    div.innerHTML = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }
  function addQuick(){
    const q = document.createElement('div');
    q.className = 'lm-quick';
    ['Cek stok','Kategori unit','Cara order','Garansi','Tokopedia','Hubungi admin'].forEach(t=>{
      const b=document.createElement('button'); b.type='button'; b.textContent=t; b.onclick=()=>handle(t); q.appendChild(b);
    });
    body.appendChild(q); body.scrollTop = body.scrollHeight;
  }
  function botAnswer(msg){
    const m = msg.toLowerCase();
    if(m.includes('stok') || m.includes('ready') || m.includes('tersedia')) return `Untuk cek stok paling akurat, buka <a class="lm-wa-link" href="${waLink('Halo Liks Mobile, saya mau cek stok iPhone.')}" target="_blank">WhatsApp admin</a>. Sebutkan tipe iPhone, kapasitas, dan kategori yang kamu cari.`;
    if(m.includes('harga') || m.includes('price') || m.includes('katalog')) return `Harga lengkap ada di halaman <a class="lm-wa-link" href="${catalogUrl}">Katalog</a>. Kamu bisa filter Ex iBox, Ex Inter, Bea Cukai, atau Brand New.`;
    if(m.includes('ibox') || m.includes('inter') || m.includes('bea') || m.includes('brand')) return `Kategori unit di Liks Mobile: <b>Ex iBox</b>, <b>Ex Inter</b>, <b>Bea Cukai</b>, dan <b>Brand New</b>. Perbedaan utamanya ada di asal unit, kondisi, dan harga.`;
    if(m.includes('order') || m.includes('beli') || m.includes('pesan') || m.includes('cara')) return `Cara order: pilih tipe di katalog, klik <b>Tanya Unit Ini</b>, lalu lanjut chat WhatsApp admin untuk cek stok, kondisi unit, dan pembayaran.`;
    if(m.includes('garansi') || m.includes('aman') || m.includes('imei') || m.includes('icloud')) return `Sebelum membeli, pastikan minta detail kondisi unit: IMEI, iCloud, battery health, Face ID/Touch ID, kamera, layar, dan kelengkapan. Admin akan bantu jelaskan kondisi unit.`;
    if(m.includes('tokopedia') || m.includes('marketplace')) return `Untuk transaksi marketplace, tanyakan link Tokopedia terbaru lewat WhatsApp admin: <a class="lm-wa-link" href="${waLink('Halo Liks Mobile, minta link Tokopedia untuk transaksi.')}" target="_blank">minta link Tokopedia</a>.`;
    if(m.includes('wa') || m.includes('whatsapp') || m.includes('admin') || m.includes('kontak')) return `Langsung hubungi admin di WhatsApp: <a class="lm-wa-link" href="${waLink('Halo Liks Mobile, saya mau tanya unit iPhone.')}" target="_blank">081291068802</a>.`;
    return `Saya bisa bantu info umum soal katalog, stok, kategori unit, cara order, dan garansi. Untuk jawaban paling pasti, lanjutkan ke <a class="lm-wa-link" href="${waLink('Halo Liks Mobile, saya mau konsultasi iPhone.')}" target="_blank">WhatsApp admin</a>.`;
  }
  function handle(text){ addMsg(text,'user'); setTimeout(()=>{ addMsg(botAnswer(text)); addQuick(); },250); }
  toggle.addEventListener('click',()=>{ box.classList.toggle('open'); if(box.classList.contains('open') && !body.dataset.started){ body.dataset.started='1'; addMsg('Halo! Saya chatbot Liks Mobile. Mau tanya stok, harga, kategori unit, atau cara order?'); addQuick(); }});
  closeBtn.addEventListener('click',()=>box.classList.remove('open'));
  form.addEventListener('submit',e=>{ e.preventDefault(); const text=input.value.trim(); if(!text)return; input.value=''; handle(text); });
})();
