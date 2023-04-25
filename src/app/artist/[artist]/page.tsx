import { Suspense } from "react";
import { DynamicSegment } from "types/react";
import Link from "next/link";
import Image from "next/image";
import { Artist } from "types/libs";
import { artists, random } from "libs/spotify";
import { FaSpotify, FaUsers } from "react-icons/fa";
import Songs from "components/streamables/Songs";
import Albums from "components/streamables/Albums";
import Similars from "components/streamables/Similars";
import LoadingCards from "components/streamables/LoadingMessage";
import styles from "styles/pages/artist.module.scss";

{ /* @ts-expect-error Async Server Component */ }
const ArtistPage: DynamicSegment<{ artist: string }> = async ({ params }) => {

    const getArtist = async (): Promise<Artist> => {
        try {
            return ( params.artist === 'random' ) ? await random() : await artists(params.artist);   
        } catch (error) {
            return {
                name: 'Error loading artist',
                followers: { href: '', total: 0 },
                id: '',
                genres: [],
                popularity: 0,
                images: [ { width: 0, height: 0, url: ''} ],
                external_urls: { spotify: '#' }
            }
        }
    };

    const artist: Artist = await getArtist();
    const id: string = ( params.artist === 'random' ) ? artist.id : params.artist;

    return (
        <main className={styles.container}>
            <section className={styles.profile}>
                <Image src={artist.images[0]?.url || '/images/artist_error.jpg'} alt='artist poster' width={100} height={100} />
                <div className={styles.info}>
                    <div className={styles.artist}>
                        <h2>{ artist.name }</h2>
                        <span>{ artist.genres.slice(0, 3).join(', ') }</span>
                    </div>
                    <div className={styles.about}>
                        <p><FaUsers /> { artist.followers.total }</p>
                        <Link href={artist.external_urls.spotify}><FaSpotify /></Link>
                    </div>
                </div>
            </section>
            <section className={styles.works}>
                <h2>Top Works</h2>
                <div>
                    <Suspense fallback={ <LoadingCards message='Loading Songs...'/> }>
                        <Songs id={id} />
                    </Suspense>
                </div>
            </section>
            <section className={styles.albums}>
                <h2>Albums</h2>
                <div>
                    <Suspense fallback={ <LoadingCards message='Loading Albums...'/> }>
                        <Albums id={id} />
                    </Suspense>
                </div>
            </section>
            <section className={styles.similar}>
                <h2>Similar Artists</h2>
                <div>
                    <Suspense fallback={ <LoadingCards message='Loading Albums...'/> }>
                        <Similars id={id} />
                    </Suspense>
                </div>
            </section>
        </main>
    );
};

export default ArtistPage;
