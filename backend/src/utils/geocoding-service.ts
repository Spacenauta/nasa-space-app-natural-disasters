export type Coordinates = {
  latitude: number
  longitude: number
}

export type GeocodingService = {
  // Método que converte o nome da cidade/país em coordenadas
  getCoordinates(locationName: string): Promise<Coordinates>
}
