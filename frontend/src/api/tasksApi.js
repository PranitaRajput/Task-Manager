const BASE_URL = "http://localhost:5000/api/tasks";

export const getTasks = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const createTask = async (taskData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  return response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
