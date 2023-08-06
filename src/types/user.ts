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
        avatar: string;
        condition: Condition;
        email: string;
        fullName: string | null;
        guidesCount: number;
        id: string;
        monthEarnings: number;
        phone: string | null;
        role: Role;
        username: string;
    }
}