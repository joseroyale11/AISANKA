import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {StudentProfile} from '../../types/StudentProfile';

interface StudentState {
  currentStudent: StudentProfile | null;
}

const initialState: StudentState = {
  currentStudent: null,
};

const studentSlice = createSlice({
  name: 'student',

  initialState,

  reducers: {

    setStudent: (
      state,
      action: PayloadAction<StudentProfile>,
    ) => {

      state.currentStudent = action.payload;

    },

    unlockNextLevel: (
      state,
      action: PayloadAction<number>,
    ) => {

      if (!state.currentStudent) {
        return;
      }

      const nextLevel = action.payload;

      if (
        !state.currentStudent.unlockedLevels.includes(
          nextLevel,
        )
      ) {

        state.currentStudent.unlockedLevels.push(
          nextLevel,
        );

      }

      state.currentStudent.currentLevel =
        nextLevel;

    },

  },
});

export const {
  setStudent,
  unlockNextLevel,
} = studentSlice.actions;

export default studentSlice.reducer;