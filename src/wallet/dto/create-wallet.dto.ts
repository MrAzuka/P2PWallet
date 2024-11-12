import { IsStrOpt } from "src/common/decorators/isStringOptional"

export class CreateWalletDto {
    @IsStrOpt()
    readonly currency: string

    @IsStrOpt()
    readonly balance: string
    
    @IsStrOpt()
    readonly user_id: string
}
