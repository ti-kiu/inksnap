import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About InkPreview — Our Mission & Team',
  description: 'Learn about InkPreview, the AI-powered tattoo preview platform helping people see tattoos on their body before committing. Founded by tattoo technology enthusiasts.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>About InkPreview</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>Our Mission</h2>
        <p>
          InkPreview was created to solve a simple problem: <strong>tattoos are permanent, but regret doesn&apos;t have to be</strong>. 
          We believe everyone deserves to see exactly how a tattoo will look on their own body before making a lifelong commitment.
        </p>
        <p>
          Our AI-powered simulator lets you upload a photo, choose a design, and see a realistic preview in seconds — 
          no appointments, no pressure, no cost for your first three previews.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Why We Built This</h2>
        <p>
          According to <a href="https://www.pewresearch.org/short-reads/2023/08/22/about-a-third-of-us-adults-have-a-tattoo/" target="_blank" rel="noopener noreferrer">Pew Research (2023)</a>, 
          32% of American adults have at least one tattoo. But studies also show that up to 24% of people experience some level of tattoo regret.
        </p>
        <p>
          The gap between excitement and regret often comes down to one thing: <em>not knowing what the tattoo would actually look like on your skin</em>. 
          InkPreview bridges that gap with AI technology that maps designs onto your unique body shape, skin tone, and chosen placement.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>How It Works</h2>
        <ol>
          <li><strong>Upload your photo</strong> — Take a clear photo of the body area where you want the tattoo.</li>
          <li><strong>Choose a design</strong> — Browse our gallery of 480+ designs across 20 styles, or upload your own.</li>
          <li><strong>Preview instantly</strong> — Our AI adjusts the design to match your skin, perspective, and lighting.</li>
        </ol>
        <p>
          Results are for reference — always consult a licensed tattoo artist for the final design. 
          But seeing the preview first helps you make a more confident decision.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Our Technology</h2>
        <p>
          InkPreview uses advanced image generation and compositing AI to create realistic tattoo previews. 
          Our system considers:
        </p>
        <ul>
          <li>Skin tone and texture matching</li>
          <li>Body contour and perspective adjustment</li>
          <li>Lighting and shadow simulation</li>
          <li>Design scaling for different body placements</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Get In Touch</h2>
        <p>
          Have questions, feedback, or partnership inquiries? We&apos;d love to hear from you.
        </p>
        <ul>
          <li><strong>General inquiries:</strong> <a href="mailto:support@inkpreview.co">support@inkpreview.co</a></li>
          <li><strong>DMCA / Copyright:</strong> <a href="mailto:dmca@inkpreview.co">dmca@inkpreview.co</a></li>
          <li><strong>Privacy concerns:</strong> <a href="mailto:privacy@inkpreview.co">privacy@inkpreview.co</a></li>
        </ul>
      </section>

      <section>
        <h2>Legal</h2>
        <p>
          InkPreview is operated from the United States. For details on how we handle your data, 
          please see our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.
        </p>
      </section>
    </main>
  );
}