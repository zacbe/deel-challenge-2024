import { Op, Transaction } from "sequelize"
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


export {
  updateClientBalance
};
