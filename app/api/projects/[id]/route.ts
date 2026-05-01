import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { projects } = readDB();
  const project = projects.find((p: any) => p.id === id);
  
  if (!project) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
  
  return NextResponse.json(project);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const db = readDB();
  const index = db.projects.findIndex((p: any) => p.id === id);
  
  if (index === -1) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
  
  db.projects[index] = { ...db.projects[index], ...body };
  writeDB(db);
  
  return NextResponse.json(db.projects[index]);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const body = await request.json();
    const db = readDB();
    const index = db.projects.findIndex((p: any) => p.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
    }
    
    db.projects[index] = { ...db.projects[index], name: body.name, color: body.color };
    writeDB(db);
    
    return NextResponse.json(db.projects[index]);
  }

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = readDB();
  const index = db.projects.findIndex((p: any) => p.id === id);
  
  if (index === -1) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }
  
  db.projects.splice(index, 1);
  writeDB(db);
  
  return new Response(null, { status: 204 });
}
