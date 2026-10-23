
import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller.js';
import { EnrollmentService } from './enrollment.service.js';
import { CourseModule } from '../course/course.module.js';

@Module({
  imports: [CourseModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}

