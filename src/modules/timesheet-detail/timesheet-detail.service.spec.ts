import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetDetailService } from './timesheet-detail.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { TimesheetDetail } from 'src/entities/timesheet_detail.entity';
import { ScopeOfWorkService } from '../scope-of-work/scope-of-work.service';
import { FilesService } from '../files/files.service';
import { ProjectService } from '../project/project.service';
import { Project } from 'src/entities/project.entity';
import { ScopeOfWork } from 'src/entities/scope_of_work.entity';
import { TimesheetService } from '../timesheet/timesheet.service';
import { Weather } from 'src/enums';
import { NotFoundException } from '@nestjs/common';

describe('TimesheetDetailService', () => {
  let timesheetDetailService: TimesheetDetailService;
  let timesheetService: DeepMocked<TimesheetService>;
  let projectRepository: DeepMocked<Repository<Project>>
  let scopeOfWorkRepository: DeepMocked<Repository<ScopeOfWork>>
  const testDto = {
    scope_of_work_id: 0,
    project_id: 0,
    weather: Weather.Cloudy,
    manpower_qty: 0,
    date: new Date(),
    clock_in: '09:00',
    clock_out: '09:00',
    files: []
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimesheetDetailService, ProjectService, ScopeOfWorkService, FilesService,
        {
          provide: 'TIMESHEET_DETAIL_REPOSITORY',
          useValue: createMock<Repository<TimesheetDetail>>()
        },
        {
          provide: 'PROJECT_REPOSITORY',
          useValue: createMock<Repository<Project>>()
        },
        {
          provide: 'SCOPE_OF_WORK_REPOSITORY',
          useValue: createMock<Repository<ScopeOfWork>>()
        },
        {
          provide: TimesheetService,
          useValue: createMock<TimesheetService>()
        }
      ],
    }).compile();

    timesheetDetailService = module.get<TimesheetDetailService>(TimesheetDetailService);
    timesheetService = module.get(TimesheetService);
    projectRepository = module.get('PROJECT_REPOSITORY');
    scopeOfWorkRepository = module.get('SCOPE_OF_WORK_REPOSITORY');

  });

  it('should be defined', () => {
    expect(timesheetDetailService).toBeDefined();
  });

  it('should return value of 1 given clock_in : 09:00 and clock_out : 17:00', () => {
    expect(timesheetDetailService.calculateValue('09:00', '17:00')).toEqual(1);
  })

  it('should return NotFoundException when project isnt found', async () => {
    (timesheetService.findOne as jest.Mock).mockResolvedValue({ period: '2023-12' });
    projectRepository.findOneBy.mockResolvedValue(null);
    (scopeOfWorkRepository.findOneBy as jest.Mock).mockResolvedValue({ name: 'test' });

    const timesheet = await timesheetService.findOne(1);


    await expect(timesheetDetailService.create(testDto, timesheet)).rejects.toThrow(NotFoundException)

  })

  it('should return NotFoundException when scope of work isnt found', async () => {
    (timesheetService.findOne as jest.Mock).mockResolvedValue({ period: '2023-12' });
    (projectRepository.findOneBy as jest.Mock).mockResolvedValue({ name: 'test' });
    scopeOfWorkRepository.findOneBy.mockResolvedValue(null);

    const timesheet = await timesheetService.findOne(1);

    await expect(timesheetDetailService.create(testDto, timesheet)).rejects.toThrow(NotFoundException)

  })



});
