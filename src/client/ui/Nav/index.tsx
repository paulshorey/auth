import Link from "next/link";

export default function Nav(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} data-component="Nav">
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
