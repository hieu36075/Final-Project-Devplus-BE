import { CreatePositionDTO } from "@/application/dto/position/create-position.dto";
import { UpdatePostionDTO } from "@/application/dto/position/update-postiion.dto";
import { CreateTechnicalDTO } from "@/application/dto/technical/create-technical.dto";
import { UpdateTechnicalDTO } from "@/application/dto/technical/update-technical.dto";
import { CreateTechnicalCommand } from "@/application/use-case/technical/command/create-technical/create-technical.command";
import { DeleteTechnicalCommand } from "@/application/use-case/technical/command/delete-technical/delete-technical.command";
import { UpdateTechnicalCommand } from "@/application/use-case/technical/command/update-technical/update-technical.command";
import { GetAllTechnicalQuery } from "@/application/use-case/technical/queries/get-all-technical/get-all-technical.command";
import { PositionM } from "@/domain/model/position.model";
import { TechnicalM } from "@/domain/model/technical.model";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

@Controller('technical')
@ApiTags('Technical')
export class TechnicalController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){
        
    }

    @Get()
    findAll():Promise<TechnicalM[]>{
        return this.queryBus.execute(new GetAllTechnicalQuery())
    }

    @Get(':id')
    findById(@Query('id') id:string):Promise<TechnicalM>{
        return
    }

    @Post()
    create(@Body() createTechnicalDTO : CreateTechnicalDTO): Promise<TechnicalM>{
        return this.commandBus.execute(new CreateTechnicalCommand(createTechnicalDTO.name))
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updateTechnicalDTO : UpdateTechnicalDTO): Promise<PositionM | undefined>{
        return this.commandBus.execute(new UpdateTechnicalCommand(id, updateTechnicalDTO.name))
    }

    @Delete(':id')
    delete(@Param('id') id:string):Promise<void>{
        return this.commandBus.execute(new DeleteTechnicalCommand(id))
    }

}