import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/user.schema';
import { SETTINGS } from 'src/service.utill';
import { RegisterUserDto } from './dto/register-user.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/enumurarions/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { SearchUserDto } from './dto/search-user.dto';
import { Types } from 'mongoose';
import { AssignUserDto } from './dto/assign-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private authService: AuthService) { }


  @Post('/register')
  async register(@Body(SETTINGS.VALIDATION_PIPE) registerUserDto: RegisterUserDto): Promise<User> {
    return await this.userService.register(registerUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req);
  }

  //@Roles(Role.SUPER_ADMIN, Role.DEPARTMENT_MANAGER)
  //@UseGuards(RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //@Roles(Role.SUPER_ADMIN, Role.DEPARTMENT_MANAGER)
  //@UseGuards(AuthGuard("jwt"))
  //  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/search')
  search(@Query() searchUserDto: SearchUserDto) {
    return this.userService.searchUsers(searchUserDto);
  }

  @Get('/search/byDepartment')
  searchByDepartment(@Query() searchUserDto: SearchUserDto) {
    return this.userService.searchUsersByDepartment(searchUserDto);
  }

  @Get('/byDepartment/:departmentId')
  findByDepatment(@Param("departmentId") departmentId: Types.ObjectId) {
    return this.userService.findByDepartmentId(departmentId);
  }

  @Post("/assign")
  assignToDepartment(@Body() assignUserDto: AssignUserDto) {
    return this.userService.assignToDepartment(assignUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Number) {
    return this.userService.delete(+id);
  }

}


