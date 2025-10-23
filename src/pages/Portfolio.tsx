import { ProjectVault } from '@/components/ProjectVault';
import { CyberCursor } from '@/components/CyberCursor';

export const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <CyberCursor />
      <ProjectVault />
    </div>
  );
};

export default Portfolio;
