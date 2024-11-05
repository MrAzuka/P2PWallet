import { DB_SOURCE_OPTIONS } from 'src/common/util/db.constants';
import { DataSource } from 'typeorm';

export default new DataSource(DB_SOURCE_OPTIONS);