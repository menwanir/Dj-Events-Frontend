import Head from "next/head";
import styles from "../styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ title, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
      </Head>

      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Dj Parties | Find the hottest parties",
  description: "This app will help you to find the greatest upcoming parties",
};
