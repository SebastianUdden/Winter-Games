import { Player } from './player';

export class Team {
  constructor(
    public number = 0,
    public name = '',
    public color = '',
    public teamMembers: Player[] = [],
    public score = 0,
    public kills = 0,
    public teamKills = 0,
    public deaths = 0,
    public addMembers = function(players: [any]) {
      for (let i = 0; i < players.length; i++) {
        this.teamMembers.add(players[i]);
      }
    }) {}
}
