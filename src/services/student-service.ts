import { api } from "../shared/services/api";

import { Student } from "../models/student";

const studentUrl = 'student/'

const getStudents = async (query: string): Promise<Student[]> => {
  const params = query ? { name: query } : {}
  const response = await api.get<Student[]>(studentUrl, { params })

  return response.data.map(student => Student.createFromJSON(student))
}

const addStudent = async (student: Student): Promise<Student> => {
  const response = await api.post<Student>(studentUrl, student.getPayload())
  return Student.createFromJSON(response.data)
}

const editStudent = async (student: Student): Promise<Student> => {
  const response = await api.put<Student>(`${studentUrl}${student.id}`, student.getPayload())
  return Student.createFromJSON(response.data)
}


export { getStudents, addStudent, editStudent }