const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const serialPort = new SerialPort({ path: 'COM3', baudRate: 9600 }); // Ajusta el puerto según sea necesario
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

let temperature = 0;
let humidity = 0;
let threshold = 25.0;

parser.on('data', (data) => {
  const lines = data.trim().split('\n');
  lines.forEach(line => {
    if (line.startsWith('Temperatura:')) {
      temperature = parseFloat(line.split(':')[1]);
    } else if (line.startsWith('Humedad:')) {
      humidity = parseFloat(line.split(':')[1]);
    }
  });
});

app.use(express.static('public'));
app.use(express.json());

app.get('/temperature', (req, res) => {
  res.json({ temperature, humidity });
});

app.post('/set-threshold', (req, res) => {
  threshold = req.body.threshold;
  res.json({ success: true });
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});