"use client";

import NextLink, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export default function Link(props: LinkProps & { children: React.ReactNode }) {
  const path = usePathname();
  const Tag = path === props.href ? "a" : NextLink;
  // @ts-ignore
  return <Tag {...props}>{props.children}</Tag>;
}
