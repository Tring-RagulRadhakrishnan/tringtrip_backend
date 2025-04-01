const pool = require("../../config/database");

const bookingsResolver = {
  Mutation: {
    addBooking: async (
      _,
      { package_id, booking_date, count, total_price, user_id, email }
    ) => {
      try {
        const response = await pool.query(
          "Insert into bookings(package_id,booking_date,count,total_price,user_id) values ($1,$2,$3,$4,$5) returning *",
          [package_id, booking_date, count, total_price, user_id]
        );
        if (response.rowCount === 0) {
          throw new Error("Bookings is not Added");
        }
        return "Booking Confirmed";
      } catch (err) {
        console.log("error log from booking resolver", err);
      }
    },
  },
  Query: {
    getBookingByUser: async (_, { user_id }) => {
        console.log(user_id);
        
      try {
        console.log(user_id);
        
        const response = await pool.query(
          `select 
          bp.booking_id,
          bp.package_id, 
          bp.booking_date, 
          bp.count, 
          bp.total_price, 
          bp.user_id,
          p.package_img, 
          p.title, 
          p.days, 
          p.visit_place, 
          p.price, 
          p.location
        from bookings bp
        join packages p ON bp.package_id = p.package_id
        where bp.user_id = $1`,
          [user_id]
        );
        if(response.rowCount===0){
            throw new Error("No Booking is there");
        }
        return response.rows
      } catch (err) {
        console.log("error log from booking resolver query", err);
      }
    },
  },
};

module.exports = bookingsResolver;
