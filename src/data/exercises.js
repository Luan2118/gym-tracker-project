import benchpress from '../assets/exercises/benchpress.png'
import bicepcurls from '../assets/exercises/bicepcurls.png'
import hammercurls from '../assets/exercises/hammercurls.png'
import inclinebenchpress from '../assets/exercises/inclinebenchpress.png'
import legpress from '../assets/exercises/legpress.png'
import pulldown from '../assets/exercises/pulldown.png'
import pullup from '../assets/exercises/pullup.png'
import skullcrushers from '../assets/exercises/skullcrushers.png'
import squat from '../assets/exercises/squat.png'
import triceppushdowns from '../assets/exercises/triceppushdowns.png'

export const exercises = [
  {
    id: 'bicep-curls',
    name: 'Bicep Curls',
    video: 'video_1',
    icon: bicepcurls,
    muscleGroup: 'biceps',
    bodyRegion: 'upper',
  },
  {
    id: 'hammer-curls',
    name: 'Hammer Curls',
    video: 'video_2',
    icon: hammercurls,
    muscleGroup: 'biceps',
    bodyRegion: 'upper',
  },
  {
    id: 'tricep-pushdowns',
    name: 'Tricep Pushdowns',
    video: 'video_3',
    icon: triceppushdowns,
    muscleGroup: 'triceps',
    bodyRegion: 'upper',
  },
  {
    id: 'skull-crushers',
    name: 'Skull Crushers',
    video: 'video_4',
    icon: skullcrushers,
    muscleGroup: 'triceps',
    bodyRegion: 'upper',
  },
  {
    id: 'bench-press',
    name: 'Bench Press',
    video: 'video_5',
    icon: benchpress,
    muscleGroup: 'chest',
    bodyRegion: 'upper',
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    video: 'video_6',
    icon: inclinebenchpress,
    muscleGroup: 'chest',
    bodyRegion: 'upper',
  },
  {
    id: 'pull-ups',
    name: 'Pull Ups',
    video: 'video_7',
    icon: pullup,
    muscleGroup: 'back',
    bodyRegion: 'upper',
  },
  {
    id: 'lat-pull-down',
    name: 'Lat Pull down',
    video: 'video_8',
    icon: pulldown,
    muscleGroup: 'back',
    bodyRegion: 'upper',
  },
  {
    id: 'squat',
    name: 'Squat',
    video: 'video_9',
    icon: squat,
    muscleGroup: 'quads',
    bodyRegion: 'lower',
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    video: 'video_10',
    icon: legpress,
    muscleGroup: 'quads',
    bodyRegion: 'lower',
  },
]