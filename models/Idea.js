import mongoose from "mongoose"; //Idea 係class,要大寫
const {Schema} = mongoose;

const IdeaSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,//可將2個table combain埋一齊
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    // timestamp: {
    //     type: Date,
    //     default: Date.now,
    // },
}, /*{timestamps:true}時間*/ );
const Idea = mongoose.model("ideas",IdeaSchema);
export default Idea;