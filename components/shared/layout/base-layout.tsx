import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./header";
import SidebarLayout from "./sidebar-layout";

export default function BaseLayout({ children }: BaseLayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex w-full">
                <SidebarLayout />
                <div className="flex flex-col flex-1">
                    <Header></Header>
                    {children}
                </div>
            </div>
        </SidebarProvider>
    );
}
