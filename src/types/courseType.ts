export interface CourseType {
  _id: string;
  nameRU: string;
  nameEN: string;
  description: string;
  directions: string[];
  fitting: string[];
  difficulty: string;
  order: number;
  durationInDays: number;
  dailyDurationInMinutes: {
    from: number;
    to: number;
  };
  workouts: string[];
}

export type ExerciseType = {
  _id?: string;
  name: string;
  quantity: number;
};

export interface WorkoutType {
  _id: string;
  name: string;
  video: string;
  exercises?: ExerciseType[];
}




// export type ProgressDataType = {
//     courseId: string;
//     workouts?: {
//       workoutId: string;
//       workoutCompleted: boolean;
//     }[];
//   };


//   export type ProgressDataType = {
//     [courseId: string]: {
//       workouts?: {
//         workoutId: string;
//         workoutCompleted: boolean;
//       }[];
//       progress: number; // процент прогресса
//     };
//   };


export type CourseProgressEntry = {
    workouts?: {
      workoutId: string;
      workoutCompleted: boolean;
    }[];
    progress: number; // процент выполнения всего курса
  };

// export type CourseProgressEntry = {
//     workouts?: {
//       workoutId: string;
//       workoutCompleted: boolean;
//     }[];
//     progress: number // процент выполнения
//   };
  
  export type ProgressDataType = {
    [courseId: string]: CourseProgressEntry;
  };

  export type ApiResponseCourseProgressType = {
    courseId: string;
    courseCompleted?: boolean;
    workoutsProgress?: {
      workoutId: string;
      workoutCompleted: boolean;
      progressData: number[];
    }[];
  };