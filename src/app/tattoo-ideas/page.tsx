import { redirect } from 'next/navigation';

// Redirect old /tattoo-ideas to new /tattoo-ideas/hub
export default function TattooIdeasRedirect() {
  redirect('/tattoo-ideas/hub');
}