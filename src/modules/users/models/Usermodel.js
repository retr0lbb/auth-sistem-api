import * as mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    pass: {type: String, required: true},
    birth: {type: Date, required: true}
})

UserSchema.index({ email: 1 }, { unique: true });
const userSchema = mongoose.model('User', UserSchema); 
export default userSchema 