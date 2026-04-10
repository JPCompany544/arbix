import AdminPriceOverridePanel from "../components/AdminPriceOverridePanel";

export const metadata = {
  title: "Price Overrides | Admin",
  description: "Admin panel for manually controlling token price overrides across the platform.",
};

export default function PriceOverridesPage() {
  return <AdminPriceOverridePanel />;
}
