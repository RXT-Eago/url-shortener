import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="w-1/2 bg-red-500">
          <h1>URL Shortner</h1>
        </div>
      </main>
    </div>
  );
}
