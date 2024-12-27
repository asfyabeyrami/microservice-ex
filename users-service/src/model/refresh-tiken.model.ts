import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { User } from './users.model';

@Table({
  tableName: 'tokens',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class RefreshToken extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.BIGINT,
  })
  id: number;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  token: string;

  @ForeignKey(() => User)
  @Column({
    type: Sequelize.BIGINT,
    references: { model: 'users', key: 'id' },
  })
  userId: number;

  @Column({
    allowNull: false,
    type: Sequelize.DATE,
  })
  expiryDate: Date;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  User: User;
}
