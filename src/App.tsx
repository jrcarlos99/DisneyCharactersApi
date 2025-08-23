import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { getDisneyCharacters } from "./services/apiClients";
import type { DisneyCharacter } from "./types/disney";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";

export function App({ children }: { children: React.ReactNode }) {
  const [characters, setCharacters] = useState<DisneyCharacter[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDisneyCharacters(page)
      .then((res) => {
        setCharacters(res.data);
        setTotalPages(res.info.totalPages);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <p>Carregando...</p>;

  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Personagens da Disney</h1>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {characters.map((char) => (
              <li key={char._id} className="border rounded-lg p-2 text-center">
                <img
                  src={char.imageUrl}
                  alt={char.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <p className="mt-2 font-medium">{char.name}</p>
              </li>
            ))}
          </ul>

          {/* PAGINAÇÃO */}
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages })
                  .slice(0, 5)
                  .map((_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          isActive={page === pageNumber}
                          onClick={() => setPage(pageNumber)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
