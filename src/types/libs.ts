type Image = {
    url: string;
    height: number | null;
    width: number | null;
};

type ExternalUrls = { 
    spotify: string;
};

type SpotifyTypeSearchResult = 'albums' | 'artists' | 'playlists' | 'tracks' | 'shows' | 'episodes' | 'audiobooks';
type AlbumType = 'album' | 'single' | 'compilation';

// ERRORS

export type SpotifyError = {
    status: number;
    message: string;
};

export type SpotifyAuthenticationError = {
    error: string;
    error_description: string;
};

// EXPOSED

export type SpotifyType = 'album' | 'artist' | 'playlist' | 'track';
export type SearchableItem = Artist | Track | Album | SimplifiedAlbum;
export type SpotifyAPIData = {
    access_token: string;
    token_type: string;
    expires_in: number;
};

// SIMPLIFIED

export type SimplifiedArtist = {
    external_urls: ExternalUrls;
    id: string;
    name: string;
};

export type SimplifiedTrack = {
    artists: SimplifiedArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrls;
    id: string;
    is_playable: boolean;
    name: string;
    preview_url: string;
    track_number: number;
};

export type SimplifiedAlbum = {
    album_type: AlbumType;
    total_tracks: number;
    available_markets: string[];
    external_urls: { spotify: string };
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    genres: string[];
    label: string;
    popularity: number;
    artists: SimplifiedArtist[];
};

// FULL

export type Artist = SimplifiedArtist & {
    followers: { href: string | null; total: number };
    popularity: number;
    genres: string[];
    images: Image[];
};

export type Track = SimplifiedTrack & {
    album: SimplifiedAlbum;
    artists: Artist[];
    popularity: number;
};

export type Album = SimplifiedAlbum & {
    tracks: {
        href: string;
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
        items: SimplifiedTrack[];
    };
};

// COLLECTIONS

export type ArtistCollection = {
    artists: Artist[];
};

export type TrackCollection = {
    tracks: Track[];
};

export type AlbumCollection = {
    albums: Album[];
};

export type PlaylistTrack = {
    //* There are other fields. However, they will not be needed.
    track: Track;
};

export type PaginateCollection<T> = {
    href: string;
    limit: number;
    next: string | null;
    previous: string | null;
    offset: number;
    total: number;
    items: T[];   
};

export type SearchResult<T extends SearchableItem> = {
    [ key in SpotifyTypeSearchResult ]: PaginateCollection<T>;
};
