import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class EntityDates {
  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}