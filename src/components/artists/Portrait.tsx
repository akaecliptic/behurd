'use client';

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "styles/modules/artists.module.scss";

export type PropPortrait = {
    name: string;
    url: string;
    id: string
};

const Portrait: FC<PropPortrait> = ({ name, url, id }) => {
    return (
        <div className={styles.portrait}>
            <Link href={id ? `/artist/${id}` : '#'}><span>{ name }</span></Link>
            <Image src={url || '/images/artist_error.jpg'} alt={`Portrait of ${name}`} width={120} height={120} priority />
        </div>
    );
};

export default Portrait;

