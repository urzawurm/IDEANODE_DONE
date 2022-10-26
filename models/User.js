import mongoose, {mongo} from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    cart: {
        type: Schema.Types.Mixed,
        default: {
            date: {
                type:Date,
                default: Date.now
            }
        },
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avatar:{
        data: {type: Buffer},
        contentType: {type: String},
    },
    isAdmin: {
        type: Boolean,
        required:true,
        default: false
    }
}, {
    minimize: false
});

const User = mongoose.model("users",UserSchema);
export default User;