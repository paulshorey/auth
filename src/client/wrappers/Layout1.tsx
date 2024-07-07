"use client";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import Providers from "./Providers";
import styles from "./Layout1.module.scss";

export default function LayoutSimple({
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
