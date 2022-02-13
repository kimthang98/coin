import { NotFoundException } from '@nestjs/common';
import { Repository, ObjectLiteral, getManager } from 'typeorm';
import { IS_ACTIVE } from '../common/constants';
import { Entity, IPagination, IPaginationOptions, Pagination } from '../type/index.type';
import { HashService } from './hash/hash.service';

export class BaseService extends HashService {
  public repository: Repository<any>;
  public entity: any;
  public alias = 'alias';
  constructor() {
    super();
  }

  async findOneOrFail(
    options?: ObjectLiteral,
    select?: string[] | null,
    message?: string,
  ): Promise<Entity> {
    message = message || 'Not Found';
    const data = await this.repository.findOne({
      where: {
        ...options,
        is_active: IS_ACTIVE.ACTIVE,
      },
      select,
    });
    if (!data) throw new NotFoundException(message);
    return data;
  }

  async findByIdOrFail(id: number, select?: string[] | null, message?: string): Promise<Entity> {
    message = message || 'Not Found';
    const data = await this.repository.findOne({
      where: {
        id: id,
        is_active: IS_ACTIVE.ACTIVE,
      },
      select,
    });
    if (!data) throw new NotFoundException(message);
    return data;
  }

  async findAll(options?: ObjectLiteral, select?: string[]): Promise<Entity[]> {
    return await this.repository.find({
      where: {
        ...options,
        is_active: IS_ACTIVE.ACTIVE,
      },
      select,
      order: {
        id: 'DESC',
      },
    });
  }

  async findAllPaging(
    paging: IPaginationOptions,
    options?: ObjectLiteral,
    select?: string[],
  ): Promise<[Entity[], IPagination]> {
    const [data, count] = await this.repository.findAndCount({
      where: {
        ...options,
        is_active: IS_ACTIVE.ACTIVE,
      },
      select,
      skip: (paging.page - 1) * paging.limit,
      take: paging.limit,
      order: {
        id: 'DESC',
      },
    });
    const pagination: Pagination = {
      limit: Number(paging.limit),
      page: Number(paging.page),
      total: count,
    };

    return [data, pagination];
  }

  async create(data: ObjectLiteral): Promise<Entity> {
    const manager = getManager();
    const item = await this.repository.create(data);
    const result = await manager.save(this.entity, item);
    return result;
  }

  async findOne(options?: ObjectLiteral, select?: string[]): Promise<Entity | undefined> {
    return await this.repository.findOne({
      where: {
        ...options,
        is_active: IS_ACTIVE.ACTIVE,
      },
      select,
    });
  }

  async findById(id: number, select?: string[]): Promise<Entity | undefined> {
    return await this.repository.findOne({
      where: {
        id: id,
        is_active: IS_ACTIVE.ACTIVE,
      },
      select,
    });
  }

  async findByIds(id: number[], select?: string[]): Promise<Entity[]> {
    return await this.repository.findByIds(id, { select });
  }

  async update(id: number, data: ObjectLiteral): Promise<{ success: boolean }> {
    const item = await this.findByIdOrFail(id);
    data.is_active = IS_ACTIVE.ACTIVE;
    const manager = getManager();
    await manager.save(this.entity, { ...item, ...data });
    return { success: true };
  }

  async delete(id: number): Promise<{ success: boolean }> {
    const item = await this.findByIdOrFail(id);
    const manager = getManager();
    await manager.save(this.entity, {
      ...item,
      is_active: IS_ACTIVE.ACTIVE,
    });
    return { success: true };
  }

  async updateOrCreate(attributes: ObjectLiteral, data: ObjectLiteral): Promise<Entity> {
    let options = {
      ...attributes,
      is_active: IS_ACTIVE.ACTIVE,
    };
    const datacheck = await this.findOne(options);
    if (!datacheck) return await this.create(data);
    return datacheck;
  }
}
