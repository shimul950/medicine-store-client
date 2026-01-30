import { AppSidebar } from "@/components/shared/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";

type Role = "admin" | "seller" | "user";

export default function DashBoardLayout({
  admin,
  seller,
  user,
}: {
  admin: React.ReactNode;
  seller: React.ReactNode;
  user: React.ReactNode;
}) {
  const userRole: { role: Role } = {
    role: "admin", // replace with session later
  };

  const dashboards: Record<Role, React.ReactNode> = {
    admin,
    seller,
    user,
  };

  return (
    <SidebarProvider>
      <AppSidebar user={userRole} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          {/* <Separatorrd orientation="vertical" className="mr-2 h-4" /> */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {dashboards[userRole.role]}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
