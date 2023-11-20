import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetService } from './timesheet.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { Timesheet } from 'src/entities/timesheet.entity';
import { UsersService } from '../users/users.service';
import { DataSource, DeleteResult } from 'typeorm';

describe('TimesheetService', () => {
  let timesheetService: TimesheetService;
  let datasource: DataSource;
  const newTimesheet: CreateTimesheetDto = {
    site_inspector_id: 1,
    checker_2_id: 2,
    period: "2090-12"
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule],
      providers: [
        TimesheetService, UsersService,
        {
          provide: 'TIMESHEET_REPOSITORY',
          useFactory: (dataSource: DataSource) => dataSource.getRepository(Timesheet),
          inject: ['DATA_SOURCE'],
        },
      ],
    }).compile();
    timesheetService = module.get(TimesheetService);
    datasource = module.get('DATA_SOURCE');
  });

  afterEach(async () => {
    await datasource.destroy()
  })

  it('should create a new Timesheet', async () => {
    const userId = 2;
    await expect(timesheetService.create(newTimesheet, userId)).resolves.toBeInstanceOf(Timesheet)
  })

  it('should delete test timesheet', async () => {
    await expect(timesheetService.delete({ period: "2090-12" })).resolves.toBeInstanceOf(DeleteResult)
  })
});
