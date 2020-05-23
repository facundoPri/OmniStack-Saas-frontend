import React from 'react';

import TeamSwitcher from '~/components/TeamSwitcher';
import Projects from '~/components/Projects';
import { Container } from './styles';

function Main() {
  return (
    <Container>
      <TeamSwitcher />
      <Projects />
    </Container>
  );
}

export default Main;
