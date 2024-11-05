import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_INITALIZATION_OPTIONS } from 'src/common/util/db.constants';

@Module({
    imports: [TypeOrmModule.forRoot(DB_INITALIZATION_OPTIONS)]
})
export class DatabaseModule {}
