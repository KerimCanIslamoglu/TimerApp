import { API_URL } from './constans';

export const getDataFromApi = () => {
  return fetch(API_URL)
    .then((data) => data.json())
    .then((data) => data);
};

export const addTaskToApi = (task) => {
  return fetch(API_URL, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
};

export const deleteTaskFromApi = (taskId) => {
  return fetch(`${API_URL}/${taskId}`, {
    method: 'delete',
    body: null
  });
};

