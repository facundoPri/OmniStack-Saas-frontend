import React, { useEffect, useCallback, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import ProjectsActions from '~/store/ducks/projects';
import MembersActions from '~/store/ducks/members';

import Can from '~/components/Can';
import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';
import Members from '~/components/Members';

import { Container, Project } from './styles';

const Projects = () => {
  const activeTeam = useSelector(state => state.teams.active);
  const projects = useSelector(state => state.projects);
  const members = useSelector(state => state.members);

  const dispatch = useDispatch();

  const [newProject, setNewProject] = useState('');

  useEffect(() => {
    if (activeTeam) {
      dispatch(ProjectsActions.getProjectsRequest());
    }
  }, [activeTeam, dispatch]);

  const handleCreateProject = useCallback(
    e => {
      e.preventDefault();
      dispatch(ProjectsActions.createProjectRequest(newProject));
      setNewProject('');
    },
    [dispatch, newProject]
  );

  if (!activeTeam) return null;
  return (
    <Container>
      <header>
        <h1>{activeTeam.name}</h1>
        <div>
          <Can checkPermission="projects_create">
            <Button
              onClick={() => dispatch(ProjectsActions.openProjectModal())}
            >
              + Novo
            </Button>
          </Can>
          <Button onClick={() => dispatch(MembersActions.openMembersModal())}>
            Membros
          </Button>
        </div>
      </header>
      {projects.data.map(project => (
        <Project key={project.id}>
          <p>{project.title}</p>
        </Project>
      ))}

      {projects.projectModalOpen && (
        <Modal>
          <h1>Criar projeto</h1>
          <form onSubmit={handleCreateProject}>
            <span>NOME</span>
            <input
              name="newProject"
              value={newProject}
              onChange={e => setNewProject(e.target.value)}
            />

            <Button size="big" type="Submit ">
              Salvar
            </Button>
            <Button
              onClick={() => dispatch(ProjectsActions.closeProjectModal())}
              size="small"
              color="gray"
            >
              Cancelar
            </Button>
          </form>
        </Modal>
      )}
      {members.membersModalOpen && <Members />}
    </Container>
  );
};

export default Projects;
