let currentThreshold = 25.0;
let alerted = false;

async function fetchTemperature() {
  try {
    const response = await fetch('/temperature');
    const data = await response.json();
    const temperature = data.temperature;
    const humidity = data.humidity;

    document.getElementById('temperature').textContent = `Temperatura: ${data.temperature} °C`;
    document.getElementById('humidity').textContent = `Humedad: ${humidity} %`;
    document.getElementById('threshold').textContent = `Umbral de Temperatura: ${currentThreshold} °C`;
    if (temperature > currentThreshold && !alerted) {
      alerted = true;
      alert(`Alerta: La temperatura ha superado el umbral de ${currentThreshold} °C`);
      document.getElementById('Mensajes').textContent = `Alerta: La temperatura ha superado el umbral de ${currentThreshold} °C.  Se sugiere encender refrigeración`;
    } else if (temperature <= currentThreshold) {
      alerted = false;
      document.getElementById('Mensajes').textContent = ``;
    }
  } catch (error) {
    console.error('Error capturando temperatura:', error);
    document.getElementById('temperature').textContent = 'Error';
    document.getElementById('humidity').textContent = 'Error';
    document.getElementById('threshold').textContent = 'Error';

  }
}
async function setThreshold() {
  const input = document.getElementById('threshold-input');
  const newThreshold = parseFloat(input.value);
  if (isNaN(newThreshold)) {
    //alert('Ingrese un numero Valido');
    document.getElementById('Mensajes').textContent = `Ingrese un numero Valido`;
    return;
  }
  currentThreshold = newThreshold;
  try {
    await fetch('/set-threshold', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ threshold: currentThreshold })
    });
    alert(`Temperatura umbral fijada en  ${currentThreshold} °C`);
    document.getElementById('threshold').textContent = `Umbral de Temperatura: ${currentThreshold} °C`;
  } catch (error) {
    console.error('Error al modificar temperatura umbral:', error);
  }
}

setInterval(fetchTemperature, 2000);
fetchTemperature();