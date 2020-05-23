import React, { useEffect, useCallback, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import ProjectsActions from '~/store/ducks/projects';

import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';

import { Container, Project } from './styles';

const Projects = () => {
  const activeTeam = useSelector(state => state.teams.active);
  const projects = useSelector(state => state.projects);
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
          <Button onClick={() => dispatch(ProjectsActions.openProjectModal())}>
            + Novo
          </Button>
          <Button onClick={() => {}}>Membros</Button>
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
    </Container>
  );
};

export default Projects;
