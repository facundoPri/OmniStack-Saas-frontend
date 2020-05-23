/* eslint-disable import/no-named-as-default-member */
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TeamsActions from '~/store/ducks/teams';

import Button from '~/styles/components/Button';
import Modal from '~/components/Modal';

import { Container, TeamList, Team, NewTeam } from './styles';

export default function TeamSwitcher() {
  const dispatch = useDispatch();
  const teams = useSelector(state => state.teams);

  useEffect(() => {
    dispatch(TeamsActions.getTeamsRequest());
  }, [dispatch]);

  const handleTeamSelect = useCallback(
    team => {
      dispatch(TeamsActions.selectTeam(team));
    },
    [dispatch]
  );

  return (
    <Container>
      <TeamList>
        {teams.data.map(team => (
          <Team key={team.id} onClick={() => handleTeamSelect(team)}>
            <img
              src={`https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${team.name}`}
              alt={team.name}
            />
          </Team>
        ))}
        <NewTeam onClick={() => dispatch(TeamsActions.openTeamModal())}>
          NOVO
        </NewTeam>
        {teams.teamModalOpen && (
          <Modal>
            <h1>Criar time</h1>
            <form onSubmit={() => {}}>
              <span>NOME</span>
              <input name="newTeam" />

              <Button size="big" type="submit">
                Salvar
              </Button>
              <Button
                onClick={() => dispatch(TeamsActions.closeTeamModal())}
                size="small"
                color="gray"
              >
                Cancelar
              </Button>
            </form>
          </Modal>
        )}
      </TeamList>
    </Container>
  );
}
