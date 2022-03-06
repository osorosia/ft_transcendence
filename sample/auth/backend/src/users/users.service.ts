import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> { 
    return this.usersRepository.find();
  }

  createUser(firstName: string, lastName: string) {
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.isActive = true;
    // this.usersRepository.insert(newUser);
    this.usersRepository.save(newUser);
    return newUser.id;
  }

  findOne(id: string): Promise<User> { //今回は使ってない
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> { //今回は使ってない
    await this.usersRepository.delete(id);
  }
}
