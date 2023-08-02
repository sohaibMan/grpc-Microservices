import path from "path";
import {
  Server,
  loadPackageDefinition,
  ServerCredentials,
  ServerUnaryCall,
  sendUnaryData,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import Blog from "./Blog/blog";
import { BlogRequest, BlogResponse } from "./types/types";
import { Status } from "@grpc/grpc-js/build/src/constants";

const PROTO_PATH = path.join(__dirname, "/protos/blog.proto");

const packageDefinition = loadSync(PROTO_PATH);

const protoDescriptor = loadPackageDefinition(packageDefinition);

const blogPackage: any = protoDescriptor.blog;
const server = new Server();

const CreateBlog = async (
  call: ServerUnaryCall<BlogRequest, BlogResponse>,
  callback: sendUnaryData<BlogResponse>,
) => {
  let { blog } = call.request;

  if (!blog || !blog.title || !blog.content || !blog.authorId || !blog.name) {
    callback({
      code: Status.INVALID_ARGUMENT,
      message: "Missing required fields",
    });
    return;
  }
  const BlogResult = await Blog.create(blog);

  callback(null, {
    blog: BlogResult,
  });
};
server.addService(blogPackage.BlogService.service, {
  CreateBlog,
});
server.bindAsync("0.0.0.0:8080", ServerCredentials.createInsecure(), () => {
  server.start();
});
