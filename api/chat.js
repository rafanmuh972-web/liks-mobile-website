export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'OPENAI_API_KEY belum diset di hosting backend.'
    });
  }

  try {
    const { message, history = [] } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Pesan kosong.' });
    }

    const safeHistory = Array.isArray(history)
      ? history.slice(-8).map((item) => ({
          role: item.role === 'assistant' ? 'assistant' : 'user',
          content: String(item.content || '').slice(0, 800)
        }))
      : [];

    const catalogContext = `
Liks Mobile adalah bisnis resell iPhone.
Kontak WhatsApp admin: 081291068802.
Email: liksmobile77@gmail.com.
Website katalog: https://rafanmuh972-web.github.io/liks-mobile-website/katalog.html.
Kategori unit: Ex iBox, Ex Inter, Bea Cukai, Brand New, Mayday.
Tugas chatbot: bantu customer memahami katalog, kategori unit, cara order, stok, garansi, dan arahkan ke WhatsApp untuk transaksi atau cek stok pasti.
Jangan mengarang stok real-time. Untuk stok, minta customer hubungi WhatsApp admin.
Jangan menjanjikan garansi resmi Apple. Sampaikan bahwa kondisi unit perlu dikonfirmasi ke admin.
Gunakan bahasa Indonesia yang singkat, ramah, dan jelas.
`;

    const input = [
      { role: 'system', content: catalogContext },
      ...safeHistory,
      { role: 'user', content: message.slice(0, 1000) }
    ];

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        input,
        temperature: 0.4,
        max_output_tokens: 260
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      return res.status(response.status).json({
        error: 'Gagal menghubungi OpenAI API.',
        detail: detail.slice(0, 500)
      });
    }

    const data = await response.json();
    const reply = data.output_text || 'Maaf, saya belum bisa menjawab. Silakan hubungi admin WhatsApp 081291068802.';

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({
      error: 'Terjadi error pada server chatbot.',
      detail: String(error.message || error)
    });
  }
}
