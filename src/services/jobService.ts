import { Op } from 'sequelize';
import { Job } from '../models/job';


async function findAllUnpaidJobsByProfile(profileId: number | undefined, models: any): Promise<Job[]> {
  const { Contract, Job } = models;

  return Job.findAll({
    where: {
      paid: false,
    },
    include: [{
      model: Contract,
      attributes: [],
      where: {
        status: "in_progress",
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      },
    }],
    raw: true,
  });
}

export { findAllUnpaidJobsByProfile };