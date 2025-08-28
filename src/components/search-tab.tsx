import { searchDisneyCharactersByName } from "@/services/apiClients";
import type { DisneyCharacter } from "@/types/disney";
import { useEffect, useState } from "react";

export default function SearchTab() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [examples, setExamples] = useState<DisneyCharacter[]>([]);

  useEffect(() => {
    const fetchExamples = async () => {
      const exampleNames = ["Dumbo", "Mickey", "Mulan", "Ariel", "Pluto"];
      const exampleCharacters = [];
      for (const name of exampleNames) {
        try {
          const results = await searchDisneyCharactersByName(name);
          if (results.length > 0) {
            exampleCharacters.push(results[0]);
          }
        } catch (err) {
          console.error("Erro ao buscar personagem de exemplo", name, err);
        }
      }
      setExamples(exampleCharacters);
    };
    fetchExamples();
  }, []);

  const handleSearch = async () => {
    const disneyInput = document.getElementById(
      "disneyName"
    ) as HTMLInputElement | null;
    const disneyName = disneyInput?.value.trim() || "";

    if (!disneyName) {
      setError("Digite o nome do personagem");
      setImageUrl(null);
      return;
    }

    try {
      const results = await searchDisneyCharactersByName(disneyName);
      const first = results[0];

      if (first && first.imageUrl) {
        setImageUrl(first.imageUrl);
        setError(null);
      } else {
        setError("Nenhum personagem encontrado!");
        setImageUrl(null);
      }
    } catch (err) {
      console.error("Erro ao buscar personagem", err);
      setError("Erro ao buscar personagem");
      setImageUrl(null);
    }
  };

  return (
    <main>
      <div className="flex gap-2 items-center ml-4 mt-4">
        <input
          id="disneyName"
          placeholder="Digite o nome"
          className="border px-2 py-1 rounded"
        />
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleSearch}
        >
          Pesquisar
        </button>
      </div>

      {error && <p className="text-red-500 mt-2 ml-4">{error}</p>}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Disney Sprite"
          className="w-100 h-100  mt-4 ml-2"
        />
      )}
      {examples.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-6 ml-4">
            Alguns personagens populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 mx-4">
            {examples.map((char) => (
              <div
                key={char._id}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
                onClick={() => setImageUrl(char.imageUrl ?? null)}
              >
                <img src={char.imageUrl} alt={`Imagem de ${char.name}`} />
                <p className="mt-2 text-sm font-medium text-center">
                  {char.name}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
