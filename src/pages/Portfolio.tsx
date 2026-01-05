import { ProjectVault } from '@/components/ProjectVault';
import { CyberCursor } from '@/components/CyberCursor';
import InternshipTimeline from '@/components/InternshipTimeline';

export const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <CyberCursor />
      <ProjectVault />

      <section className="px-6 lg:px-12 py-12">
        <h2 className="font-mono text-2xl mb-6" style={{ color: '#00FFC2' }}>
          Internship Experience
        </h2>
        <InternshipTimeline />
      </section>
    </div>
  );
};

export default Portfolio;
