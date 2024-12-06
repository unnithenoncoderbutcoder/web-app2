import { Suspense } from 'react';
import { TournamentList } from '@/components/tournament/tournament-list';
import { TournamentSkeleton } from '@/components/tournament/tournament-skeleton';

export default function TournamentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Tournaments</h1>
      <Suspense fallback={<TournamentSkeleton />}>
        <TournamentList />
      </Suspense>
    </div>
  );
}