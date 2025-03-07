export interface Game {
    id: string;
    name: string;
    first_release_date?: number;
    platforms?: Platform[];
    genres?: Genre[];
}

export interface Genre {
    id: string;
    name: string;
}

export interface Platform {
    id: string;
    name: string;
}

