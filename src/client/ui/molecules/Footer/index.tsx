import Link from "next/link";
import Nav from "@/client/ui/molecules/Nav";

export default function Footer(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} data-component="Footer">
      <Nav />
    </div>
  );
}
