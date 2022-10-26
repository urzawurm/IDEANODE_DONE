import mongoose from "mongoose"; //schema: save data大綱
const {Schema} = mongoose;

const purchaseRecordSchema = new Schema({
    userId: {
      type: String,
      required:true,
    },
    userName: {
      type: String,
      required: true,
    },
    userAddress: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.Types.Mixed,
      required: true,
    }, 
    qty:{
        type: Schema.Types.Mixed,
        required:true
    },
    price: {
      type: Schema.Types.Mixed,
      required: true
    },
    shipMethod: {
      type: Number,
      required: true
    },
    finalFee: {
      type: Number,
      required: true,
    },
    // type: {
    //   type: Number,
    //   required: true,
    // },
    productName: {
      type: Schema.Types.Mixed,
      required: true,
    },
    date: { //加入日期記錄
        type: Date,
        default: Date.now,
    },
});
const purchaseRecord = mongoose.model("purchaseRecords", purchaseRecordSchema); //search mongodb db.carts.find()
export default purchaseRecord;