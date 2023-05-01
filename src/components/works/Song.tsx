'use client';

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "styles/modules/works.module.scss";

export type PropSong = {
    title: string;
    url: string;
    length: number;
    link: string;
};

const Song: FC<PropSong> = ({ title, url, length, link }) => {
    
    const formatLength = (): string => {
        const date = new Date(Date.UTC(0, 0));
        date.setMilliseconds(length);

        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        
        return (hours) ? 
        `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` : 
        `${minutes}:${seconds.toString().padStart(2, '0')}` ;
    };

    return (
        <Link href={link} className={styles.song}>
            <Image src={url} alt={`'${title}' cover`} width={100} height={100}/>
            <h2>{ title }</h2>
            <h4>{ formatLength() }</h4>
        </Link>
    );
};

export default Song;
