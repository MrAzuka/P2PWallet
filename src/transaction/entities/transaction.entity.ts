import { EntityDates } from "src/common/embeded/entity-dates";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    transaction_id: string

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    amount: number

    @Column()
    status: string

    @Column()
    description: string

    @Column(() => EntityDates, { prefix: false })
    registryDates: EntityDates
}
// transaction_id (Primary Key)
// sender_wallet_id (Foreign Key to Wallets)
// recipient_wallet_id (Foreign Key to Wallets)
// amount
// timestamp
// status
// description