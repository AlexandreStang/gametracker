import {prisma} from "@/lib/db";
import test from "@/api/route";

export default async function Home() {
    const games = await prisma.game.findMany()

    // await fetchData()
    console.log(await test())

  return (
    <div>
      Hello world

        <ul>
            {games?.map((game) => (
                <li key={game.id}>{game.title}, {game.platform}, {game.playtime}</li>
            ))}
        </ul>
    </div>
  );
}

