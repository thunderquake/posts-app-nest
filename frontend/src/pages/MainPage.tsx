import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/UserSidebar";
import { useAuthStore } from "@/stores/authStore";

const MainPage = () => {
  const username = useAuthStore?.getState()?.username || "";
  const email = useAuthStore?.getState()?.email || "";

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar username={username} email={email} />
        <SidebarInset className="flex-1 overflow-auto">
          <main className="container mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6">All Posts</h1>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MainPage;
