import { FC, Suspense } from "react";
import Link from "next/link";
import { FaSpotify } from "react-icons/fa";
import Portrait from "components/artists/Portrait";
import Songs from "components/streamables/Songs";
import LoadingCards from "components/streamables/LoadingMessage";
import styles from "styles/modules/artists.module.scss";

/*
    Wanted to have a nice section to display an artist's external links, like in my initial design.
    The dream is unforunately dead -- https://github.com/spotify/web-api/issues/1050#issuecomment-432601751
*/
export type PropCard = {
    id: string;
    name: string;
    url: string;
    genres: string[];
    link: string; //Singular external link, see above comment.
};

{ /* @ts-expect-error Async Server Component */ }
const Card: FC<PropCard> = async ({ id, name, url, genres, link }) => {
    return (
        <div className={styles.card}>
            <div className={styles.head}>
                <Portrait name={name} url={url} id={id} />
                <div className={styles.info}>
                    <Link href={`/artist/${id}`}><h2>{ name }</h2></Link>
                    <span>{ genres.join(', ') || 'music' }</span>
                </div>
                <div className={styles.links}>
                    <Link href={link}><FaSpotify /></Link>
                </div>
            </div>
            <div className={styles.body}>
                <Suspense fallback={ <LoadingCards message='Loading Songs...'/> }>
                    <Songs id={id} />
                </Suspense>
            </div>
        </div>
    );
};

export default Card;
