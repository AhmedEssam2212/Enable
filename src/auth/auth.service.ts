import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        const isMatch = await bcrypt.compare(pass, user.password);
        if (user && isMatch) {
            return user;
        }
        return null;
    }
    async login(user: any) {
        console.log("#######" + user);
        const existedUser = await this.userService.findByUsername(user.username);
        const payload = { username: existedUser.username, sub: existedUser.username };
        const res = await this.jwtService.sign(payload);
        return {
            access_token: res
        };
    }
}