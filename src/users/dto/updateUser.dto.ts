import { IsNumber, IsOptional, IsString } from "class-validator";

export default class UpdateUserDto {
    
    @IsNumber()
    @IsOptional()
    hostel?: number;

    @IsNumber()
    @IsOptional()
    room?: number;

    @IsOptional()
    @IsString()
    name?: string;
}