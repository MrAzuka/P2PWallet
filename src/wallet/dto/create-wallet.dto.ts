import { IsStrOpt } from "src/common/decorators/isStringOptional"

export class CreateWalletDto {
    @IsStrOpt()
    currency: string

    @IsStrOpt()
    balance: string
}
