import type {Organizzazione} from "@/types/organizzazioneType";
import type {Link} from "@/types/linkType";
import type {Carta} from "@/types/cartaType";

export interface Organizzatore {
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
    link: Link[];
    carte: Carta[];
}