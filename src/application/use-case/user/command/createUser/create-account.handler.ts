import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from './create-account.command';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user/user.repository';
import { BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { RoleRepositoryOrm } from '@/infrastructures/repositories/role/role.repository';
import { Role } from '@/application/common/enums/role.enum';
import { ProfileRepositoryOrm } from '@/infrastructures/repositories/profile/profile.repository';
import { parseISO } from 'date-fns';
import { TechnicalRepositoryOrm } from '@/infrastructures/repositories/technical/technical.repository';
import { PositionM } from '@/domain/model/position.model';
import { PositionRepositoryOrm } from '@/infrastructures/repositories/position/position.repository';
import { Connection } from 'typeorm';
import { ProfileM } from '@/domain/model/profile.model';
import { ILanguageMemberRepository } from '@/domain/repositories/languageMember.repository';
import { InjectionToken } from '@/application/common/constants/constants';
import { ILanguageRepository } from '@/domain/repositories/language.repository';
import { ITechnicalMemberRepository } from '@/domain/repositories/technicalMember';
import { IPositionMemberRepository } from '@/domain/repositories/positionMember.repository';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(
    private readonly userRepository: UserRepositoryOrm,
    private readonly roleRepository: RoleRepositoryOrm,
    private readonly profileRepository: ProfileRepositoryOrm,
    private readonly technicalRepository: TechnicalRepositoryOrm,  
    private readonly positionRepository: PositionRepositoryOrm,
    private readonly connection: Connection,
    @Inject(InjectionToken.TECHNICALMEMBER_REPOSITORY)
    private readonly technicalMemberRepository: ITechnicalMemberRepository,
    @Inject(InjectionToken.LANGUAGE_REPOSITORY)
    private readonly languageRepository : ILanguageRepository,
    @Inject(InjectionToken.LANGUAGEMEMBER_REPOSITORY)
    private readonly languageMemberRepository : ILanguageMemberRepository,
    @Inject(InjectionToken.POSITIONMEMBER_REPOSITORY)
    private readonly positionMemberRepository : IPositionMemberRepository
  ) {}

  async execute(command: CreateAccountCommand): Promise<ProfileM> {
    const {
      // password,
      // userName,
      email,
      fullName,
      dayOfBirth,
      description,
      technical,
      positions,
      language,
      isManager,
      managerId
    } = command;
    return await this.connection.transaction(async (manager) => {
      try {
        // const hashedPassword = await this.bcryptService.hash(password);
        const role = await this.roleRepository.findByName(Role.EMPLOYEE);


        if(managerId){
          const manager = await this.userRepository.findById(managerId)
          if(!manager || manager.isManager != true){
            throw new  BadRequestException({message: "User is not manager"})
          }
        }
        
        const profile = await this.profileRepository.create(
          {
            fullName,
            dayOfBirth: parseISO(dayOfBirth),
            description: description,
            email: email,
            address: command.address,
          },
          manager,
        );


        const newUser = await this.userRepository.create(
          {
            email: email,
            role: role,
            profile: profile,
            isManager: isManager,
            managerId: managerId
          },
          manager,
        );
        if (technical && technical.length > 0) {
          for (const item of technical) {
            const {id, level, experience} = item
            const currentTechnical = await this.technicalRepository.findById(id);
            if (!currentTechnical) {
              throw new ForbiddenException({ message: 'invalid technical' });
            }
            await this.technicalMemberRepository.create({
              technical: currentTechnical,
              user:newUser,
              level: level,
              experience: experience
            },manager)
          }
        }

        if (language && language.length > 0) {
          for (const item of language) {
            const {id, level, experience} = item
            const currentLanguage = await this.languageRepository.findById(id);
            if (!currentLanguage) {
              throw new ForbiddenException({ message: 'invalid language' });
            }
            await this.languageMemberRepository.create({
                language: currentLanguage,
                user: newUser,
                level: level,
                experience: experience
            },manager)
          }
        }
        
        // let listPositioin: PositionM[] = [];
        if (positions && positions.length > 0) {
          for (const id of positions) {
            const currentPosition = await this.positionRepository.findById(id);
            if (!currentPosition) {
              throw new ForbiddenException({ message: 'invalid position' });
            }
            // listPositioin.push(currentPosition);
            await this.positionMemberRepository.create(
              {
                postion: currentPosition,
                user:newUser
              },
              manager,
            );
          }
        }
        return profile;
        
      } catch (error) {
    
        throw new ForbiddenException({ message: error });
      }
    });
  }
}
