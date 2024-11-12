import { EntityDates } from "src/common/embeded/entity-dates"
import { User } from "src/user/entities/user.entity"
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn("uuid")
    wallet_id: string

    @Column({default: "NGN"})
    currency: string

    // Set to decimal for financial accuracy
    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    balance: number

    @Column(() => EntityDates, { prefix: false })
    registryDates: EntityDates

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User
}
