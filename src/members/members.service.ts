import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Member } from './entities/member.entity';
import { CreateMemberDto, UpdateMemberDto } from './dto';
import { InterestTopicService } from 'src/interest-topic/interest-topic.service';
import { DisabilityService } from 'src/disability/disability.service';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
    private readonly interestTopicService: InterestTopicService,
    private readonly disabilityService: DisabilityService
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const { areasInteres, discapacidades, ...memvberData } = createMemberDto;

    const areasInteresEntities = await this.interestTopicService.findByIds(areasInteres);
    const discapacidadesEntities = await this.disabilityService.findByIds(discapacidades);

    const newMember = this.membersRepository.create({
      ...memvberData,
      areasInteres: areasInteresEntities,
      discapacidades: discapacidadesEntities,
    });
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

    // Actualizar áreas de interés y discapacidades solo si están presentes en el DTO
    const areasInteresEntities = updateMemberDto.areasInteres
      ? await this.interestTopicService.findByIds(updateMemberDto.areasInteres)
      : member.areasInteres;

    const discapacidadesEntities = updateMemberDto.discapacidades
      ? await this.disabilityService.findByIds(updateMemberDto.discapacidades)
      : member.discapacidades;

    // Creamos el nuevo objeto de miembro con los datos antiguos y los datos actualizados
    const updatedMember = this.membersRepository.create({
      ...member,
      ...updateMemberDto,
      areasInteres: areasInteresEntities,
      discapacidades: discapacidadesEntities,
    });

    return this.membersRepository.save(updatedMember);
  }

  async inactivateMember(id: string): Promise<void> {
    await this.membersRepository.update(id, { estado: false });
  }
}
