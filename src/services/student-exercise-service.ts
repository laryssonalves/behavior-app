import { api } from '../shared/services/api'

import { StudentExercise } from '../entities/student'

const studentUrl = 'student/'

const getStudentExercises = async (studentId: number): Promise<StudentExercise[]> => {
  const response = await api.get<StudentExercise[]>(
    `${studentUrl}${studentId}/exercise/`
  )

  return response.data.map(
    studentExercise => new StudentExercise(studentExercise)
  )
}

export { getStudentExercises }
