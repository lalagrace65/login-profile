import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import {User} from "@/models/User";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session.user.email;
  //const {_id, name, image, ...otherUserInfo} = data;

  if('name' in data){
    //update username

    const user = await User.updateOne({email}, {name:data.name});
  }

//   const user = await User.findOne(filter);
//   await User.updateOne(filter, {name, image});
//   await UserInfo.findOneAndUpdate({email:user.email}, otherUserInfo, {upsert:true});

  return Response.json(true);
}

// export async function GET(req) {
//   mongoose.connect(process.env.MONGO_URL);

//   const url = new URL(req.url);
//   const _id = url.searchParams.get('_id');

//   let filterUser = {};
//   if (_id) {
//     filterUser = {_id};
//   } else {
//     const session = await getServerSession(authOptions);
//     const email = session?.user?.email;
//     if (!email) {
//       return Response.json({});
//     }
//     filterUser = {email};
//   }

//   const user = await User.findOne(filterUser).lean();
//   const userInfo = await UserInfo.findOne({email:user.email}).lean();

//   return Response.json({...user, ...userInfo});

// }