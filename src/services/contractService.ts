import { Op } from 'sequelize';
import { Contract } from '../models/contract';

async function findContractById(contractId: string, profileId: number | undefined, contract: any): Promise<Contract | null> {
  return contract.findByPk(contractId, {
    where: {
      [Op.or]: [
        { ContractorId: profileId },
        { ClientId: profileId }
      ]
    },
    raw: true,
  });
}

export { findContractById };