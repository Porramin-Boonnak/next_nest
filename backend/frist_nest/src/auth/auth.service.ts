import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}  
  async create(email: string, password: string) {
    const newPost = this.usersRepository.create({ email, password });
    return await this.usersRepository.save(newPost);
  }
  async login(email: string,password:string) {
    if(await this.usersRepository.findOne({ where: { email,password } }))
      {
        return 1;
      };
    return 0;
  }
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ email });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
}
