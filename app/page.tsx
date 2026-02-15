import { redirect } from 'next/navigation';

export default function HomePage() {
  // هذا السطر سيقوم بتحويل الزائر فوراً إلى مسار /login
  redirect('/login');
}