import Sidebar from "@/ui/sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar></Sidebar>
            <div>{children}</div>
        </div>
    );
}