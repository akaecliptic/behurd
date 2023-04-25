import { FC } from "react";
import { SpotifyError } from "types/libs";

export type PropError = {
    display: string;
    source: SpotifyError | any;
};

const Error: FC<PropError> = ({ display, source }) => {
    console.log('Error found:', source);
    return (
        <span className='feedback-text'>{ display }</span>
    );
};

export default Error;
