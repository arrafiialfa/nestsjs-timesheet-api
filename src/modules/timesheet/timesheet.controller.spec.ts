import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { Timesheet } from 'src/entities/timesheet.entity';
import { Request } from 'express';

describe('TimesheetController', () => {
  let timesheetController: TimesheetController;
  let timesheetRepository: DeepMocked<Repository<Timesheet>>

  const mockRequestObject = () => {
    return createMock<Request>({
      headers: {
        authorization: 'Bearer MJOCKEDBEARERTOKENSTRING'
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimesheetController],
      providers: [TimesheetService, {
        provide: 'TIMESHEET_REPOSITORY',
        useValue: createMock<Repository<Timesheet>>()
      }],
    }).compile();

    timesheetController = module.get<TimesheetController>(TimesheetController);
    timesheetRepository = module.get('TIMESHEET_REPOSITORY');
  });

  it('should be defined', () => {
    expect(timesheetController).toBeDefined();
  });

  it('should return new timeshet', () => {
    (timesheetRepository.findOneBy as jest.Mock).mockResolvedValue({ period: '2022-11' })
    expect(timesheetController.create({
      site_inspector_id: 1,
      checker_2_id: 2,
      period: '2022-11'
    }, mockRequestObject()))
  })
});
