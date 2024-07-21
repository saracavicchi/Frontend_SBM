export interface Utente {
    id: number;
    codFiscale: string;
    nome: string;
    cognome: string;
    dataNascita: string;
    username: string;
    mail: string;
    telefono: string;
    bio: string;
    urlFoto: string;
    pIva: string;
    iban: string;
    stato: string;
    provincia: string;
    città: string;
    cap: string;
    via: string;
    numCivico: string;
    organizzazione: {
        id: number;
    };
}