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
      indexes: [
        {
          name: "idx_contract_client",
          fields: ["ClientId", "status"],
        },
        {
          name: "idx_contract_contractor",
          fields: ["ContractorId", "status"],
        },
        {
          name: "idx_contracts_on_clientid_contractorid_status",
          fields: ["ClientId", "ContractorId", "status"],
        },
      ],
      timestamps: false
    }
  );

  return Contract;
}
