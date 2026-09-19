import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — InkPreview',
  description: 'Get in touch with the InkPreview team. Contact us for support, feedback, partnership inquiries, or DMCA claims.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Contact Us</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>We&apos;d Love to Hear From You</h2>
        <p>
          Whether you have a question about our features, need help with your account, 
          or want to explore partnership opportunities, our team is ready to help.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Email Us</h2>
        <ul>
          <li><strong>General Support:</strong> <a href="mailto:support@inkpreview.co">support@inkpreview.co</a> — Account issues, billing questions, feature requests</li>
          <li><strong>DMCA / Copyright:</strong> <a href="mailto:dmca@inkpreview.co">dmca@inkpreview.co</a> — Report copyright infringement or takedown requests</li>
          <li><strong>Privacy:</strong> <a href="mailto:privacy@inkpreview.co">privacy@inkpreview.co</a> — Data privacy inquiries and GDPR/CCPA requests</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Response Time</h2>
        <p>
          We aim to respond to all inquiries within 48 hours during business days. 
          For urgent matters, please include &quot;URGENT&quot; in your subject line.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Business Hours</h2>
        <p>
          Our team operates Monday through Friday, 9:00 AM to 6:00 PM (UTC-5, Eastern Time). 
          Messages received outside business hours will be addressed the next business day.
        </p>
      </section>

      <section>
        <h2>Mailing Address</h2>
        <p>
          InkPreview<br />
          For postal inquiries, please contact us via email first at <a href="mailto:support@inkpreview.co">support@inkpreview.co</a>.
        </p>
      </section>
    </main>
  );
}