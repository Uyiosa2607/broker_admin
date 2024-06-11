import { prisma } from "@/auth";

export async function PUT(request: any, { params }: any) {
  const { id } = params;

  //Finds the user to promote with the submited id
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
  if (user) {
    //If the user is found then try to update the admin property of the user object
    try {
      const promoteAdmin = await prisma.users.update({
        where: {
          id: id,
        },
        data: {
          admin: true,
        },
      });

      //If the update operation was successfull sends a response back to the frontend
      if (promoteAdmin) {
        return Response.json({
          success: "user has been promoted to admin",
          status: 200,
        });
      } else {
        //Sends error message back if the operation is not successfull
        return Response.json({ eror: "something went wrong", status: 500 });
      }
    } catch (error: any) {
      console.log(error);
    }
  } else {
    return Response.json({ error: "something went wrong", status: 200 });
  }
}
