import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import api from '~/services/api';

import MembersActions from '~/store/ducks/members';

import Can from '~/components/Can';
import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';
import { MembersList, Invite } from './styles';

export default function Members() {
  const dispatch = useDispatch();
  const members = useSelector(state => state.members);
  const [roles, setRoles] = useState([]);
  const [invite, setInvite] = useState('');

  useEffect(() => {
    dispatch(MembersActions.getMembersRequest());
    const loadRoles = async () => {
      const response = await api.get('roles');

      setRoles(response.data);
    };
    loadRoles();
  }, [dispatch]);

  const handleInvite = useCallback(
    e => {
      e.preventDefault();
      dispatch(MembersActions.inviteMemberRequest(invite));
    },
    [dispatch, invite]
  );

  return (
    <Modal size="big">
      <h1>Membros</h1>

      <Can checkPermission="invites_create">
        <Invite onSubmit={handleInvite}>
          <input
            name="invite"
            placeholder="Convidar para o time"
            value={invite}
            onChange={e => setInvite(e.target.value)}
          />
          <Button type="submit">Enviar</Button>
        </Invite>
      </Can>

      <form>
        <MembersList>
          {members.data.map(member => (
            <li key={member.id}>
              <strong>{member.user.name}</strong>
              <Can checkRole="administrador">
                {can => (
                  <Select
                    isMulti
                    isDisabled={!can}
                    value={member.roles}
                    options={roles}
                    placeholder="Selecione uma permissão"
                    getOptionLabel={role => role.name}
                    getOptionValue={role => role.id}
                    onChange={value =>
                      dispatch(
                        MembersActions.updateMemberRequest(member.id, value)
                      )
                    }
                  />
                )}
              </Can>
            </li>
          ))}
        </MembersList>

        <Button
          onClick={() => dispatch(MembersActions.closeMembersModal())}
          filled={false}
          color="gray"
        >
          Cancelar
        </Button>
      </form>
    </Modal>
  );
}
