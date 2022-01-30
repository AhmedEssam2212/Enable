import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { Department } from 'src/department/entities/department.entity';
import { MESSAGES, REGEX } from 'src/service.utill';

export class RegisterUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
    password: string;

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
    confirmPassword: string;

    department: Department;
}