import {Permission} from "@/classes/permission";
import {Entity} from "@/interfaces/entity";

export class Role implements Entity  {
    id: number;
    title: string;
    permissions: Permission[];

    constructor(id = 0, name = '', permissions = []) {
        this.id = id;
        this.title = name;
        this.permissions = permissions
    }
}