import { IsEmail, IsOptional, IsString, Matches } from "class-validator"
import { IsStrOpt } from "src/common/decorators/isStringOptional"

export class CreateUserDto {

@IsStrOpt()
readonly first_name: string

@IsStrOpt()
readonly last_name: string

@IsString()
readonly username: string

@IsEmail()
readonly email: string

/* To validate a password that meets the following criteria:
1. At least one uppercase letter.
2. At least one lowercase letter.
3. At least one special character (e.g., !@#$%^&*()).
4. Minimum of 8 characters in total. */
@IsString()
@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.{8,})$/, { message: 'Password too weak' })
password: string

@IsStrOpt()
readonly phone_number: string

@IsStrOpt()
readonly address: string

@IsStrOpt()
@Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'dateOfBirth must be in the format YYYY-MM-DD' })
readonly date_of_birth: string

@IsString()
@Matches(/^\d{4}$/, { message: 'PIN must be exactly 4 digits' })
pin: string;
}
