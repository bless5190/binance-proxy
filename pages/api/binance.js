export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Preflight request
  }

  try {
    const response = await fetch('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: 1,
        rows: 5,
        payTypes: ["PIX"],
        asset: "USDT",
        tradeType: "SELL",
        fiat: "BRL",
        userProfileNick: "CAST-INTERMEDIACAO",
        userType: "user"
      })
    });

    if (!response.ok) {
      throw new Error(`Erro da Binance: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro na API do servidor:", error);
    res.status(500).json({ error: "Erro ao buscar dados da Binance" });
  }
}
