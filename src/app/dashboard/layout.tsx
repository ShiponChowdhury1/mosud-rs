import { verifyAuth } from "@/actions/auth";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await verifyAuth();
  if (!auth.authenticated) {
    redirect("/login");
  }

  return <DashboardShell email={auth.email!}>{children}</DashboardShell>;
}
