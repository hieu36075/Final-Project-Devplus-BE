import { Roles } from '@/application/common/decorator/roles.decorator';
import { Role } from '@/application/common/enums/role.enum';
import { JwtAuthGuard } from '@/application/common/guards/jwtAuth.guard';
import { RolesGuard } from '@/application/common/guards/role.guard';
import { PageOptionsDto } from '@/application/dto/pagination/paginationOptions';
import { CreateUserDTO } from '@/application/dto/user/create-user.dto';
import { GetEmployeeDTO } from '@/application/dto/user/get-employee.dto';
import { CreateAccountCommand } from '@/application/use-case/user/command/createUser/create-account.command';
import { GetAllProfileEmployeeQuery } from '@/application/use-case/user/queries/getAllEmployee/get-all-employee.command';
import { GetAllUserQuery } from '@/application/use-case/user/queries/getAllUser/get-all-user.command';
import { GetAllUserOptionQuery } from '@/application/use-case/user/queries/getAllUserOption/get-all-user-option.command';
import { ProfileM } from '@/domain/model/profile.model';
import { UserM } from '@/domain/model/user.model';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

@Controller('user')
@ApiTags('User')
// @ApiBearerAuth('JWT-auth')
// @Roles(Role.EMPLOYEE)
// @UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(@Query() pageOptionsDto: PageOptionsDto): Promise<ProfileM> {
    return await this.queryBus.execute(new GetAllUserOptionQuery(pageOptionsDto));
  }

  @Get('get-user')
  async getAllUser(): Promise<ProfileM> {
    return await this.queryBus.execute(new GetAllUserQuery());
  }

  // @Get('get-user')
  // async getAllProfile(): Promise:<ProfileM[]>{
  //   return await this.queryBus.execute(new)
  // }


  @Get('get-employee')
  async getEmployee(@Query() getEmployeeDto: GetEmployeeDTO): Promise<ProfileM>{
    const query = plainToClass(GetAllProfileEmployeeQuery, getEmployeeDto)
    return await this.queryBus.execute(query)
  }
  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<any> {
    return await this.commandBus.execute(
      new CreateAccountCommand(
        createUserDTO.email,
        createUserDTO.userName,
        createUserDTO.password,
        createUserDTO.fullName,
        createUserDTO.dayOfBirth,
        createUserDTO.description,
        createUserDTO.skills,
        createUserDTO.positions,
      ),
    );
  }
}
