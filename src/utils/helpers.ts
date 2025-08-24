import { CourseCardType } from '@/types/courseCard';
import { CourseType, ApiResponseCourseProgressType } from '@/types/courseType';

type Course = CourseCardType;

export function filterCoursesByIds(courses: Course[], ids: string[]): Course[] {
  return courses.filter((course) => ids.includes(course._id));
}

export function splitTitleSubtitle(str: string): {
  title: string;
  subtitle: string;
} {
  const cleanStr = str.trim();

  // Определяем разделитель
  let delimiter = '/';
  if (cleanStr.includes('.')) {
    delimiter = '.';
  } else if (cleanStr.includes('/')) {
    delimiter = '/';
  }

  // Разбиваем и чистим
  const parts = cleanStr
    .split(delimiter)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    title: parts[0] || '',
    subtitle: parts.slice(1, 3).join(` ${delimiter} `) || '',
  };
}

// Примеры
// console.log(splitTitleSubtitle("Утренняя практика / Йога на каждый день / 1 день / Алексей Казубский"));
// { title: "Утренняя практика", subtitle: "Йога на каждый день / 1 день" }

// console.log(splitTitleSubtitle("Тема 1. Основы йоги. Введение. Алексей"));
// { title: "Тема 1", subtitle: "Основы йоги. Введение" }

export function cutWorkoutName(str: string, maxLength: number = 30): string {
  const cleanStr = str.trim();

  // Проверяем наличие разделителей
  const dotIndex = cleanStr.indexOf('.');
  const slashIndex = cleanStr.indexOf('/');
  const spaceIndex = cleanStr.indexOf(' ');

  // Выбираем минимальный индекс (первый встретившийся разделитель)
  let delimiterIndex = -1;
  if (dotIndex !== -1) delimiterIndex = dotIndex;
  if (
    slashIndex !== -1 &&
    (delimiterIndex === -1 || slashIndex < delimiterIndex)
  )
    delimiterIndex = slashIndex;
  if (
    spaceIndex !== -1 &&
    (delimiterIndex === -1 || spaceIndex < delimiterIndex)
  )
    delimiterIndex = spaceIndex;

  // Если нашли разделитель — возвращаем часть до него
  if (delimiterIndex !== -1) {
    return cleanStr.substring(0, delimiterIndex).trim();
  }

  // Если строка слишком длинная — обрезаем до maxLength и добавляем "..."
  if (cleanStr.length > maxLength) {
    return cleanStr.substring(0, maxLength) + '...';
  }

  // Если ничего не подошло — возвращаем исходную строку
  return cleanStr;
}

// export const calculateCourseProgress = (
//     courseId: string,
//     allCourses: CourseType[],
//     apiData?: ProgressDataType
//   ): number => {
//     // Находим курс
//     const course = allCourses.find(course => course._id === courseId);
//     if (!course || !course.workouts || course.workouts.length === 0) return 0;

//     const totalWorkouts = course.workouts.length;

//     // Проверяем, есть ли данные прогресса для этого курса
//     const courseProgress = apiData?.[courseId];
//     if (!courseProgress?.workouts || courseProgress.workouts.length === 0) return 0;

//     // Считаем количество завершённых
//     const completedCount = courseProgress.workouts.filter(w => w.workoutCompleted).length;

//     // Вычисляем прогресс
//     return Math.round((completedCount / totalWorkouts) * 100);
//   };

export type ApiCourseProgress = {
  courseId: string;
  workouts?: {
    workoutId: string;
    workoutCompleted: boolean;
  }[];
};

// helpers.ts
// export function calculateCourseProgress(
//     courseId: string,
//     allCourses: CourseType[],
//     apiProgress: { workouts?: { workoutId: string; workoutCompleted: boolean }[] }
//   ): number {
//     const course = allCourses.find(c => c._id === courseId);
//     if (!course || !course.workouts?.length) return 0;

//     const totalWorkouts = course.workouts.length;
//     const completedWorkouts = apiProgress.workouts?.filter(w => w.workoutCompleted).length ?? 0;

//     return Math.round((completedWorkouts / totalWorkouts) * 100);
//   }

export const calculateCourseProgress = (
  courseId: string,
  allCourses: CourseType[],
  apiData?: ApiResponseCourseProgressType,
): number => {
  const course = allCourses.find((c) => c._id === courseId);
  if (!course || !course.workouts || course.workouts.length === 0) return 0;

  const totalWorkouts = course.workouts.length;

  const completedCount =
    apiData?.workoutsProgress?.filter((w) => w.workoutCompleted).length ?? 0;

  return Math.round((completedCount / totalWorkouts) * 100);
};

//   export const calculateCourseProgress = (
//     courseId: string,
//     allCourses: CourseType[],
//     apiData?: ProgressDataType
//   ): number => {
//     // Находим курс
//     const course = allCourses.find(course => course._id === courseId);
//     if (!course || !course.workouts || course.workouts.length === 0) return 0;

//     const totalWorkouts = course.workouts.length;

//     // Если API не вернуло список прогресса, возвращаем 0%
//     if (!apiData?.workouts || apiData.workouts.length === 0) return 0;

//     // Считаем количество завершённых
//     const completedCount = apiData.workouts.filter(w => w.workoutCompleted).length;

//     // Вычисляем прогресс
//     return Math.round((completedCount / totalWorkouts) * 100);
//   };
