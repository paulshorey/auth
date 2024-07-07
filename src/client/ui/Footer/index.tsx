import Link from "next/link";
import Nav from "@/client/ui/Nav";

export default function Footer(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} data-component="Footer">
      <Nav />
    </div>
  );
}
