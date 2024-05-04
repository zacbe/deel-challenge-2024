import { Op, Transaction, fn, col } from "sequelize"
import _ from "lodash"

async function updateClientBalance(userId: string, depositAmount: number, models: any): Promise<void> {
  const { Contract, Job, Profile, sequelize } = models;

  try {
    await sequelize.transaction(async (t: typeof Transaction) => {
      const client = await Profile.findByPk(userId, {
        where: { type: "client" }
      });

      if (!client) throw new Error("Profile is not a client");

      const total = await Job.sum("price", {
        include: [
          {
            model: Contract,
            where: { ClientId: client.id },
            required: true, // INNER JOIN
          },
        ],
        where: {
          paid: { [Op.eq]: false },
        }
      });

      const maxDeposit = total * 0.25;
      if (depositAmount > maxDeposit) {
        throw new Error("Deposit amount exceeded");
      }

      client.balance += depositAmount;
      await client.save({ transaction: t });
    });
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}

async function getBestPayedProfession(start: string, end: string, models: any): Promise<void> {
  const { Profile, Contract, Job } = models;

  const results = await Job.findAll({
    attributes: [[fn("SUM", col("price")), "totalEarnings"]],
    include: {
      model: Contract,
      attributes: [],
      include: {
        model: Profile,
        as: "Contractor",
        attributes: ["profession"],
        where: { type: "contractor" },
      },
    },
    where: {
      paymentDate: {
        [Op.gte]: start,
        [Op.lte]: end,
      },
      paid: true,
    },
    group: ["Contract.Contractor.profession"],
    order: [[col("totalEarnings"), "DESC"]],
    limit: 1,
    raw: true,
  });

  const path = "Contract.Contractor.profession";
  const profession = _.get(results, `[0]["${path}"]`, null);
  return profession;
}


export {
  updateClientBalance,
  getBestPayedProfession
};
