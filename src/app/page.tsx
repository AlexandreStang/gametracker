import Image from "next/image";
import {prisma} from "@/lib/db";

export default async function Home() {
    const games = await prisma.game.findMany()

  return (
    <div>
      Hello world

        <ul>
            {games?.map((game) => (
                <li>{game.title}, {game.platform}, {game.playtime}</li>
            ))}
        </ul>
    </div>
  );
}
