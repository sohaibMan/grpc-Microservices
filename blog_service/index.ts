import path from "path";
import {
  Server,
  loadPackageDefinition,
  ServerCredentials,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const PROTO_PATH = path.join(__dirname, "/protos/blog.proto");

const packageDefinition = loadSync(PROTO_PATH);

const protoDescriptor = loadPackageDefinition(packageDefinition);

// The protoDescriptor object has the full package hierarchy

const BlogService = protoDescriptor.BlogService;

const server = new Server();

const CreateBlog = (call: any, callback: any) => {
  const blog = call.request;
  console.log("Received blog: ", blog);

  callback(null, {
    blog: {
      id: "123",
      authorId: blog.authorId,
      title: blog.title,
      content: blog.content,
    },
  });
};
server.addService(BlogService, {
  CreateBlog,
});
server.bindAsync("0.0.0.0:50051", ServerCredentials.createInsecure(), () => {
  server.start();
});
