import { ICommand } from "@nestjs/cqrs";

export class CreateProjectCommand implements ICommand{
    constructor(
        public readonly name:string,
        public readonly description: string,
        public readonly startDate:string,
        public readonly endDate:string,
        public readonly technical: string[],
        public readonly language: string[],
        public readonly managerId : string,
        public readonly employeeId: [],
    ){

    }
}