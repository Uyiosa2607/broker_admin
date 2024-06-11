import { prisma } from "@/auth";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { dataId } = await request.json();
    const userId = params.id;

    // Find the user who is making the request
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    // Find the account to delete
    const accountToDelete = await prisma.users.findUnique({
      where: { id: dataId },
    });

    // Check if the user is trying to delete their own account
    if (user?.id === accountToDelete?.id) {
      // Allow users to delete their own account
      await prisma.users.delete({
        where: { id: dataId },
      });
      return Response.json({ success: "Account deleted", status: 200 });
    }

    // Ensure the requesting user is an admin
    if (!user?.admin) {
      return Response.json({
        error: "Only admins can delete other users",
        status: 500,
      });
    }

    // Prevent deletion of another admin
    if (accountToDelete?.admin) {
      return Response.json({
        error: "Admins cannot delete other admin accounts",
        status: 403,
      });
    }

    // Proceed to delete the user account
    await prisma.users.delete({
      where: { id: dataId },
    });

    return Response.json({ success: "Account deleted", status: 200 });
  } catch (error) {
    console.error("Error deleting account:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", status: 500 }),
      { status: 500 }
    );
  }
}
