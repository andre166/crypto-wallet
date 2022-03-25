import mysql from "mysql";

const connection = function () {
  // if( process.env.PORT ){
  //   return mysql.createConnection({
  //     host: 'us-cdbr-east-03.cleardb.com',
  //     user: 'b97c762eb0f2e1',
  //     password: '773ba10f',
  //     database: 'heroku_a82159af2db8704',
  //   })
  // }else{
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "crypto-wallet",
  });
  // }
};

export default connection;
