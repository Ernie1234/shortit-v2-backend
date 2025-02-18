/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';

const ShortenedUrlSchema = new mongoose.Schema(
  {
    customName: {
      type: String,
      unique: true,
      sparse: true,
      minlength: 5,
    },
    shortUrl: {
      type: String,
      unique: true,
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export default mongoose.model('Url', ShortenedUrlSchema);
