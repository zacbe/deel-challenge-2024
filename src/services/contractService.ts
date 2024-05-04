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

async function findActiveContracts(profileId: number | undefined, contract: any): Promise<Contract[]> {
  return contract.findAll({
    where: {
      status: { [Op.not]: "terminated" },
      [Op.or]: [
        { ClientId: profileId },
        { ContractorId: profileId }
      ]
    },
    raw: true,
  });
}

export { findContractById, findActiveContracts };