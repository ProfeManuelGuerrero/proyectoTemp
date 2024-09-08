1. #Proyecto creado por Manuel Guerrero

Componentes
  Hardware:
      Arduino Uno)
      Sensor de temperatura DHT11 o DHT22
      Cables y protoboard

  Software:
      Arduino IDE
      Dependecias de NODE.js
      Un servidor web (puede ser local, como XAMPP o similar)
      Navega dor web


1. Abrir carpeta de proyecto desde VSCode y luego abrir terminal
2. copiar Codigo para agregar node a su proyecto:
	npm init -y
3. en el mismo terminal instala las dependencias express, serialport y body-parser:
	npm install express serialport body-parser
4. Verificar path del puerto USB al cual esta conectado el arduino, ya que en el codigo se encuentra en el path: 'COM3'
5. Ejecuta el servidor node en el terminal con:
   node server.js
6. url del proyecto localhost:3000/arduino-web-interface
