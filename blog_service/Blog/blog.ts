import prisma from "../lib/prisma";

class Blog {
  // private postId: number;
  // private authorId: number;
  // private title: string;
  // private content: string;
  // private name: string;

  // constructor({postId, title, content, authorId, name}: {
  //     postId: number,
  //     title: string,
  //     content: string,
  //     authorId: number,
  //     name: string
  // }) {
  //     this.postId = postId;
  //     this.title = title;
  //     this.content = content;
  //     this.authorId = authorId;
  //     this.name = name;
  // }

  static async create({
    title,
    content,
    authorId,
    name,
  }: {
    title: string;
    content: string;
    authorId: number;
    name: string;
  }) {
    return prisma.blog.create({
      data: {
        title,
        content,
        authorId,
        name,
      },
    });
  }

  static edit({
    postId,
    title,
    content,
    authorId,
    name,
  }: {
    postId: number;
    title: string;
    content: string;
    authorId: number;
    name: string;
  }) {
    return prisma.blog.update({
      where: { id: postId },
      data: {
        title: title,
        content: content,
        authorId: authorId,
        name: name,
      },
    });
  }

  static delete({ authorId, id }: { authorId: number; id: number }) {
    return prisma.blog.delete({
      where: { id, authorId },
    });
  }

  static list({ authorId, id }: { authorId: number; id: number }) {
    return prisma.blog.findMany({
      where: { id, authorId },
    });
  }

  static get({ authorId, id }: { authorId: number; id: number }) {
    return prisma.blog.findUnique({
      where: { id, authorId },
    });
  }

  static async listAll() {
    return prisma.blog.findMany();
  }
}

export default Blog;
