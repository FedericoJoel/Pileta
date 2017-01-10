#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

const char* ssid = "Wifi para todos y todas";
const char* password = "Morena2016!";

ESP8266WebServer server(80);

const int rele = 13;

void handleRoot() {
  server.send(200, "text/plain", String("Bienvenido al sistema de filtro de picina") +
              String(" /filtro?filtrado=XX ON O OFF."));
}

void handleNotFound(){
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET)?"GET":"POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i=0; i<server.args(); i++){
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
  digitalWrite(rele, 0);
}


void handleFiltro() {
  // We can read the desired status of the LEDs from the expected parameters that
  // should be passed in the URL.  We expect two parameters "led1" and "led2".
  String parametroFiltrado = server.arg("filtrado");
  
  // Check if the URL include a change of the LED status
  bool url_check = false;
  if((parametroFiltrado == "ON")||(parametroFiltrado == "OFF"))
    url_check = true;

  // It's not required to pass them both, so we check that they're exactly equal to
  // the strings ON or OFF by our design choice (this can be changed if you prefer
  // a different behavior)
  if (parametroFiltrado == "ON")
    digitalWrite(rele, LOW);
  else if (parametroFiltrado == "OFF")
    digitalWrite(rele, HIGH);
    
  if (url_check){
    // If we've set the LEDs to the requested status, we have the webserver
    // return an "OK" (200) response.  We also include the number of milliseconds
    // since the program started running.
    // Note: This number will overflow (go back to zero), after approximately 50 days.
    server.send(200, "text/plain", "OK");
    }
    else{
      if (parametroFiltrado=="ESTADO"){
        int estado = digitalRead(rele);
        if (estado==0)
        server.send(200, "text/plain", "ON");
        else
        server.send(200, "text/plain", "OFF");
      }
      else{
        server.send(200, "text/plain", "ERROR");
      }
    }
}

void setup(void){
  pinMode(rele, OUTPUT);
  digitalWrite(rele, 0);
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("esp8266")) {
    Serial.println("MDNS responder started");
  }

  server.on("/", HTTP_GET, handleRoot);
  
  server.on("/filtro", HTTP_GET, handleFiltro);
  
  server.onNotFound(handleNotFound);

  server.begin();
  
  Serial.println("HTTP server started");
}

void loop(void){
  server.handleClient();
}
