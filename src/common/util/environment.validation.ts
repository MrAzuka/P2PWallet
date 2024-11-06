import { IsInt, IsString , validateSync} from 'class-validator';
import { plainToClass } from 'class-transformer';

class EnvironmentVariables {
@IsString({message:"Invalid Database Type"})
  DB_TYPE: string;

  @IsString({message: "Invalid Database Username" })
  DB_USERNAME: string;

  @IsString({message: "Invalid Database Password" })
  DB_PASSWORD: string;

  @IsInt({message: "Invalid Database Port" })
  DB_PORT: number;

  @IsString({message: "Invalid Database Host" })
  DB_HOST: string;

  @IsString({message: "Invalid Database Name" })
  DB_NAME: string;
}

export const validate = (config: Record<string, unknown>) => {
    // `plainToClass` to converts plain object into Class
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
      enableImplicitConversion: true,
    });
   
    // `validateSync` method validate the class and returns errors
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });
  
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  };