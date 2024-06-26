import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { TechnicalMember } from './technicalMember.entity';
import { TechnicalProject } from './technicalProject.enity';

@Entity('technical')
export class Technical {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column({ type: 'boolean', default: false })
  isDelete: boolean;
  
  @OneToMany(() => TechnicalMember, technicalMember => technicalMember.technical)
  technicalMember: TechnicalMember[];

  @OneToMany(()=>TechnicalProject, technicalProject => technicalProject.technical)
  technicalProject: TechnicalProject[]

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
public created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
public updated_at: Date;
}