import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetService } from './timesheet.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { TimesheetToExcelModule } from '../timesheet-to-excel/timesheet-to-excel.module';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { Timesheet } from 'src/entities/timesheet.entity';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

describe('TimesheetService', () => {
  let timesheetService: TimesheetService;
  let userService: DeepMocked<UsersService>;

  const dto: CreateTimesheetDto = {
    site_inspector_id: 1,
    checker_2_id: 2,
    period: "2022-12"
  }
  const adminId = 2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule, JwtModule, AuthModule, TimesheetToExcelModule],
      providers: [TimesheetService, {
        provide: UsersService,
        useValue: createMock<UsersService>(),
      }],
    }).compile();
    timesheetService = module.get<TimesheetService>(TimesheetService);

    userService = module.get(UsersService);
    //mock usersService.findOne to return :
    const mockedResolvedUser = {
      id: 23,
      name: 'tstname',
      email: 'test3@gmail.com',
      password: '$2a$10$KkWrvWRrItS7qO8to2uai./zZizI5Wblk2nXWDfERB7Bn2CJxtlpO',
      role: {
        name: "checker_2"
      }
    };
    (userService.findOne as jest.Mock).mockResolvedValue(mockedResolvedUser);
  });


  it('should be defined', () => {
    expect(TimesheetService).toBeDefined();
  });

  it('should create a new Timesheet', async () => {
    const newTimesheet = await timesheetService.create(dto, adminId)
    expect(newTimesheet).resolves.toEqual(Timesheet)
  })

  it('should returns not found exception when provided with invalid period', async () => {
    const newTimesheet = await timesheetService.create({ ...dto, period: "" }, adminId)
    expect(newTimesheet).resolves.toThrow(NotFoundException)
  })

  it('should return error when provided with invalid site_inspector_id', async () => {
    const newTimesheet = await timesheetService.create({ ...dto, site_inspector_id: 0 }, adminId)
    expect(newTimesheet).resolves.toThrowError()
  })

  it('should return error when provided with invalid checker_2_id', async () => {
    const newTimesheet = await timesheetService.create({ ...dto, checker_2_id: 0 }, adminId)
    expect(newTimesheet).resolves.toThrowError()
  })
});
