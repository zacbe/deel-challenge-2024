import { Op, Transaction } from 'sequelize';
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

async function processJobPaymentById(jobId: string, profileId: number | undefined, models: any): Promise<void> {
  const { Job, sequelize } = models;

  try {
    await sequelize.transaction(async (t: typeof Transaction) => {
      const job = await Job.findOne({ where: { id: jobId }, transaction: t });
      if (!job) throw new Error("Job not found");
      if (job.paid) throw new Error("Job has already been paid");

      const contract = await job.getContract({ transaction: t });
      const client = await contract.getClient({ where: { id: profileId }, transaction: t });
      if (!client) throw new Error("Client not found");
      if (client.balance < job.price) throw new Error("Insufficient funds");

      const contractor = await contract.getContractor({ transaction: t });

      client.balance -= job.price;
      contractor.balance += job.price;
      job.paid = true;
      job.paymentDate = new Date();

      await Promise.all([
        client.save({ transaction: t }),
        contractor.save({ transaction: t }),
        job.save({ transaction: t }),
      ]);
    });

    console.info("Transaction completed successfully");
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}


export { findAllUnpaidJobsByProfile, processJobPaymentById };