export const addRecord = (data) => ({
    type: "ADD_RECORD",
    data
  });

export const addChecked = (data) => ({
  type: "ADD_CHECKED",
  data
});
  
export const delData = (data) => ({
  type: "DELETE",
  data
})

export const delMore = (data) => ({
  type: "DELETE_MORE",
  data
})