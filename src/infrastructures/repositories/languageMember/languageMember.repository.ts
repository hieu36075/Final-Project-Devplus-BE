import { LanguageMemberM } from "@/domain/model/languageMember.modal";
import { ILanguageMemberRepository } from "@/domain/repositories/languageMember.repository";
import { LanguageMember } from "@/infrastructures/entities/languageMember.entity";
import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

export class LanguageMemberRepositoryOrm implements ILanguageMemberRepository{
    constructor(
        @InjectRepository(LanguageMember)
        private readonly languageMemberRepository: Repository<LanguageMember>
    ){

    }
    async findAll(option?: any): Promise<LanguageMemberM[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<LanguageMemberM> {
        if(!id){
            throw new BadRequestException()
        }
        const languageMember = await this.languageMemberRepository.findOne({
            where:{
                id: id
            }
        })

        return languageMember
    }
    async create(entity: Partial<LanguageMemberM>, manager?: any): Promise<LanguageMemberM> {
        const languageMember = new LanguageMember
        languageMember.language = entity.language
        languageMember.user = entity.user
        return await manager.save(languageMember)
    }
    update(id: string, entity: Partial<LanguageMemberM>, manager?: any): Promise<LanguageMemberM> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string, manager?: EntityManager): Promise<void> {
       
        const language = await this.findById(id)

        await manager.remove(language)
    }

}