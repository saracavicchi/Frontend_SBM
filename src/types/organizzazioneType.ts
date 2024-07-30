import type {Organizzatore} from "@/types/organizzatoreType";
import type {Link} from "@/types/linkType";

export interface Organizzazione {
    id: number;
    nome: string;
    descrizione: string;
    mail: string;
    telefono: string;
    urlFoto: string;
    stato: string;
    provincia: string;
    città: string;
    cap: string;
    via: string;
    numCivico: string;
    iban: string;
    admin: Organizzatore;
    link: Link[];
    organizzatori: Organizzatore[];
}