import { FC } from "react";
import { albums } from "libs/spotify";
import { PropStreamable } from "types/common";
import Album from "components/works/Album";
import Error from "components/streamables/Error";

{ /* @ts-expect-error Async Server Component */ }
const Albums: FC<PropStreamable> = async ({ id }) => {
    const items = await albums(id)
        .then(data => 
            data.map( 
                album => <Album key={album.id} title={album.name} url={album.images[0].url} songs={album.total_tracks} link={album.external_urls.spotify} />  
            )
        )
        .catch(
            error => [<Error display='Error loading artist albums. Try refreshing page.' source={error} />]
        );

    return (
        <>{ ...items }</>
    );
};

export default Albums;
