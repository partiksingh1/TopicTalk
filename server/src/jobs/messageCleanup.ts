import cron from "node-cron";
import { prisma } from "../db/prisma";

cron.schedule("* * * * *", async () => {
  console.log("🧹 Cron job started: Deleting old messages");
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

  try {
    const deleted = await prisma.message.deleteMany({
      where: {
        createdAt: {
          lt: cutoff,
        },
      },
    });
    console.log(`🗑️ Deleted ${deleted.count} old messages.`);
  } catch (error) {
    console.error("❌ Error deleting old messages:", error);
  }
});
