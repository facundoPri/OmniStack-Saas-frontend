import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import api from '~/services/api';

import MembersActions from '~/store/ducks/members';

import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';
import { MembersList } from './styles';

export default function Members() {
  const dispatch = useDispatch();
  const members = useSelector(state => state.members);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    dispatch(MembersActions.getMembersRequest());
    const loadRoles = async () => {
      const response = await api.get('roles');

      setRoles(response.data);
    };
    loadRoles();
  }, [dispatch]);

  const handleRolesChange = useCallback(
    (id, roles) => {
      dispatch(MembersActions.updateMemberRequest(id, roles));
    },
    [dispatch]
  );

  return (
    <Modal size="big">
      <h1>Membros</h1>

      <form>
        <MembersList>
          {members.data.map(member => (
            <li key={member.id}>
              <strong>{member.user.name}</strong>
              <Select
                isMulti
                value={member.roles}
                options={roles}
                placeholder="Selecione uma permissão"
                getOptionLabel={role => role.name}
                getOptionValue={role => role.id}
                onChange={value => handleRolesChange(member.id, value)}
              />
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
