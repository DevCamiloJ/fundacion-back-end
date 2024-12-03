import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Member } from './entities/member.entity';
import { CreateMemberDto, UpdateMemberDto } from './dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const newMember = this.membersRepository.create(createMemberDto);
    return this.membersRepository.save(newMember);
  }

  findAll(): Promise<Member[]> {
    return this.membersRepository.find({ where: { estado: true } });
  }

  async findOneById(id: string): Promise<Member> {
    const member = await this.membersRepository.findOne({ where: { id }, withDeleted: true });
    if (!member) throw new NotFoundException(`Miembro con ID ${id} no encontrado`);
    return member;
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member = await this.findOneById(id);
    const newUser = this.membersRepository.create({ ...member, ...updateMemberDto });
    return this.membersRepository.save(newUser);
  }

  async inactivateMember(id: string): Promise<void> {
    await this.membersRepository.update(id, { estado: false });
  }
}
