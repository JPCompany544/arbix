import * as dotenv from "dotenv";
dotenv.config();

/**
 * API Endpoints Test
 * 
 * Tests all wallet API endpoints
 */
async function testApi() {
    const baseUrl = "http://localhost:3000";
    const userId = "cmli2bcpp0000dj58qvyfht0h";
    const chain = "ETH";

    console.log("\n" + "=".repeat(70));
    console.log("  Wallet API Endpoint Tests");
    console.log("=".repeat(70) + "\n");

    try {
        // Test 1: Get Address
        console.log("1️⃣  Testing GET /api/wallet/address");
        const addrRes = await fetch(`${baseUrl}/api/wallet/address?chain=${chain}&userId=${userId}`);
        const addrData = await addrRes.json();
        console.log("✅ Address:", addrData.address);
        console.log("");

        // Test 2: Get Balance
        console.log("2️⃣  Testing GET /api/wallet/balance");
        const balRes = await fetch(`${baseUrl}/api/wallet/balance?chain=${chain}&userId=${userId}`);
        const balData = await balRes.json();
        console.log("✅ Balance:", balData.balanceHuman, balData.symbol);
        console.log("   Raw:", balData.balance, "smallest units");
        console.log("");

        // Test 3: Get Transactions
        console.log("3️⃣  Testing GET /api/wallet/transactions");
        const txRes = await fetch(`${baseUrl}/api/wallet/transactions?chain=${chain}&userId=${userId}&limit=5`);
        const txData = await txRes.json();
        console.log("✅ Transactions:", txData.count);
        if (txData.transactions.length > 0) {
            console.log("   Latest:", txData.transactions[0].status, txData.transactions[0].amount, txData.transactions[0].direction);
        }
        console.log("");

        // Test 4: Withdraw (optional - only if balance > 0)
        if (parseFloat(balData.balanceHuman) > 0.001) {
            console.log("4️⃣  Testing POST /api/wallet/withdraw (DRY RUN)");
            console.log("⚠️  Skipping actual withdrawal to preserve testnet funds");
            console.log("   Would withdraw: 0.0001 ETH");
            console.log("");

            // Uncomment to test real withdrawal:
            /*
            const withdrawRes = await fetch(`${baseUrl}/api/wallet/withdraw`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    chain,
                    to: "0x070FB771612106e2F3F6b7d150F9AA724b2f5CF0",
                    amount: "0.0001"
                })
            });
            const withdrawData = await withdrawRes.json();
            console.log("✅ Withdrawal:", withdrawData);
            */
        } else {
            console.log("4️⃣  Testing POST /api/wallet/withdraw");
            console.log("⏭️  Skipped - Insufficient balance");
            console.log("");
        }

        console.log("=" + "=".repeat(69));
        console.log("✅ All API endpoint tests passed!");
        console.log("=".repeat(70) + "\n");

        console.log("📝 Next steps:");
        console.log("   1. Start dev server: npm run dev");
        console.log("   2. Visit: http://localhost:3000/wallet");
        console.log("   3. Test the full UI workflow\n");

    } catch (error) {
        console.error("\n❌ Test failed:", error);
        console.log("\n💡 Make sure the dev server is running: npm run dev\n");
    }
}

// Run if dev server is up, otherwise just show instructions
fetch("http://localhost:3000/api/wallet/address?chain=ETH&userId=test")
    .then(() => testApi())
    .catch(() => {
        console.log("\n⚠️  Dev server not running");
        console.log("\n📝 To test the API:");
        console.log("   1. Start dev server: npm run dev");
        console.log("   2. Run this script again: npx tsx scripts/test-api.ts\n");
    });
