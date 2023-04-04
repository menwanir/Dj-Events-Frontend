import Head from "next/head";
import styles from "../styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./Showcase";
import { useRouter } from "next/router";

export default function Layout({ title, description, children }) {
  const router = useRouter()


  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
      </Head>

      <Header />
      {router.pathname=="/" && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Dj Parties | Find the hottest parties",
  description: "This app will help you to find the greatest upcoming parties",
};
