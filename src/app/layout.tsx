import { Metadata } from "next";
import { FunctionalLayout } from "types/react";
import Header from "components/Header";
import Footer from "components/Footer";
import "styles/globals.scss";

export const metadata: Metadata = {
  	title: 'Discover That Voice'
};

const RootLayout: FunctionalLayout = ({ children }) => {
	return (
		<html lang="en">
			<body className='full'>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
};

export default RootLayout;
