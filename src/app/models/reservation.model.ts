export type ReservationType = 'duo' | 'cuarteto' | 'grupal';

export interface Reservation {
  name: string;
  people: number;
  celebration: string;
  type: ReservationType;
  color: string;
  waitTime: number;
  diceRolls: number;
}

export interface ReservationTypeData {
  color: string;
  name: string;
  waitTime: number;
  icon: string;
}

export const RESERVATION_TYPES: Record<ReservationType, ReservationTypeData> = {
  duo: { color: '#3B82F6', name: 'Mesa Dúo', waitTime: 2, icon: '💙' },
  cuarteto: { color: '#8B5CF6', name: 'Mesa Cuarteto', waitTime: 25, icon: '💜' },
  grupal: { color: '#EC4899', name: 'Mesa Grupal', waitTime: 35, icon: '💗' }
};
