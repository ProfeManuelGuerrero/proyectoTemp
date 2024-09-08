#include <DHT11.h>
#define DHTPIN 2      // Pin al que está conectado el sensor
int pin=2; //Seleccionamos el pin en el que se //conectará el sensor
DHT11 dht(pin); //Se selecciona el DHT11 (hay //otros DHT)

const int ledV = 6; 
float temperatura = 0;
float humedad = 0;
float temperaturaUmbral = 25.0;

void setup() {
  Serial.begin(9600); // Configuración conexión a PC
  pinMode(ledV, OUTPUT);
}

void loop() {
  // Lectura de la humedad
  humedad = dht.readHumidity();
  // Lectura de la temperatura en Celsius
  temperatura = dht.readTemperature();

  // Comprobar si alguna lectura ha fallado
  if (isnan(humedad) || isnan(temperatura)) {
    Serial.println("Fallo en la lectura del sensor DHT!");
    return;
  }

  Serial.print("Temperatura:");
  Serial.print(temperatura);
  Serial.println("°C");

  Serial.print("Humedad:");
  Serial.print(humedad);
  Serial.println("%");

  Serial.print("Temperatura Umbral:");
  Serial.print(temperaturaUmbral);
  Serial.println("°C");
  
  if (temperatura > temperaturaUmbral) {
    digitalWrite(ledV, HIGH);
    Serial.println("Refregiración ON");
  } else {
    digitalWrite(ledV, LOW);
    Serial.println("Refregiración OFF");
  }
  delay(2000);
}