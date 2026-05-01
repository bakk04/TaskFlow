// app/projects/[id]/page.tsx

interface Project { id: string; name: string; color: string; }

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params;
    const API_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const res = await fetch(`${API_URL}/api/projects/${id}`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return <div style={{ padding: '2rem' }}>Projet non trouvé</div>;
    }

    const project: Project = await res.json();

    return (
        <div style={{ padding: '2rem' }}>
            <h1>
        <span style={{
            display: 'inline-block', width: 16, height: 16,
            borderRadius: '50%', background: project.color, marginRight: 8
        }} />
                {project.name}
            </h1>
            <p>ID : {project.id}</p>
            <a href="/dashboard">← Retour au Dashboard</a>
        </div>
    );
}