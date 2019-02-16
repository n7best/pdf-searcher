import mongoose from "mongoose";
import httpStatus from "http-status";
import { omitBy, isNil } from "lodash";
import bcrypt from "bcryptjs";
import moment from "moment-timezone";
import jwt from "jwt-simple";

import { jwtSecret, jwtExpirationInterval } from "../../config/vars";
import { APIError } from "../errors";

/**
 * User Roles
 */
const roles = ["patient", "doctor", "admin"];

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128
    },
    age: Number,
    phone: String,
    mailAddress: {
      address: String,
      city: String,
      state: String,
      zip: String
    },
    name: {
      type: String,
      maxlength: 128,
      trim: true
    },
    role: {
      type: String,
      enum: roles,
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) return next();

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  transform() {
    const transformed = {};
    const fields = ["_id", "name", "role", "age", "phone", "mailAddress"];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  token() {
    const playload = {
      exp: moment()
        .add(jwtExpirationInterval, "minutes")
        .unix(),
      iat: moment().unix(),
      sub: this._id
    };
    return jwt.encode(playload, jwtSecret);
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  }
});

userSchema.statics = {
  roles,

  async get(id) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      throw new APIError({
        message: "User does not exist",
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },

  async findAndGenerateToken(options) {
    const { email, password } = options;
    if (!email)
      throw new APIError({
        message: "An email is required to generate a token"
      });

    const user = await this.findOne({ email }).exec();
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true
    };

    if (password) {
      if (user && (await user.passwordMatches(password))) {
        return { user, accessToken: user.token() };
      }
      err.message = "Incorrect email or password";
    } else {
      err.message = "Incorrect email or refreshToken";
    }
    throw new APIError(err);
  },

  list({ page = 1, perPage = 30, name, email, role, phone, age, mailAddress }) {
    const options = omitBy(
      { name, email, role, phone, age, mailAddress },
      isNil
    );

    if (typeof options.name !== "undefined") {
      options.name = { $regex: options.name, $options: "i" };
    }

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  checkDuplicateEmail(error) {
    if (error.name === "MongoError" && error.code === 11000) {
      return new APIError({
        message: "Validation Error",
        errors: [
          {
            field: "email",
            location: "body",
            messages: ['"email" already exists']
          }
        ],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack
      });
    }
    return error;
  }
};

export default mongoose.model("User", userSchema);
