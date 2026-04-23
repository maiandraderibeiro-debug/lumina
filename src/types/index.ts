export type Screen = 'splash' | 'login' | 'register' | 'dashboard' | 'recommendations' | 'profile' | 'store' | 'history' | 'settings' | 'charSelect' | 'room';

export interface UserData {
  username: string;
  contact: string;
  password?: string;
  avatar?: string;
  banner?: string;
  level?: number;
  points?: number;
}

export interface ScheduleTask {
  text: string;
  completed: boolean;
}

export interface ScheduleDay {
  id: string;
  label: string;
  tasks: ScheduleTask[];
  active: boolean;
}
