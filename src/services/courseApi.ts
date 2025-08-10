import { BASE_URL } from "@/constants";
import axios from 'axios';
import { CourseCardData } from "@/types/courseCard";


export const getCourses = async (): Promise<CourseCardData[]> => {
    try {
      const res = await axios.get(BASE_URL + '/courses');
      return res.data;
    } catch (error) {
      console.error('Ошибка при загрузке курсов:', error);
      return [];
    }
  };