const pool = require("../../config/database");

const bookingsResolver = {
  Mutation: {
    addBooking: async (_, {package_id,booking_date,count,total_price,user_id,email}) => {
        try{
            const response = await pool.query("Insert into bookings(package_id,booking_date,count,total_price,user_id) values ($1,$2,$3,$4,$5) returning *")
        }catch(err){
            console.log("error log from booking resolver",err);
            
        }
    },
  },
};
