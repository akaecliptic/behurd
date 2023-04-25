import { Suspense } from "react";
import { SearchableSegment } from "types/react";
import Cards from "components/streamables/Cards";
import LoadingCards from "components/streamables/LoadingMessage";
import styles from "styles/pages/explore.module.scss";

{ /* @ts-expect-error Async Server Component */ }
const ExplorePage: SearchableSegment<{ search: string, trending: string }> = async ({ searchParams: { search, trending } }) => {
    return (
        <main className={styles.container}>
            <Suspense fallback={ <LoadingCards message='Loading Artists...'/> }>
                <Cards query={ trending === '' ? null : search }/>
            </Suspense>
        </main>
    );
};

export default ExplorePage;