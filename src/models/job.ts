import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare price: number;
  declare paid: boolean;
  declare paymentDate: Date;
}

export function initJob(sequelize: Sequelize): typeof Job {
  Job.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
      },
      paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      paymentDate: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'Job',
      indexes: [
        {
          name: "idx_jobs_on_contractid_and_paid",
          fields: ["ContractId", "paid"],
        },
      ],
      timestamps: false
    }
  );

  return Job;
}
