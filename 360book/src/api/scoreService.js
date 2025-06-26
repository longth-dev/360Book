let scoreList = []; // bộ nhớ tạm

export const submitScore = async (school, major, score) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItem = { school, major, score };
      scoreList.push(newItem); // thêm vào danh sách
      resolve({ success: true });
    }, 500);
  });
};

export const fetchScores = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(scoreList);
    }, 500);
  });
};
