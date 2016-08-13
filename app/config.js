// export default {
//   secret: '27346509814e81634570876198345',
// };

import dotenv from 'dotenv';
dotenv.config({ silent: true });

export default {
  secret: process.env.API_SECRET,
};
