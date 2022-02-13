import { Command, Error, Info, IOption } from './Command';
import * as fse from 'fs-extra';
import * as fs from 'fs';
import * as path from 'path';
import { isNil } from 'lodash';

export class CreateModule extends Command {
  signature(): string {
    return 'create:module <command>';
  }

  description(): string {
    return 'Create new module';
  }

  options(): IOption[] {
    return [{ key: 'override?', description: 'Override existing file' }];
  }

  async handle(command: string, options: { override: undefined | string }): Promise<any> {
    if (isNil(command) || command === '') {
      Error('Command name is required');
    }
    const name = command.charAt(0).toUpperCase() + command.slice(1);
    const fileModule = path.resolve(
      __dirname,
      `../../components/${command}`,
      `${command}.module.ts`,
    );
    const fileDto = path.resolve(__dirname, `../../components/${command}`, `${command}.dto.ts`);
    const fileController = path.resolve(
      __dirname,
      `../../components/${command}/controller`,
      `${command}.controller.ts`,
    );
    const fileControllerSpec = path.resolve(
      __dirname,
      `../../components/${command}/controller`,
      `${command}.controller.spec.ts`,
    );
    const fileService = path.resolve(
      __dirname,
      `../../components/${command}/service`,
      `${command}.service.ts`,
    );
    const fileServiceSpec = path.resolve(
      __dirname,
      `../../components/${command}/service`,
      `${command}.service.spec.ts`,
    );

    const fileRepositories = path.resolve(
      __dirname,
      `../../components/${command}/repositories`,
      `${command}.repositories.ts`,
    );

    const fileEntities = path.resolve(
      __dirname,
      `../../components/${command}/entities`,
      `${command}.entity.ts`,
    );
    const fileTransformer = path.resolve(
      __dirname,
      `../../components/${command}/transformer`,
      `${command}.transformer.ts`,
    );

    if (
      fs.existsSync(fileModule) &&
      (options.override === undefined || options.override.toString() !== 'true')
    ) {
      Error(`${command} already exist`);
    }
    const contentModule = `
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ${name}Controller } from './controller/${command}.controller';
import { ${name}Service } from './service/${command}.service';
import { ${name} } from './entities/${command}.entity';
@Module({
    imports: [TypeOrmModule.forFeature([${name}]), ConfigModule],
    providers: [${name}Service],
    controllers: [${name}Controller],
})
export class ${name}Module {}
    
    `;
    const contentDto = `
import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty } from 'class-validator';
export class ${name}Params {}
    
    `;
    const contentController = `
import {  Controller } from '@nestjs/common';
import { ApiHeader ,ApiTags } from '@nestjs/swagger';
import { ${name}Service } from '../service/${command}.service';
import { ApiResponseService } from '../../../shared/api-response/api-response.service';


@ApiTags('${name}')
@ApiHeader({
    name: 'Content-Type',
    description: 'application/json',
})
@Controller('/${command}')
export class ${name}Controller {
constructor(private response: ApiResponseService, private ${command}Service: ${name}Service) {}
}
    `;

    const contentControllerSpec = `
import { Test, TestingModule } from '@nestjs/testing';
import { ${name}Controller } from './${command}.controller';
    
describe('${name}Controller', () => {
  let controller: ${name}Controller;
    
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [${name}Controller],
  }).compile();
    
  controller = module.get<${name}Controller>(${name}Controller);
  });
    
  it('should be defined', () => {
  expect(controller).toBeDefined();
  });
});
    `;

    const contentService = `
import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { BaseService } from '../../../../src/shared/services/base.service';
import { ${name} } from '../entities/${command}.entity';
import { ${name}Repository } from '../repositories/${command}.repositories';
    
@Injectable()
export class ${name}Service extends BaseService {
    public repository: Repository<any>;
    public entity: any = ${name};
    constructor(private connection: Connection) {
    super();
    this.repository = this.connection.getCustomRepository(${name}Repository);
    }
}
    `;

    const contentServiceSpec = `
import { Test, TestingModule } from '@nestjs/testing';
import { ${name}Service } from './${command}.service';
    
describe('${name}Service', () => {
    let service: ${name}Service;
    
    beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [${name}Service],
    }).compile();
    
    service = module.get<${name}Service>(${name}Service);
    });
    
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
        `;

    const contentRepository = `
import { EntityRepository, Repository } from 'typeorm';
import { ${name} } from '../entities/${command}.entity';
    
@EntityRepository(${name})
export class ${name}Repository extends Repository<${name}> {}
        `;

    const contentEntitie = `
import { Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn, 
} from 'typeorm';
import { IS_ACTIVE } from './../../../shared/constants/connstants';
@Entity({ name: '${name.toLowerCase()}' })
export class ${name} {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    default: IS_ACTIVE.ACTIVE,
  })
  is_active: number;
  @Column({
    nullable: true,
  })
  create_by: number;
  @Column({
    nullable: true,
  })
  update_by: number;
  @Column({
    nullable: true,
  })
  delete_by: number;
  @CreateDateColumn()
  public created_at: Date;
  @UpdateDateColumn()
  public updated_at: Date;
  @DeleteDateColumn({
    nullable: true,
  })
  public deleted_at: Date;
}
        `;

    const contentTransformer = `
import { Transformer } from '../../../../src/shared/transformers/transformers';
import { ${name} } from '../entities/${command}.entity';
    
export class ${name}Transformer extends Transformer {
  transform(model: ${name}): any {
    return model;
    }
}
            `;

    fse.outputFileSync(fileTransformer, contentTransformer);
    fse.outputFileSync(fileControllerSpec, contentControllerSpec);
    fse.outputFileSync(fileDto, contentDto);
    fse.outputFileSync(fileModule, contentModule);
    fse.outputFileSync(fileController, contentController);
    fse.outputFileSync(fileService, contentService);
    fse.outputFileSync(fileServiceSpec, contentServiceSpec);
    fse.outputFileSync(fileRepositories, contentRepository);
    fse.outputFileSync(fileEntities, contentEntitie);
    fse.outputFileSync(fileEntities, contentEntitie);
    Info(`module ${name} is created`);

    return fileModule;
  }
}
