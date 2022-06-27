import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { GeonamesService } from './geonames.service';
import { GoogleService } from './google.service';
import { OPTIONS, Options } from './interfaces';

@Module({
  imports: [HttpModule],
  providers: [GoogleService, GeonamesService],
})
export class GeocodeModule {
  static forRoot(options: Options): DynamicModule {
    return {
      module: GeocodeModule,
      exports: [GoogleService, GeonamesService],
      providers: [{ provide: OPTIONS, useValue: options }],
    };
  }
}
