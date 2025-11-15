import baseApi from "@/redux/api/baseApi";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1️⃣ Get all tasks
    getTasks: builder.query({
      query: () => ({
        url: "/tasks",
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),
    // 2️⃣ Get task details by ID
    getTaskById: builder.query({
      query: (id: string) => ({
        url: `/tasks/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Tasks", id }],
    }),
    // 3️⃣ Create a new task (with categories + files)
    createTask: builder.mutation({
      query: (formData: FormData) => ({
        url: "/tasks",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Tasks"],
    }),
    // 4️⃣ Update task title by ID
    updateTask: builder.mutation({
      query: ({
        id,
        data,
      }: {
        id: string;
        data: { title: string; points: number };
      }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Tasks",
        { type: "Tasks", id },
      ],
    }),
    // 5️⃣ Update a task category (with optional image)

    updateTaskCategory: builder.mutation({
      query: ({
        categoryId,
        formData,
      }: {
        categoryId: string;
        formData: FormData;
      }) => ({
        url: `/task-categories/${categoryId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Tasks"],
    }),
    // 6️⃣ Create categories by task (with multiple files)

    addNewTaskCategory: builder.mutation({
      query: (formData: FormData) => ({
        url: "/task-categories",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id: string) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTaskCategory: builder.mutation({
      query: (categoryId: string) => ({
        url: `/tasks/category/${categoryId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskCategoryMutation,
  useUpdateTaskMutation,
  useAddNewTaskCategoryMutation,
  useDeleteTaskMutation,
  useDeleteTaskCategoryMutation,
} = taskApi;
