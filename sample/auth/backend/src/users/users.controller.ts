import {
    Body,
    Controller,
    Get,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true }))
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Get()
    getUsers() {
        return this.service.findAll();
    }
    
    @Post()
    addUser(@Body() createUserDto: CreateUserDto) {
        const { firstName, lastName } = createUserDto;
        return this.service.createUser(firstName, lastName);
    }
}
