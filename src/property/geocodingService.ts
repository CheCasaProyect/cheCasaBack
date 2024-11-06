import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class GeocodingService {
  constructor(private readonly httpService: HttpService) {}

  async getCoordinates(
    street: string,
    number: number,
    city: string,
    state: string,
    postalCode: string,
  ): Promise<{ latitude: number; longitude: number }> {
    const address = `${street}, ${number}, ${city}, ${state}, ${postalCode}`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
    console.log(`Getting coordinates for address: ${address}`);
    console.log(url);

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: { 'User-Agent': 'NestJS App' },
        }),
      );
      const data = response.data;

      console.log('data: ' + data);

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
      } else {
        throw new InternalServerErrorException(
          'No se encontraron coordenadas para la dirección dada.',
        );
      }
    } catch (error) {
      console.error('Error getting coordinates:', error);
      throw new InternalServerErrorException(
        'Error al obtener las coordenadas.',
      );
    }
  }
}
