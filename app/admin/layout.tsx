import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Sidebar */}
            <AdminSidebar />
            {/* Main Content */}
            <div className="flex-1 md:ml-64 bg-gray-50">
                <main className="p-8 lg:p-12 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
