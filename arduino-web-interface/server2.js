const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 }); // Ajusta el puerto según sea necesario
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

app.use(express.static('public'));
app.use(bodyParser.json());

let currentTemperature = 0;

parser.on('data', data => {
  if (data.startsWith("Temperatura:")) {
    currentTemperature = parseFloat(data.split(":")[1]);
  }
});

app.get('/temperature', (req, res) => {
  res.json({ temperature: currentTemperature });
});

app.post('/set-threshold', (req, res) => {
  const threshold = req.body.threshold;
  port.write(`${threshold}\n`);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
