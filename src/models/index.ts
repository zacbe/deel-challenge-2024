import { Sequelize, Transaction } from 'sequelize';
import { initProfile } from './profile';
import { initContract } from './contract';
import { initJob } from './job';


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
  isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
});

const Profile = initProfile(sequelize);
const Contract = initContract(sequelize);
const Job = initJob(sequelize);

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job);
Job.belongsTo(Contract);

export {
  sequelize,
  Profile,
  Contract,
  Job,
};
