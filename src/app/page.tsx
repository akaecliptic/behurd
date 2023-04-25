import { FC, Suspense } from "react";
import Image from "next/image";
import { FaAndroid, FaApple, FaDatabase, FaGlobeAfrica, FaHandsHelping, FaSpotify } from "react-icons/fa";
import LoadingMessage from "components/streamables/LoadingMessage";
import TopPicks from "components/streamables/TopPicks";
import styles from "styles/pages/index.module.scss";

//* This is the current recommended work around as of now (2024/04/20) -- https://beta.nextjs.org/docs/configuring/typescript#async-server-component-typescript-error
{ /* @ts-expect-error Async Server Component */ }
const IndexPage: FC = async () => {
	return (
		<main className={styles.container}>
			<section className={styles.topic}>
				<div className={styles.heading}>
					<span>DISCOVER THAT VOICE AND LET THEM BE HURD</span>
					<h2>Bridging the gap between users and their soon to be favourite artist</h2>
				</div>
				<div className={styles.picks}>
					<div className={styles.text}>
						<span>A CATALOGUE OF 1,000,000+ ARTSITS</span>
						<h2>Todays Top Picks</h2>
						<p>With so many artists out there pursuing their passions. This is our top pick of artist just waiting to be hurd.</p>
					</div>
					<div className={styles.artists}>
						<Suspense fallback={ <LoadingMessage message={'Loading top picks...'}/> }>
							<TopPicks />
						</Suspense>
					</div>
				</div>
			</section>
			<section className={styles.topic + ' ' + styles.wide}>
				<div className={styles.heading}>
					<span>OUR MISSION</span>
					<h2>Developing a platform for everyone</h2>
				</div>
				<div className={styles.missions}>
					<div>
						<FaHandsHelping />
						<h4>To support Small and Lesser known artists</h4>
					</div>
					<div>
						<FaDatabase />
						<h4>To give greater access to catalogues of music</h4>
					</div>
					<div>
						<FaGlobeAfrica />
						<h4>To provide better discoverability</h4>
					</div>
				</div>
			</section>
			<section className={styles.topic}>
				<div className={styles.heading}>
					<span>OUR TECHNOLOGIES</span>
					<h2>How we create</h2>
				</div>
				<div className={styles.technologies}>
					<div>
						<FaSpotify />
						<h2>Powered by Spotify</h2>
						<h5>Using the Spotify API to provide the largest catalogue of talent available.</h5>
					</div>
					<div>
						<Image src='/images/logo.svg' alt='be:hurd logo' width={50} height={50}></Image>
						<h2>Inspired by un:hurd</h2>
						<h5>Mimicking the style and design of the brightest minds at be:hurd.</h5>
					</div>
					<div>
						<div>
							<FaApple />
							<FaAndroid />
						</div>
						<h2>Created by akaecliptic</h2>
						<h5>Coming to ios and android devices never.</h5>
					</div>
				</div>
			</section>
			<div className={styles.splash} />
		</main>
	);
};

export default IndexPage;
