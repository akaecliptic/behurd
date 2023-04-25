import { Artist, ArtistCollection, PaginateCollection, PlaylistTrack, SearchResult, SimplifiedAlbum, SpotifyAPIData, SpotifyType, TrackCollection } from "types/libs";

const PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/playlists';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search?';
const ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/artists';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const OPTIONS: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    cache: 'no-cache' //* A very crass way to make sure token isn't stale... sorry
};

const RANDOM_POOL = [
    '37i9dQZEVXbLRQDuF5jeBp', // USA - 10%
    '37i9dQZEVXbMDoHDwVN2tF', // Global - 10%
    '37i9dQZF1DX4JAvHpjipBk', // New Music Friday - 10%
    '37i9dQZEVXbLnolsZ8PSNw', // UK - 10%
    
    '37i9dQZEVXbKM896FDX8L1', // Ireland - 20%
    '37i9dQZEVXbKXQ4mDTEBXq', // JAPAN - 20% 
    '37i9dQZEVXbNFJfN1Vw8d9'  // SPAIN - 20%
];

//* Today's Top Hits
const TRENDING_PLAYLIST = '37i9dQZF1DXcBWIGoYBM5M'; 
//* Skott, J Cole, Sammy Rae, Burna Boy, Paramore
const TOP_PICKS = '6J3RPKUwZlKMzh3vWa9wPc,6l3HvQ5sa6mXTsMTB19rO5,3lFDsTyYNPQc8WzJExnQWn,3wcj11K77LjEY1PkEazffa,74XFHRwlV6OrjEM0A2NCMF';

const requestBearerToken = async (): Promise<any> => {
    try {
        const response: Response = await fetch(TOKEN_ENDPOINT, OPTIONS);
        
        if ( response.status >= 400 ) {
            const error = await response.json();
            return Promise.reject(error);
        }
        
        const data = await response.json() as SpotifyAPIData;
        return { Authorization: `Bearer ${data.access_token}` };
    } catch (error) {
        return Promise.reject(error);
    }
};

const createOptions = (method: 'GET' | 'POST', body?: string, headers?: HeadersInit): Promise<RequestInit> => {
    return requestBearerToken()
    .then( bearer => 
        ({
            method,
            headers: { ...bearer, ...headers },
            body
        })
    )
    .catch(error => { if (error) return error });
};

const getRandomPlaylist = () => {
    const seed = Math.floor(Math.random() * 10);
    if ( seed < 4 ) return RANDOM_POOL[seed];
    if ( seed < 6 ) return RANDOM_POOL[4];
    if ( seed < 8 ) return RANDOM_POOL[5];
    if ( seed < 10 ) return RANDOM_POOL[6];
};

export const search = async <T extends Artist>(query: string, searchType: SpotifyType = 'artist'): Promise<SearchResult<T>> => {
    try {
        const options = await createOptions('GET');
        const encodedQuery: string = encodeURIComponent(query);

        const response = await fetch(`${SEARCH_ENDPOINT}q=${encodedQuery}&type=${searchType}`, options);
        
        const data = await response.json() as SearchResult<T>;
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const artists = async (artist: string): Promise<Artist> => {
    try {
        const options = await createOptions('GET');

        const response = await fetch(`${ARTISTS_ENDPOINT}/${artist}`, options);
        
        const data = await response.json() as Artist;
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const related = async (artist: string): Promise<ArtistCollection> => {
    try {
        const options = await createOptions('GET');

        const response = await fetch(`${ARTISTS_ENDPOINT}/${artist}/related-artists`, options);
        
        const data = await response.json() as ArtistCollection;
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const several_artists = async (artists: string = TOP_PICKS): Promise<ArtistCollection> => {
    try {
        const options = await createOptions('GET');

        const response = await fetch(`${ARTISTS_ENDPOINT}?ids=${artists}`, options);

        const data = await response.json() as ArtistCollection;
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const top_tracks = async (artist: string, market: string = 'GB'): Promise<TrackCollection> => {
    try {
        const options = await createOptions('GET');

        const response = await fetch(`${ARTISTS_ENDPOINT}/${artist}/top-tracks?market=${market}`, options);
        
        const data = await response.json() as TrackCollection;
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const albums = async (artist: string, market: string = 'GB'): Promise<SimplifiedAlbum[]> => {
    try {
        const options = await createOptions('GET');

        const response = await fetch(`${ARTISTS_ENDPOINT}/${artist}/albums?include_groups=album,single&market=${market}&limit=50`, options);
        
        const data = await response.json() as PaginateCollection<SimplifiedAlbum>;
        const names = new Set<string>();

        return data.items.filter( item => {
            if ( item.total_tracks > 1 && !names.has(item.name) ) {
                names.add(item.name);
                return true;
            }
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

export const charts = async (market: string = 'GB'): Promise<ArtistCollection> => {
    try {
        const options = await createOptions('GET');

        const response = await fetch(`${PLAYLIST_ENDPOINT}/${TRENDING_PLAYLIST}/tracks?market=${market}&limit=50`, options);
        
        const data = await response.json() as PaginateCollection<PlaylistTrack>;
        const names: string[] = [];

        data.items.forEach( 
            item => (!names.includes(item.track.artists[0].id)) && names.push(item.track.artists[0].id)
        );
        const artists = names.slice(0, 50).join(',');

        return await several_artists(artists);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const random = async (market: string = 'GB'): Promise<Artist> => {
    try {
        const options = await createOptions('GET');

        const response = await fetch(`${PLAYLIST_ENDPOINT}/${getRandomPlaylist()}/tracks?market=${market}&limit=50`, options);
        
        const data = await response.json() as PaginateCollection<PlaylistTrack>;

        const item: PlaylistTrack = data.items[Math.floor(Math.random() * data.items.length)];
        const artist = item.track.artists[0].id;

        return await artists(artist);
    } catch (error) {
        return Promise.reject(error);
    }
};
