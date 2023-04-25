import Link from "next/link";
import { FC, MouseEventHandler } from "react";
import { FaDice, FaFire, FaHome, FaTimes } from "react-icons/fa";
import styles from "styles/modules/semantic.module.scss";

export type PropAside = {
    close: () => void;
    handleRandom: MouseEventHandler<HTMLAnchorElement>;
};

const Aside: FC<PropAside> = ({ handleRandom, close }) => {
    return (
        <aside className={styles.container}>
            <FaTimes onClick={() => close()}/>
            <div className={styles.links}>
                <Link href='/' onClick={() => close()}><FaHome />Home</Link>
                <Link href='/explore?trending' onClick={() => close()}><FaFire />Trending</Link>
                <Link href='/artist/random' onClick={handleRandom}><FaDice />Random</Link>
            </div>
        </aside>
    );
};

export default Aside;
