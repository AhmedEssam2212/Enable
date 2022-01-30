import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { Role } from "src/auth/enumurarions/roles.enum";
import { MESSAGES, REGEX } from "src/service.utill";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    firstName: string;
    lastName: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
    password: string;
    role: Role;
}
