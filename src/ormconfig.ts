import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { Books } from "./books/domain/book.entity";
import { Members } from "./members/domain/member.entity";
import { RentBooks } from "./rentbooks/domain/rentbook.entity";

export const OrmConfig: MysqlConnectionOptions = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "",
  "database": "eigen",
  "entities": [Books, Members, RentBooks],
  "synchronize": true
}