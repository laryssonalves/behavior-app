import { Student } from '../models/student'
import { api } from './api'

export default class StudentService {
  private static instance: StudentService

  private studentUrl = 'student/'

  constructor() { }

  public static getInstance(): StudentService {
    if (!StudentService.instance) {
      StudentService.instance = new StudentService()
    }
    return StudentService.instance
  }

  async getStudents(query: string): Promise<Student[]> {
    const params = query ? { name: query } : {}
    const response = await api.get<Student[]>(this.studentUrl, { params })

    return response.data.map(student => Student.createFromJSON(student))
  }

  async addStudent(student: Student): Promise<Student> {
    const response = await api.post<Student>(this.studentUrl, student.getPayload())
    return Student.createFromJSON(response.data)
  }
}

