export const getDocs = jest.fn(() =>  {
    console.log('probando getDocs')
    return Promise.resolve([])
});
export const query = jest.fn({});
export const where = jest.fn({});
export const collection = jest.fn({});