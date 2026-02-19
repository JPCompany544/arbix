import * as dotenv from "dotenv";
dotenv.config();
import { processWithdrawal } from "../lib/wallet/wallet-service";

async function test() {
  const userId = "cmli2bcpp0000dj58qvyfht0h"; // use the same user whose address you funded

  const result = await processWithdrawal(userId, "ETH", {
    to: "0x070FB771612106e2F3F6b7d150F9AA724b2f5CF0", // second test wallet OR same wallet
    amount: "0.0005"               // ETH amount to send
  });

  console.log("TX HASH:", result.txHash);
}

test().catch(console.error);
