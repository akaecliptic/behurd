import { FC } from "react";
import { top_tracks } from "libs/spotify";
import { PropStreamable } from "types/common";
import Song from "components/works/Song";
import Error from "components/streamables/Error";

{ /* @ts-expect-error Async Server Component */ }
const Songs: FC<PropStreamable> = async ({ id }) => {
    
    const items = await top_tracks(id)
        .then(data => (
            data.tracks.map( 
                track => <Song key={id + '-' + track.name} title={track.name} url={track.album.images[0]?.url} length={track.duration_ms} link={track.external_urls.spotify} />
            )
        ))
        .catch(
            error => [<Error display='Error loading artist songs. Try waiting before refreshing page.' source={error} />]
        );
            
    return (
        <>{ ...items }</>
    );
};

export default Songs;
