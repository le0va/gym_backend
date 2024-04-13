import { IsNumber, IsOptional, IsString } from "class-validator";

export default class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsNumber()
    @IsOptional()
    room?: number;
}