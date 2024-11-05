import { applyDecorators } from "@nestjs/common";
import { IsString, IsOptional, ValidationOptions } from "class-validator";

/**
 * Checks if the value is a string and makes it optional
 */
export const IsStrOpt = (validationOptions?: ValidationOptions): PropertyDecorator =>
  applyDecorators(IsString(validationOptions), IsOptional(validationOptions))
