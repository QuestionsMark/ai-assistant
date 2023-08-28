export namespace User {
    export enum Role {
        Creator = 'creator',
        Moderator = 'moderator',
        Admin = 'admin',
    }

    export enum Condition {
        Active = 'active',
        Inactive = 'inactive',
        Banned = 'banned',
    }

    // Request
    export interface Update {
        username: string;
        fullName: string;
        phone: string;
    }

    //Response
    export interface Response {
        email: string;
        id: string;
        username: string;
    }
}