import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';


export class Profile extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare profession: string;
  declare balance: number;
  declare type: 'client' | 'contractor';
}
export function initProfile(sequelize: Sequelize): typeof Profile {
  Profile.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.DECIMAL(12, 2)
    },
    type: {
      type: DataTypes.ENUM('client', 'contractor')
    }
  }, {
    sequelize,
    modelName: 'Profile',
    timestamps: false
  });

  return Profile;
}
