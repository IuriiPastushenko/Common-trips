import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { appid, lang, units } from './api-weather.constants';
import { WeatherApiInterface } from './interfaces/weather-api.interface';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getWeather(lat: number, lon: number): Promise<WeatherApiInterface> {
    const request = this.httpService
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat,
          lon,
          appid,
          units,
          lang,
        },
      })
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
    const weather = await lastValueFrom(request);
    return weather.data;
  }
}
