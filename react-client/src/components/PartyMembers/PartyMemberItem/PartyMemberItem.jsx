import React from 'react';
import './PartyMemberItem.css';
import { Draggable } from 'react-beautiful-dnd';

const PartyMemberItem = props => {
  let { character, currentEncounter, addActorToEncounter } = props;
  let inEncounter = false;
  let activeCharacter = null;
  for (let i = 0; i < currentEncounter.length; i++) {
    if (currentEncounter[i].name === character.name) {
      inEncounter = true;
      activeCharacter = currentEncounter[i];
      break;
    }
  }
  return (
    <div
      className={
        'party-member-item-wrapper ' + (character.npc ? 'character-npc' : '')
      }
    >
      <span className="party-member-add">
        <img
          width="25"
          height="25"
          src="https://s3.amazonaws.com/the-initiative-project/left-arrow.svg"
          onClick={() => {
            if (!inEncounter) {
              addActorToEncounter(character);
              inEncounter = true;
            }
          }}
        />
      </span>
      <span className="party-member-name">{character.name}</span>
      <span className="party-member-description-wrapper">
        {inEncounter && (
          <span className="party-member-description-hit-point">
            <img
              width="20"
              height="20"
              src="https://s3.amazonaws.com/the-initiative-project/little-health.svg"
            />
            : {activeCharacter.currentHP} / {character.maxHP}
          </span>
        )}
        {!inEncounter && (
          <span className="party-member-description-hit-point">
            <img
              width="20"
              height="20"
              src="https://s3.amazonaws.com/the-initiative-project/little-health.svg"
            />
            : {character.maxHP} / {character.maxHP}
          </span>
        )}
        {character.armorClass && (
          <span className="party-member-description-armour">
            <img
              width="20"
              height="20"
              src="https://s3.amazonaws.com/the-initiative-project/dark-shield.svg"
            />
            : {character.armorClass}
          </span>
        )}
      </span>
    </div>
  );
};

export default PartyMemberItem;
