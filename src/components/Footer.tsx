import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaInstagram } from "react-icons/fa";
import styles from "styles/modules/semantic.module.scss";

const Footer: FC<{}> = () => {

    return (
        <footer className={styles.container}>
            <div className={styles.links}>
                <Link href='/'>be:hurd</Link>
                <Link href='https://github.com/akaecliptic/behurd'>source code</Link>
            </div>
            <div id={styles.developer} className={styles.links}>
                <Link href='https://github.com/akaecliptic'><FaGithub /></Link>
                <Link href='https://www.instagram.com/mide.mide.mide'><FaInstagram /></Link>
                <Link href='https://akaecliptic.dev'><Image src='/images/ae.svg' alt='ae logo' width={10} height={10} /></Link>
            </div>
        </footer>
    );
};

export default Footer;
