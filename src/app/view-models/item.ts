export interface Item {
    id: number;
    catalogName: string;
    name: string;
    description: string;

}

export class ProposalItem {
    constructor(id: number, catalogName: string, name: string, description: string) {
        this.id = id;
        this.catalogName = catalogName;
        this.name = name;
        this.description = description;
    }
    id: number;
    catalogName: string;
    name: string;
    description: string;

}

    /*price:string;
    size:string;
    producer:string;*/