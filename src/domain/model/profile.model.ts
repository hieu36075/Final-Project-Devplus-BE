// profile.modal.ts


import { GenderEnum } from '@/application/common/enums/gender.enum';
import { ProfileStatusEnum } from '@/application/common/enums/profile-status.enum';
import { PositionM } from './position.model';
import { UserM } from './user.model';
import { TechnicalM } from './technical.model';
import { TechnicalMemberM } from './technicalMember.model';



export class ProfileM {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  dayOfBirth: Date;
  avatarUrl: string;
  gender: GenderEnum;
  status: ProfileStatusEnum;
  address: string
  description: string;
  // user: UserM
}
