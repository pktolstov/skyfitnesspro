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
