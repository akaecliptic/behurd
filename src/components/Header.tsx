'use client';

import { FC, KeyboardEventHandler, MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FaSearch, FaFire, FaDice, FaBars } from "react-icons/fa";
import * as dompurify from "dompurify";
import Aside from "components/Aside";
import styles from "styles/modules/semantic.module.scss";

const Header: FC = () => {

    const PATHNAME_RANDOM = '/artist/random';

    const router = useRouter();
    const pathname = usePathname();
    const [query, setQuery] = useState<string>('');
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    
    const focusSearchbar = () => {
        const searchbar: HTMLInputElement = document.getElementById('searchbar') as HTMLInputElement;
        if ( !searchbar ) return;
        searchbar.focus();
    };

    const submitSearch: KeyboardEventHandler<HTMLInputElement> = async (event) => {
        if ( event.key !== 'Enter' || !query ) return;
        
        event.currentTarget.blur();
        router.push(`explore?search=${query}`);
    };

    const handleRandom: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        if ( pathname === PATHNAME_RANDOM ) {
            router.refresh();
            setMenuOpen(false);
        } else {
            router.push(PATHNAME_RANDOM);
        }
    };

    useEffect( () => {
        setMenuOpen(false);
    }, [pathname]);

    return (
        <>
            { menuOpen && <Aside handleRandom={handleRandom} close={() => setMenuOpen(false)}/> }
            <header className={styles.container}>
                <nav className={styles.container}>
                    <Link href='/' className={styles.logo}>
                        <Image 
                            src='/images/logo.svg' 
                            alt='be:hurd logo' 
                            width={75} 
                            height={75}
                            priority />
                    </Link>
                    <FaBars className={styles.menu} onClick={() => setMenuOpen(!menuOpen)}/>
                    <div className={styles.side}>
                        <Link href='/explore?trending'><FaFire /></Link>
                        <Link href='/artist/random' onClick={handleRandom}><FaDice /></Link>
                    </div>
                </nav>
                <div className={styles['searchbar-container']} onClick={focusSearchbar}>
                    <FaSearch />
                    <input 
                        type='search' 
                        name='searchbar' 
                        id='searchbar' 
                        placeholder='search'
                        onChange={event => setQuery(dompurify.sanitize(event.currentTarget.value))}
                        onKeyDown={submitSearch} />
                </div>
            </header>
        </>
    );
};

export default Header;
