// user.js
export default [
    {
      url: '/api/createUser',
      method: 'post',
      response: ({ body }) => {
        return {
          code: 0,
          message: 'ok',
          data: null,
        }
      },
    },
]