import { CourseCardType } from '@/types/courseCard';

type Course = CourseCardType;

export function filterCoursesByIds(courses: Course[], ids: string[]): Course[] {
  return courses.filter((course) => ids.includes(course._id));
}

export function splitTitleSubtitle(str:string): { title: string; subtitle: string } {
    const cleanStr = str.trim();
  
    // Определяем разделитель
    let delimiter = '/';
    if (cleanStr.includes('.')) {
      delimiter = '.';
    } else if (cleanStr.includes('/')) {
      delimiter = '/';
    }
  
    // Разбиваем и чистим
    const parts = cleanStr.split(delimiter)
      .map(p => p.trim())
      .filter(Boolean);
  
    return {
      title: parts[0] || '',
      subtitle: parts.slice(1, 3).join(` ${delimiter} `) || ''
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
    if (slashIndex !== -1 && (delimiterIndex === -1 || slashIndex < delimiterIndex)) delimiterIndex = slashIndex;
    if (spaceIndex !== -1 && (delimiterIndex === -1 || spaceIndex < delimiterIndex)) delimiterIndex = spaceIndex;

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
  
  