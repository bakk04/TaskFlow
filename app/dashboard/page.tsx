import { prisma } from '@/lib/prisma';
import AddProjectForm from './AddProjectForm';
import { deleteProject, renameProject } from '../actions/projects';

export default async function DashboardPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>{projects.length} projets</p>
      <AddProjectForm />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map((p) => (
          <li key={p.id} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
            <span style={{
              display: 'inline-block', width: 12, height: 12,
              borderRadius: '50%', background: p.color
            }} />
            <a href={`/projects/${p.id}`} style={{ flex: 1, fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>{p.name}</a>

            {/* Formulaire Renommer */}
            <form action={renameProject} style={{ display: 'flex', gap: 4 }}>
              <input type="hidden" name="id" value={p.id} />
              <input type="hidden" name="color" value={p.color} />
              <input name="newName" placeholder="Nouveau nom" required style={{ padding: '2px 4px', fontSize: '0.8rem' }} />
              <button type="submit" style={{ fontSize: '0.8rem', cursor: 'pointer' }}>Rename</button>
            </form>

            {/* Formulaire Supprimer */}
            <form action={deleteProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />
              <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
                🗑️
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
