'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { TournamentService } from '@/lib/services/tournament.service';
import type { Tournament } from '@/types';

interface TournamentCardProps {
  tournament: Tournament;
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleJoinTournament = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    try {
      setIsJoining(true);
      await TournamentService.joinTournament(tournament.id, user.id);
      toast.success('Successfully joined tournament!');
      router.refresh();
    } catch (error) {
      console.error('Error joining tournament:', error);
      toast.error('Failed to join tournament. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  const isFull = tournament.current_players >= tournament.max_players;
  const startTime = new Date(tournament.start_time).toLocaleString();

  return (
    <Card>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold">{tournament.title}</h3>
        <div className="mb-4 space-y-2 text-sm text-gray-600">
          <p>Game: {tournament.game_type}</p>
          <p>Entry Fee: ₹{tournament.entry_fee}</p>
          <p>Prize Pool: ₹{tournament.prize_pool}</p>
          <p>Players: {tournament.current_players}/{tournament.max_players}</p>
          <p>Starts: {startTime}</p>
        </div>
        <Button
          onClick={handleJoinTournament}
          disabled={isJoining || isFull || tournament.status !== 'upcoming'}
          className="w-full"
        >
          {isJoining ? 'Joining...' : isFull ? 'Tournament Full' : 'Join Tournament'}
        </Button>
      </div>
    </Card>
  );
}