import mongoose from "mongoose";
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const dbConnection =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"foodapp",
        family:4,
})
.then(()=>{
    console.log("connection to database successfully");
}).catch(err=>{
    console.log(`some err occured while connecting to database ${err}`);
})
}
export default dbConnection; 