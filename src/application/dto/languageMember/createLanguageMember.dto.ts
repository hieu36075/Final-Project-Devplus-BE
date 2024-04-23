import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLanguageMemberDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userId:string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    level?:string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    experience?:string

}