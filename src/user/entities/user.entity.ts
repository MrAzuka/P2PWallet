import { Exclude } from "class-transformer"
import { EntityDates } from "src/common/embeded/entity-dates"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class User {
@PrimaryGeneratedColumn("uuid")
user_id: string

@Column({nullable: true})
first_name: string

@Column({nullable: true})
last_name: string

@Column({unique: true})
username: string

@Column({unique: true})
email: string

@Exclude()
@Column()
password: string

@Column({nullable: true})
phone_number: string

@Column({nullable: true})
address: string

@Column({type: 'date',nullable: true})
date_of_birth: string

@Column(() => EntityDates, {prefix: false})
registryDates: EntityDates

}
