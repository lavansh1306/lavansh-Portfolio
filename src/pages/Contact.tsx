import { ContactForm } from '@/components/ContactForm';
import { CyberCursor } from '@/components/CyberCursor';

export const Contact = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CyberCursor />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      <ContactForm />
    </div>
  );
};

export default Contact;
