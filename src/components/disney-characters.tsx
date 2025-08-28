import type { DisneyCharacter } from "@/types/disney";

export function CharactersData({
  characters,
}: {
  characters: DisneyCharacter[];
}) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {characters.map((char) => (
        <li key={char._id} className="border rounded-lg p-2 text-center">
          <img
            src={char.imageUrl}
            alt={`Imagem de ${char.name}`}
            className="w-full h-50 rounded-md"
          />
          <p className="mt-2 font-medium">{char.name}</p>
        </li>
      ))}
    </ul>
  );
}
