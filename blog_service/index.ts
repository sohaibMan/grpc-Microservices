import path from "path";
import {
  Server,
  loadPackageDefinition,
  ServerCredentials,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import Blog from "./Blog/blog";
import prisma from "./lib/prisma";

const PROTO_PATH = path.join(__dirname, "/protos/blog.proto");

const packageDefinition = loadSync(PROTO_PATH);

const protoDescriptor = loadPackageDefinition(packageDefinition);

// async function main() {
//   const res = await prisma.user.create({
//     data: {
//       id: 1,
//       password: "123",
//       email: "souhaibemanah@gmail.com",
//       name: "khalid",
//     },
//   });
//   console.log(res);
// }
// main();

// The protoDescriptor object has the full package hierarchy

const blogPackage: any = protoDescriptor.blog;
const server = new Server();

const CreateBlog = async (call: any, callback: any) => {
  const { blog } = call.request;
  await Blog.create(blog);
  callback(null, {
    blog,
  });
};
server.addService(blogPackage.BlogService.service, {
  CreateBlog,
});
server.bindAsync("0.0.0.0:8080", ServerCredentials.createInsecure(), () => {
  server.start();
});
