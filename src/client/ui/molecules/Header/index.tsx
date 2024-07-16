import Nav from "../Nav";

export default function Header(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} data-component="Header">
      <Nav />
    </div>
  );
}
