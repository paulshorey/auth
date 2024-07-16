import Nav from "@/client/ui/molecules/Nav";

export default function Header(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} data-component="Header">
      <Nav />
    </div>
  );
}
