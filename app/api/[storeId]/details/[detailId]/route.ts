import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { detailId: string } }
) {
  try {
    if (!params.detailId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const detail = await prismadb.detail.findUnique({
      where: {
        id: params.detailId
      }
    });
  
    return NextResponse.json(detail);
  } catch (error) {
    console.log('[DETAIL_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { detailId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.detailId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const detail = await prismadb.detail.delete({
      where: {
        id: params.detailId
      }
    });
  
    return NextResponse.json(detail);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { detailId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Tên không được để trống", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Phải nhập thông tin", { status: 400 });
    }


    if (!params.detailId) {
      return new NextResponse("Detail id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const detail = await prismadb.detail.update({
      where: {
        id: params.detailId
      },
      data: {
        name,
        info,
      }
    });
  
    return NextResponse.json(detail);
  } catch (error) {
    console.log('[SIZE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
