'use client';

import { useTournaments } from '@/hooks/use-tournaments';
import { TournamentCard } from './tournament-card';
import { Spinner } from '@/components/ui/spinner';

export function TournamentList() {
  const { tournaments, loading } = useTournaments();

  if (loading) {
    return <Spinner />;
  }

  if (tournaments.length === 0) {
    return (
      <div className="text-center">
        <p className="text-gray-500">No tournaments available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tournaments.map((tournament) => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
}