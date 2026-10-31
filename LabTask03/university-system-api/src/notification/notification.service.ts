
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { EnrollmentService as EnrollmentServiceRef } from '../enrollment/enrollment.service.js';
import type { EnrollmentService } from '../enrollment/enrollment.service.js';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(forwardRef(() => EnrollmentServiceRef))
    private readonly enrollmentService: EnrollmentService,
  ) {}

  sendNotification(studentName: string, message: string) {
    return {
      message: 'Notification sent successfully',
      student: studentName,
      notification: message,
    };
  }

  checkEnrollmentAndNotify(studentName: string, courseId: string) {
    const enrollments = this.enrollmentService.getEnrollments();

    const notification = this.sendNotification(
      studentName,
      `Enrollment check completed for course ${courseId}`,
    );

    return {
      message: 'Enrollment check completed',
      student: studentName,
      courseId,
      enrollments,
      notification,
    };
  }
}


