import mongoose from "mongoose";
const staffPermissionSchema = new mongoose.Schema(
    {
        staffId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        create:{type:Boolean,default:false},
        view:{type:Boolean,default:false},
        edit:{type:Boolean,default:false},
        del:{type:Boolean,default:false}
    },
    {timestamps:true}
);

const StaffPermissions = mongoose.model("StaffPermissions",staffPermissionSchema)
export default StaffPermissions