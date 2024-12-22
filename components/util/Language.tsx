import { JSX } from "react";

interface Params {
    lang: string;
    candidate: { [key: string]: string | JSX.Element };
    children?: React.ReactNode; // 支持 children
}

function Lan({ lang, candidate }: Params): JSX.Element {

    return <>
        {candidate[lang]}
    </>;
}

export default Lan;