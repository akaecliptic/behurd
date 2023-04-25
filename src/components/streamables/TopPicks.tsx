import Portrait from "components/artists/Portrait";
import { several_artists } from "libs/spotify";
import { FC } from "react";

{ /* @ts-expect-error Async Server Component */ }
const TopPicks: FC = async () => {

    const items = await several_artists()
        .then( data => (
            data.artists.map( 
                artist => <Portrait key={artist.name} name={artist.name} url={artist.images[0]?.url} id={artist.id} /> 
            )
        ))
        .catch( error => {
            console.error('Request failed:', error);
            
            const dummy: JSX.Element[] = [];
            for(let i = 0; i < 5; i++)
                dummy.push(<Portrait key={i} name={'request failed'} url={''} id={''} />)

            return dummy;
        });

    return (
        <>{ ...items }</>
    );
};

export default TopPicks;
