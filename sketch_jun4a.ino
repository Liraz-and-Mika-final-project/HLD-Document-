#include "HX711.h"

#define DOUT 21
#define CLK  22

HX711 scale;

void setup() {
  Serial.begin(115200);
  scale.begin(DOUT, CLK);

  scale.set_scale(-420.0);  
  scale.tare();            

  Serial.println("Ready to weigh.");
}

void loop() {
  Serial.print("Weight [grams]: ");
  Serial.println(scale.get_units(5));  
  delay(1000);
}
