import { PositionM } from "@/domain/model/position.model";
import { IPositionRepository } from "@/domain/repositories/position.model";
import { Position } from "@/infrastructures/entities/position.entity";
import { ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class PositionRepositoryOrm implements IPositionRepository{
    constructor(
        @InjectRepository(Position)
        private readonly positionRepository: Repository<Position>
    ){

    }
    async findAll(): Promise<PositionM[]> {
        return this.positionRepository.find()
    }
    async findById(id: string): Promise<PositionM> {
        if(!id){
            throw new ForbiddenException({message:"Please Check Data Again"})
        }
        const position = await this.positionRepository.findOne({
            where:{
                id:id
            }
        })
        return position
    }
    async create(entity: Partial<PositionM>): Promise<PositionM> {
        const position = new PositionM
        position.name = entity.name
        position.description = entity.description

        return await this.positionRepository.save(position)

    }
    async update(id: string, entity: Partial<PositionM>): Promise<PositionM> {
        const position = await this.findById(id)
        if(!position){
            throw new ForbiddenException({message: 'Not Found Id'})
        }
        position.name = entity.name
        position.profile = entity.profile

        return await this.positionRepository.save(position) 
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}