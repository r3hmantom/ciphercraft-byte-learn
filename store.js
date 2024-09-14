// store.js (or store.ts for TypeScript)
import create from "zustand";

const useStore = create((set) => ({
  courseId: null,
  lessonId: null,
  setCourseId: (id) => set({ courseId: id }),
  setLessonId: (id) => set({ lessonId: id }),
}));

export const useCourseInfo = create((set) => ({
  courseInfo: null,
  setCourseInfo: (info) => set({ courseInfo: info }),
  lessonId: null,
  setLessonId: (id) => set({ lessonId: id }),
}));
