const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();
const port = process.env.PORT || 3000;

// Nastavenie použitia bodyParser pre spracovanie JSON údajov
app.use(bodyParser.json());

// Nastavenie statických súborov (CSS, JS, obrázky, atď.)
app.use(express.static('webpage'));

// Funkcia na získanie IP adresy servera
function getIpAddress() {
  const os = require('os');
  const ifaces = os.networkInterfaces();
  let ipAddress = '';

  Object.keys(ifaces).forEach((ifname) => {
    ifaces[ifname].forEach((iface) => {
      if ('IPv4' === iface.family && !iface.internal) {
        ipAddress = iface.address;
      }
    });
  });

  return ipAddress;
}

// Koncový bod pre prihlásenie
app.post('/login', (req, res) => {
  // Získanie údajov z požiadavky
  const { username, password } = req.body;

  // Tu pridajte logiku pre overenie prihlasovacích údajov
  if (username === 'admin' && password === 'admin123') {
    // Ak sú údaje správne, vygenerujte token
    const token = crypto.randomBytes(16).toString('hex');
    // Uložte token (najlepšie by bolo do databázy alebo súboru)
    // Tu môžete pridať logiku na ukladanie tokenu, napríklad do databázy alebo súboru

    // Ak sú údaje správne, vráťte JSON s 'success: true' a tokenom
    res.json({ success: true, token });
  } else {
    // Inak vráťte JSON s 'success: false'
    res.json({ success: false });
  }
});

// Koncový bod pre hlavnú stránku
app.get('/', (req, res) => {
  const ipAddress = getIpAddress();

  console.log('🟢 Server je online');
  console.log('💻 IP:', ipAddress);
  console.log('💻 Port:', port);
  console.log('💻 Platforma:', process.platform);
  console.log('💻 Architektúra:', process.arch);
  console.log('💻 Verzia Node:', process.version);
  console.log('💻 Uptime:', process.uptime(), 'sekúnd');
  console.log('💻 RAM (rss):', process.memoryUsage().rss, 'bytes');

  // Nastavenie MIME typu pre CSS súbor
  res.type('text/css');
  res.sendFile('webpage/style.css', { root: __dirname });
});

// Server bude poslúchať na priradenom porte
app.listen(port, () => {
  const ipAddress = getIpAddress();

  console.log('🟢 Server je online');
  console.log('💻 IP:', ipAddress);
  console.log('💻 Port:', port);
  console.log('💻 Platforma:', process.platform);
  console.log('💻 Architektúra:', process.arch);
  console.log('💻 Verzia Node:', process.version);
  console.log('💻 Uptime:', process.uptime(), 'sekúnd');
  console.log('💻 RAM (rss):', process.memoryUsage().rss, 'bytes');
  console.log(`📻 Naslúcham na porte ${port}`);
});