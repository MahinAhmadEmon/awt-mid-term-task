import { Injectable } from '@nestjs/common';
import type {} from 'multer';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

@Injectable()
export class CourseService {

  // GET /course
  getAllCourses() {
    return {
      message: 'All courses fetched successfully',
      data: [],
    };
  }

  // GET /course/:id
  getCourseById(id: string) {
    return {
      message: 'Course fetched successfully',
      id: id,
    };
  }

  // POST /course
  createCourse(dto: CreateCourseDto) {
    return {
      message: 'Course created successfully',
      data: dto,
    };
  }

  // PUT /course/:id
  updateCourse(id: string, dto: UpdateCourseDto) {
    return {
      message: 'Course updated successfully',
      id: id,
      data: dto,
    };
  }

  // PATCH /course/:id
  patchCourse(id: string, dto: UpdateCourseDto) {
    return {
      message: 'Course patched successfully',
      id: id,
      updatedFields: Object.keys(dto),
    };
  }

  // DELETE /course/:id
  deleteCourse(id: string) {
    return {
      message: 'Course deleted successfully',
      id: id,
    };
  }

  // POST /course/:id/upload
  uploadCourseMaterial(id: string, file: Express.Multer.File) {
  return {
    message: 'Material uploaded successfully',
    courseId: id,
    filename: file.filename,
    path: file.path.replace(/\\/g, '/'),
  };
}
}


