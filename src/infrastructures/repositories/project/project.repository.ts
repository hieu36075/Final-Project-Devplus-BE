import { PageMetaDto } from "@/application/dto/pagination/pageMeta.dto";
import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions";
import { PageDto } from "@/application/dto/pagination/responsePagination";
import { CreateProjectDTO } from "@/application/dto/project/create-project.dto";
import { UpdateProjectDTO } from "@/application/dto/project/update-project.dto";
import { ProjectM } from "@/domain/model/project.model";
import { IProjectRepository } from "@/domain/repositories/project.repository";
import { Project } from "@/infrastructures/entities/project.enity";
import { ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { parseISO } from "date-fns";
import { EntityManager, Repository } from "typeorm";

export class ProjectRepositoryOrm implements IProjectRepository {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {

    }
    async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<ProjectM>> {
     
        const { name, page, take, orderBy } = pageOptionsDto;
        const skip = (page - 1) * take;
    

        const count = await this.projectRepository.count()
        const projects = await this.projectRepository.find({
            where:{
                name: name
            },
            order:{
                startDate: orderBy
            },
            skip,
            take
        });

        const pageMetaDto = new PageMetaDto(pageOptionsDto, count);

        return new PageDto<ProjectM>(projects, pageMetaDto, 'Success');
    }
    
    async findById(id: string): Promise<ProjectM> {
        if (!id) {
            throw new ForbiddenException('Not have Id')
        }
        const project = await this.projectRepository.findOne({
            where: {
                id: id
            }
        })

        return project
    }
    async create(createProjectDTO: CreateProjectDTO, manager: EntityManager ): Promise<ProjectM> {
        const project = new Project
        project.name = createProjectDTO.name
        project.description = createProjectDTO.description
        project.startDate = parseISO(createProjectDTO.startDate);
        project.endDate = parseISO(createProjectDTO.endDate);
        project.technical = createProjectDTO.technical
        return await manager.save(project)
    }


    async update(id: string,updateProjectDTO: UpdateProjectDTO): Promise<ProjectM> {
        const projectToUpdate = await this.findById(id);
        if (!projectToUpdate) {
            throw new Error('Project not found');
        }

        projectToUpdate.name = updateProjectDTO.name;
        projectToUpdate.description = updateProjectDTO.description;
        projectToUpdate.startDate = parseISO(updateProjectDTO.startDate); 
        projectToUpdate.endDate = parseISO(updateProjectDTO.endDate);
        projectToUpdate.technical = updateProjectDTO.technical;
        return await this.projectRepository.save(projectToUpdate)
    }

    async  delete(id: string): Promise<void> {
        
    }
}