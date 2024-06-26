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
import { RoleMemberProject } from './roleMemberProject.entity';
import { PositionMember } from './positionMember.entity';
// import { PositionProject } from './positionMember.entity';

@Entity('position')
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  isDelete: boolean;

  @OneToMany(() => PositionMember, (positionMember) => positionMember.postion)
  positionMember: PositionMember[];

  @OneToMany(() => RoleMemberProject, (position) => position.position)
  positions: RoleMemberProject[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
public created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
public updated_at: Date;
}
