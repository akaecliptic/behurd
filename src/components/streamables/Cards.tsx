import { FC } from "react";
import { Artist } from "types/libs";
import { charts, search } from "libs/spotify";
import Card from "components/artists/Card";
import Error from "components/streamables/Error";

export type PropCards = {
    query: string | null;
};

{ /* @ts-expect-error Async Server Component */ }
const Cards: FC<PropCards> = async ({ query }) => {

    const items: JSX.Element[] = []; 
    
    try {
        const artists: Artist[] = ( query ) ? (await search(query)).artists.items : (await charts()).artists;
        artists.map( 
            artist => items.push(<Card key={artist.name} id={artist.id} name={artist.name} url={artist.images[0]?.url} genres={artist.genres} link={artist.external_urls.spotify} />)
        );
    } catch (error) {
        items.push(<Error key='error' display='Error loading artists. Try refreshing page.' source={error} />)
    }

    return (
        <>{ ...items }</>
    );
};

export default Cards;
