import { CharactersData } from "@/components/disney-characters";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getDisneyCharactersPaginated } from "@/services/apiClients";
import type { DisneyCharacter } from "@/types/disney";
import { useEffect, useState } from "react";

export function HomePage() {
  const [characters, setCharacters] = useState<DisneyCharacter[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDisneyCharactersPaginated(page)
      .then((res) => {
        setCharacters(res.data);
        setTotalPages(res.info.totalPages);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <p>Carregando...</p>;

  return (
    <main>
      <ThemeProvider>
        <SidebarTrigger />
        <h1 className="text-2xl font-bold mb-4 ml-2">Personagens da Disney</h1>
        <CharactersData characters={characters} />

        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>

        {/* PAGINAÇÃO */}
        <div className="mt-5 pb-1 flex justify-center">
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
      </ThemeProvider>
    </main>
  );
}
