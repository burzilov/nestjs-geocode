import { DynamicModule } from '@nestjs/common';
import { Options } from './interfaces';
export declare class GeocodeModule {
    static forRoot(options: Options): DynamicModule;
}
