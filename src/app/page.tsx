import Link from "next/link";

export default function Home() {

  return (
    <div>

        <ul>
            <li><Link href={"/signin"}>Sign in page</Link></li>
            <li><Link href={"/signup"}>Sign up page</Link></li>
            <li><Link href={"/dashboard/library"}>Library page</Link></li>
        </ul>

    </div>
  );
}

