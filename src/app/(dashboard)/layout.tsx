import { AppSidebar } from "@/components/shared/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Role } from "@/constants/roles";
import { userServices } from "@/services/user.service";



export default async function DashBoardLayout({
  admin,
  seller,
  user,
}: {
  admin: React.ReactNode;
  seller: React.ReactNode;
  user: React.ReactNode;
}) {
  const { data } = await userServices.getsession();

  const userInfo = data.user

  const dashboards: Record<Role, React.ReactNode> = {
    [Role.admin]: admin,
    [Role.seller]: seller,
    [Role.user]: user,
  };


  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          {/* <Separatorrd orientation="vertical" className="mr-2 h-4" /> */}

        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {dashboards[userInfo.role]}
        </div>

      </SidebarInset>
    </SidebarProvider>
  );
}
