export const getDocs = () =>
  Promise.resolve([
    {
      data: () => ({
        notestitle: "test",
        description: "investigacion",
        author: "tcb@example.com",
      }),
    },
  ]);
console.log("entrando a la fn getDoc");
export const query = jest.fn({});
export const where = jest.fn({});
export const collection = jest.fn({});
