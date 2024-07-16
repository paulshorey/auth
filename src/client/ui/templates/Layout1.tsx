"use client";
import Footer from "@/client/ui/molecules/Footer";
import Header from "@/client/ui/molecules/Header";
import Providers from "@/client/ui/templates/Providers";
import styles from "./Layout1.module.scss";

export function Layout1({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className={styles.layout}>
        <Header className={styles.header} />
        <main className={styles.main}>{children}</main>
        <Footer className={styles.footer} />
      </div>
    </Providers>
  );
}
