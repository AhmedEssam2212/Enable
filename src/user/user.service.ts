import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { SearchUserDto } from './dto/search-user.dto';
import { use } from 'passport';
import { Types } from 'mongoose';
import { AssignUserDto } from './dto/assign-user.dto';


@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const user = new User();
    const hashedPassword = await encryptPassword(registerUserDto.password);
    user.username = registerUserDto.username;
    user.email = registerUserDto.email;
    user.password = hashedPassword;
    user.firstName = registerUserDto.firstName;
    user.lastName = registerUserDto.lastName;
    return await this.userRepository.create(user);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await encryptPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    return await this.userRepository.create(createUserDto);
  }

  async searchUsers(searchUserDto: SearchUserDto): Promise<User[]> {
    let users = await this.userRepository.findAll();
    if (Object.keys(searchUserDto).length) {
      return this.fillterUser(searchUserDto, users);
    }
    return users;
  }

  async searchUsersByDepartment(searchUserDto: SearchUserDto): Promise<User[]> {
    let users = await this.userRepository.findByDepartmentId(searchUserDto.departmentId);
    if (Object.keys(searchUserDto).length) {
      return this.fillterUser(searchUserDto, users);
    }
    return users;
  }

  fillterUser(searchUserDto: SearchUserDto, users: User[]): User[] {
    const { username, email, role, departmentId } = searchUserDto;
    if (username || email || role || departmentId) {
      users = users.filter(user =>
        user.username.includes(username) ||
        user.email.includes(email) ||
        user.role.includes(role) ||
        user.departmentId.toString().includes(departmentId.toString())
      );
    }
    return users;
  }

  async findByDepartmentId(departmentId: Types.ObjectId): Promise<User[]> {
    return await this.userRepository.findByDepartmentId(departmentId);
  }

  async assignToDepartment(assignUserDto: AssignUserDto): Promise<User> {
    let user = await this.userRepository.findById(+assignUserDto.userId);
    if (Object.keys(user).length) {
      user.departmentId = assignUserDto.departmentId;
      this.userRepository.update(+assignUserDto.userId, user)
      return user;
    }
    else
      throw new BadRequestException("User Not Found By this department Id");
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    return await this.userRepository.findById(id);
  }

  async findByUsername(username: string) {
    return await this.userRepository.findByUsername(username);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
async function encryptPassword(password: string) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}



