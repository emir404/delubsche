import * as migration_20260715_093912_initial from './20260715_093912_initial';

export const migrations = [
  {
    up: migration_20260715_093912_initial.up,
    down: migration_20260715_093912_initial.down,
    name: '20260715_093912_initial'
  },
];
