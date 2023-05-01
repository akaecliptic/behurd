'use client';

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCompactDisc } from "react-icons/fa";
import styles from "styles/modules/works.module.scss";

export type PropAlbum = {
    title: string;
    url: string;
    songs: number;
    link: string;
};

const Album: FC<PropAlbum> = ({ title, url, songs, link }) => {
    return (
        <Link href={link} className={styles.album}>
            <Image src={url} alt={`'${title}' cover`} width={100} height={100}/>
            <h2>{ title }</h2>
            <h4><FaCompactDisc /> { songs }</h4>
        </Link>
    );
};

export default Album;
