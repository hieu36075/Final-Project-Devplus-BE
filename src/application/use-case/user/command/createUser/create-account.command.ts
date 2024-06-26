import { ICommand } from "@nestjs/cqrs";

export class CreateAccountCommand implements ICommand{
    constructor(
        public readonly email: string,
        public readonly userName:string,
        public readonly password: string,
        public readonly fullName: string,
        public readonly dayOfBirth: string,
        public readonly description: string,
        public readonly technical: [],
        public readonly positions: string[],
        public readonly language: [],
        public readonly isManager: boolean,
        public readonly managerId?: string,
        public readonly address?:string
    ){}
}