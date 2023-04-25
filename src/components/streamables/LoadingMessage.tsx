import { FC } from "react";

export type PropLoadingCards = {
    message: string;    
};

const LoadingCards: FC<PropLoadingCards> = ({ message }) => {
    return (
        <span className='feedback-text'>{ message }</span>
    );
};

export default LoadingCards;
