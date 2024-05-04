import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export class Contract extends Model<InferAttributes<Contract>, InferCreationAttributes<Contract>> {
  declare id: CreationOptional<number>;
  declare terms: string;
  declare status: 'new' | 'in_progress' | 'terminated';
}

export function initContract(sequelize: Sequelize): typeof Contract {
  Contract.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      terms: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('new', 'in_progress', 'terminated')
      }
    },
    {
      sequelize,
      modelName: 'Contract',
    }
  );

  return Contract;
}
