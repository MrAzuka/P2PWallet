import { IsEmail, IsString } from "class-validator"


export class AuthPayloadDto {
    @IsEmail()
    readonly email: string

    @IsString()
    password: string
}
