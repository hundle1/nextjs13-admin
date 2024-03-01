import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, nickname } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!nickname) {
      return new NextResponse("Nick Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    const actor = await prismadb.actor.create({
      data: {
        name,
        nickname,
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(actor);
  } catch (error) {
    console.log('[ACTORS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const actors = await prismadb.actor.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(actors);
  } catch (error) {
    console.log('[ACTORS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
