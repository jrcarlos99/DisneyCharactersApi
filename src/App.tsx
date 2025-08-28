import { Route, Routes } from "react-router-dom";

import { AppSidebar } from "./components/app-sidebar.tsx";
import { HomePage } from "./homePage/index.tsx";
import SearchTab from "./components/search-tab.tsx";

import { SidebarProvider } from "./components/ui/sidebar.tsx";

export function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchTab />} />
        </Routes>
      </div>
    </SidebarProvider>
  );
}
