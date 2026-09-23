import styles from "./Hero.module.css";
import Image from "next/image";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>Diversão para os pequenos</h1>
                    <p>Memórias para toda a família.</p>
                </div>
                <Image
                    className={styles.photo}
                    alt="Decoração de festa com super-heróis em estilo LEGO e arco de balões coloridos"
                    src="/assets/images/festa-super-herois-lego.webp"
                    width={1800}
                    height={1202}
                    sizes="(max-width: 899px) calc(100vw - 48px), (max-width: 1668px) calc((100vw - 72px) / 2), 798px"
                />
            </div>
        </section>
    );
}
