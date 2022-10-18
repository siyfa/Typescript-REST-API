import mongoose from 'mongoose';
import mongooose from 'mongoose';
import { UserDocument } from './user.model';

export interface sessionDocument extends mongoose.Document {
    user: UserDocument["_id"],
    valid: boolean,
    userAgent: string,
    createdAt: Date,
    updatedAt: Date,
} 

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    valid: {
        types: Boolean,
        default: false
    },
    userAgent: {
        type: String
    }
},
{
  timestamps: true,
}
)

const Session = mongoose.model<sessionDocument>('Session',sessionSchema);

export default Session;