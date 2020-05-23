import React from 'react';

import { useDispatch } from 'react-redux';
import MembersActions from '~/store/ducks/members';

import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';
import { MembersList } from './styles';

const Members = () => {
  const dispatch = useDispatch();
  return (
    <Modal size="big">
      <h1>Membros</h1>

      <form>
        <MembersList>
          <li>
            <strong>Diego Fernandes</strong>
          </li>
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
};

export default Members;
