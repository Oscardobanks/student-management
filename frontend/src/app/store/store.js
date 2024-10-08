import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  student: null,
  students: [],
  status: "idle",
};

export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
  const response = await axios.get(
    "http://127.0.0.1:5000/student"
  );
  return response.data;
});

export const fetchStudent = createAsyncThunk("students/fetchStudent", async (id) => {
  const response = await axios.get(
    `http://127.0.0.1:5000/student/${id}`
  );
  return response.data;
});

export const createStudent = createAsyncThunk("students/createStudent", async (student) => {
  const response = await axios.post("http://127.0.0.1:5000/student", student);
  return response.data;
});

export const updateStudent = createAsyncThunk("students/updateStudent", async (student) => {
  const response = await axios.put(`http://127.0.0.1:5000/student/${student.id}`, student);
  return response.data;
});

export const deleteStudent = createAsyncThunk("students/deleteStudent", async (id) => {
  await axios.delete(`http://127.0.0.1:5000/student/${id}`);
  return id;
});

const studentsSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetStudent: (state) => {
      state.student = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchStudents.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.students = action.payload;
    })
    .addCase(fetchStudents.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(fetchStudent.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchStudent.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.student = action.payload;
    })
    .addCase(fetchStudent.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(createStudent.pending, (state) => {
      state.status = "loading";
    })
    .addCase(createStudent.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.students.push(action.payload);
    })
    .addCase(createStudent.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(updateStudent.pending, (state) => {
      state.status = "loading";
    })
    .addCase(updateStudent.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.student = action.payload;
    })
    .addCase(updateStudent.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(deleteStudent.pending, (state) => {
      state.status = "loading";
    })
    .addCase(deleteStudent.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.students = state.students.filter((student) => student.id !== action.payload);
    })
    .addCase(deleteStudent.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { resetStudent } =
  studentsSlice.actions;
export default studentsSlice.reducer;

export const store = configureStore({
  reducer: {
    students: studentsSlice.reducer,
  },
});

export const getStudentData = (state) => state.students;
store.dispatch(fetchStudents());
