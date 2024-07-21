interface DataOra {
    inizio: string;
    fine: string;
}

interface Indirizzo {
    stato: string;
    provincia: string;
    città: string;
    cap: string;
    via: string;
    num_civico: string | null;
}

export interface Evento {
    id: number;
    nome: string;
    data_ora: DataOra;
    indirizzo: Indirizzo;
    url_photo: string;
}