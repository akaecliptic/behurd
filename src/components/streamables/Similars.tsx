import { FC } from "react";
import { related } from "libs/spotify";
import { PropStreamable } from "types/common";
import Error from "components/streamables/Error";
import Portrait from "components/artists/Portrait";

{ /* @ts-expect-error Async Server Component */ }
const Similars: FC<PropStreamable> = async ({ id }) => {
    const items = await related(id)
        .then(data => 
            data.artists.map( 
                relate => <Portrait key={relate.name} name={relate.name} url={relate.images[0]?.url} id={relate.id} /> 
            )
        )
        .catch(
            error => [<Error display='Error loading similar artists. Try refreshing page.' source={error} />]
        );

    return (
        <>{ ...items }</>
    );
};

export default Similars;
