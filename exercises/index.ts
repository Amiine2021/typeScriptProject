interface Artist {
    name: string;
    category: 'artist';
}

interface Album {
    name: string,
    artistName: string,
    category: 'album'
}

interface HasName {
    name: string;
}

const artists: Artist[] = [
    {
        name: 'Madonna',
        category: 'artist'
    },
    {
        name: 'Led Zeppelin',
        category: 'artist'
    },
    {
        name: 'Earth, Wind, and Fire',
        category: 'artist'
    }
];

let albums: Album[] = [
    {
        name: 'Like a Virgin',
        artistName: 'Madonna',
        category: 'album'
    },
    {
        name: 'Like a Prayer',
        artistName: 'Madonna',
        category: 'album'
    },
    {
        name: 'Houses of the Holy',
        artistName: 'Led Zeppelin',
        category: 'album'
    },
    {
        name: 'In Through the Out Door',
        artistName: 'Led Zeppelin',
        category: 'album'
    }
];

function extractName(obj: HasName): string {
    return obj.name;
}

function getAlbumsByArtistName(artistName: string): Album[] {
    return albums.filter(
        album => artistName == album.artistName
    );
}

type ArtistOrAlbum = Artist | Album;

function getArtistAndAlbumsByArtistName(artistName: string): ArtistOrAlbum[] {
    let artist = artists.find(({name}) => name == artistName);
    let albums = getAlbumsByArtistName(artistName);
    return [
        artist,
        ...albums
    ];
}

type ArtistWithAlbumNames = Artist & {
    albumNames: string[]
};

function getArtistWithAlbumNames(artistAndAlbums: ArtistOrAlbum[]): ArtistWithAlbumNames {
    let artist: Artist;
    let albumNames: string[] = [];

    for (let i = 0; i < artistAndAlbums.length; i++) {
        if ('artistName' in artistAndAlbums[i]) {
            albumNames.push(extractName(artistAndAlbums[i]));
        } else {
            artist = artistAndAlbums[i] as Artist;
        }
    }
    return {
        ...artist,
        albumNames
    };
}

function extractNames<T extends HasName>(a: T, b: T): string[] {
    return [a, b].map(({name}) => name);
}