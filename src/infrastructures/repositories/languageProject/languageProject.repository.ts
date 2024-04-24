import { LanguageM } from "@/domain/model/language.model";
import { LanguageProjectM } from "@/domain/model/languageProject.modal";
import { ProjectM } from "@/domain/model/project.model";
import { ILanguageRepository } from "@/domain/repositories/language.repository";
import { ILanguageProjectRepository } from "@/domain/repositories/languageProject.repository";
import { LanguageProject } from "@/infrastructures/entities/languageProject.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

export class LanguageProjectRepositoryOrm implements ILanguageProjectRepository{
    constructor(
        @InjectRepository(LanguageProject)
        private readonly languageProjectRepository : Repository<LanguageProject>
    ){

    }
    findAll(option?: any): Promise<LanguageProjectM[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<LanguageProjectM> {
        throw new Error("Method not implemented.");
    }

    async findLanguageProject(project: any, technical?:any ): Promise<LanguageProjectM[]> {
        return await this.languageProjectRepository.find({
            where:{
                project:{
                    id: project.id
                }
            },
            relations:{
                language:true
            }
        })
    }
    async create(entity: Partial<LanguageProjectM>, manager?: any): Promise<LanguageProjectM> {
        const langueProject = new LanguageProject
        langueProject.project = entity.project;
        langueProject.language = entity.language
        return await manager.save(langueProject)
    }
    update(id: string, entity: Partial<LanguageProjectM>, manager?: any): Promise<LanguageProjectM> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async removeAll(project:ProjectM, manager: EntityManager):Promise<void>{
        const languageProject = await this.languageProjectRepository.find({
            where:{
                project:project
            }
        })
        // console.log(languageProject)
     
        await Promise.all(project.languageProject.map(async (languageProject) => {
            console.log(languageProject)
            await this.languageProjectRepository.remove(languageProject);
        }));
        // return Promise.resolve();
    }
}