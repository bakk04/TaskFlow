import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id: Number(id) }
  });
  
  if (!project) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
  
  return NextResponse.json(project);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { name, color } = await request.json();
  
  try {
    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: { name, color }
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    await prisma.project.delete({
      where: { id: Number(id) }
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
}
