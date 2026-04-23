import { useState, useEffect } from 'react';
import { db, ref, onValue, set, update } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { ScheduleDay, ScheduleTask } from '../types';

const DEFAULT_SCHEDULE: ScheduleDay[] = [
  { id: 'today', label: 'Hoje', active: true, tasks: [] },
  { id: 'tomorrow', label: 'Amanhã', active: false, tasks: [] },
  { id: 'later', label: 'Em Breve', active: false, tasks: [] }
];

export const useSchedule = () => {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState<ScheduleDay[]>(DEFAULT_SCHEDULE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const scheduleRef = ref(db, `users/${user.uid}/schedule`);
    const unsubscribe = onValue(scheduleRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object-based Firebase structure back to array if needed, 
        // or just use array if stored as array. Firebase stores arrays as objects with numeric keys.
        const loadedSchedule = Array.isArray(data) ? data : Object.values(data);
        setSchedule(loadedSchedule as ScheduleDay[]);
      } else {
        // Migration: Initialize cloud with default schedule
        set(scheduleRef, DEFAULT_SCHEDULE);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addTask = (dayId: string, text: string) => {
    const newSchedule = schedule.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          tasks: [...(day.tasks || []), { text, completed: false }]
        };
      }
      return day;
    });
    setSchedule(newSchedule);
    if (user) {
      set(ref(db, `users/${user.uid}/schedule`), newSchedule);
    }
  };

  const removeTask = (dayId: string, taskIndex: number) => {
    const newSchedule = schedule.map(day => {
      if (day.id === dayId) {
        const newTasks = [...(day.tasks || [])];
        newTasks.splice(taskIndex, 1);
        return { ...day, tasks: newTasks };
      }
      return day;
    });
    setSchedule(newSchedule);
    if (user) {
      set(ref(db, `users/${user.uid}/schedule`), newSchedule);
    }
  };

  const toggleTask = (dayId: string, taskIndex: number) => {
    const newSchedule = schedule.map(day => {
      if (day.id === dayId) {
        const newTasks = (day.tasks || []).map((task, i) => 
          i === taskIndex ? { ...task, completed: !task.completed } : task
        );
        return { ...day, tasks: newTasks };
      }
      return day;
    });
    setSchedule(newSchedule);
    if (user) {
      set(ref(db, `users/${user.uid}/schedule`), newSchedule);
    }
  };

  const addDay = (label: string) => {
    const newDay: ScheduleDay = {
       id: 'day_' + Date.now(),
       label,
       active: false,
       tasks: []
    };
    const newSchedule = [...schedule, newDay];
    setSchedule(newSchedule);
    if (user) {
      set(ref(db, `users/${user.uid}/schedule`), newSchedule);
    }
  };

  return {
    schedule,
    loading,
    addTask,
    removeTask,
    toggleTask,
    addDay
  };
};
