import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { ProjectMember } from './projectMember.entity';
import { ProjectStatusEnum } from '@/application/common/enums/project-status.enum';
import { User } from './user.entity';
import { LanguageProject } from './languageProject.entity';
import { TechnicalProject } from './technicalProject.enity';
import { ProjectHistory } from './projectHistory.entity';

  
  @Entity('project')
  export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Index({ unique: true })
    @Column('varchar', { unique: true })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    description :string;
    
    @CreateDateColumn({ name: 'start_date' })
    startDate: Date;
  
    @CreateDateColumn({ name: 'end_date' })
    endDate: Date;


    @OneToMany(() => ProjectMember, projectMember => projectMember.project)
    projectMembers: ProjectMember[];
    
    @OneToMany(()=> LanguageProject, languageProject => languageProject.project)
    languageProject: LanguageProject[];

    @OneToMany(()=>TechnicalProject, technicalProject => technicalProject.project)
    technicalProject: TechnicalProject[]

    @OneToMany(()=>ProjectHistory, projectHistory => projectHistory.project)
    projectHistory: ProjectHistory[]

    @Column({ type: 'boolean', default: false })
    isDelete: boolean;
    
    @Column({
        type: 'enum',
        enum: ProjectStatusEnum,
        default: ProjectStatusEnum.Pending
    })
    status: ProjectStatusEnum;

    @ManyToOne(()=> User, {nullable:true})
    @JoinColumn({ name: 'managerId' })
    user: User
  }