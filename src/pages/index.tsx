import "../app/globals.css";
import Image from "next/image";
import { useState } from "react";
import { GetStaticProps } from "next";

type PokedexProps = {
  pokemonNames: string[];
};

export default function Pokedex({ pokemonNames }: PokedexProps) {
  const [entryNumber, setEntryNumber] = useState("");
  const [pokemonName, setPokemonName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const entry = pokemonNames[parseInt(entryNumber) - 1];
    setPokemonName(entry ? entry : "Pokémon não encontrado");
  };

  return (
    <div className="bg-gray-600 text-white">
      <header className="flex justify-center pt-6">
        <div>
          <Image
            src={"/images/logo.png"}
            alt={"logo"}
            width={300}
            height={200}
          />
        </div>
      </header>

      <section className="container-medium mx-auto w-full h-full flex justify-center">
        <div className="my-6 p-12 bg-slate-400 rounded-3xl">
          <div className="text-xl">
            Projeto com hooks getStaticProps e getServerSideProps
          </div>

          <div className="py-12">
            <form onSubmit={handleSubmit}>
              <label>
                Digite um número:
                <input
                  type="number"
                  value={entryNumber}
                  onChange={(e) => setEntryNumber(e.target.value)}
                  className="text-zinc-600 mx-2"
                />
              </label>
              <button
                className="mx-2 p-2 rounded-md bg-blue-600 hover:bg-blue-500 delay-100"
                type="submit"
              >
                Pesquisar
              </button>
            </form>

            <div className="pt-6 flex gap-1 items-center my-auto">
              <p>Nome do Pokémon:</p>
              <p className="text-2xl font-bold text-yellow-300">
                {pokemonName}
              </p>
            </div>
          </div>

          <div>V.0.1</div>
        </div>
      </section>

      <footer className="p-4 font-semibold">Feito por Hiago {":)"}</footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PokedexProps> = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokedex/2/");
    if (!response.ok) {
      throw new Error("Erro ao obter a Pokédex.");
    }
    const data = await response.json();
    const pokemonNames = data.pokemon_entries.map(
      (entry: any) => entry.pokemon_species.name
    );

    return {
      props: {
        pokemonNames,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        pokemonNames: [],
      },
    };
  }
};

{
  /*  */
}
