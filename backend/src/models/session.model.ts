import mongoose from "mongoose";
import { thirtyDaysFromNow } from "../utils/date";

export interface SessionDcoument extends mongoose.Document {    
    userId: mongoose.Types.ObjectId;
    userAgent?: string;
    createdAt: Date;
    expiresAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDcoument>({
    userId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        index: true,
    },
    userAgent: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, required: true, default: thirtyDaysFromNow },
});

const SessionModel = mongoose.model<SessionDcoument>("Session", sessionSchema);
export default SessionModel;
