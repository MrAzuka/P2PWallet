import { EntityDates } from "src/common/embeded/entity-dates"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class User {
@PrimaryGeneratedColumn("uuid")
user_id: string

@Column()
first_name: string

@Column()
last_name: string

@Column({unique: true})
username: string

@Column({unique: true})
email: string

@Column()
password: string

@Column()
phone_number: string

@Column()
address: string

@Column({type: 'date'})
date_of_birth: string

@Column(() => EntityDates, {prefix: false})
registryDates: EntityDates

}
