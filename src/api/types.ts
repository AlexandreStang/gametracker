export interface Game {
    id: string;
    name: string;
    first_release_date?: number;
    platforms?: Platform[];
    genres?: Genre[];
    updated_at?: Date;
}

export interface Genre {
    id: string;
    name: string;
    updated_at?: Date;
}

export interface Platform {
    id: string;
    name: string;
    updated_at?: Date;
}

