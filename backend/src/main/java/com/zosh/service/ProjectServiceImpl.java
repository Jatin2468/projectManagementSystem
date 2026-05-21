package com.zosh.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zosh.exception.ProjectException;
import com.zosh.exception.UserException;
import com.zosh.model.Project;
import com.zosh.model.User;
import com.zosh.repository.ProjectRepository;
import com.zosh.repository.UserRepository;

@Service
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private UserRepository userRepository;

	// ✅ CREATE PROJECT (UNLIMITED PROJECTS)
	@Override
	public Project createProject(Project project, Long userId) throws UserException {

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserException("User not found"));

		project.setOwner(user);

		if (project.getTeam() == null) {
			project.setTeam(new ArrayList<>());
		}

		// ✅ avoid duplicate user
		if (!project.getTeam().contains(user)) {
			project.getTeam().add(user);
		}

		return projectRepository.save(project);
	}

	// ✅ FILTER PROJECTS
	@Override
	public List<Project> getProjectsByTeam(User user, String category, String tag) throws ProjectException {

		List<Project> projects = projectRepository.findByTeamContainingOrOwner(user, user);

		if (category != null && !category.equals("all")) {
			projects = projects.stream()
					.filter(p -> p.getCategory() != null &&
							p.getCategory().equalsIgnoreCase(category))
					.collect(Collectors.toList());
		}

		if (tag != null && !tag.equals("all")) {
			projects = projects.stream()
					.filter(p -> p.getTags() != null &&
							p.getTags().contains(tag))
					.collect(Collectors.toList());
		}

		return projects;
	}

	// ✅ GET BY ID
	@Override
	public Project getProjectById(Long projectId) throws ProjectException {
		return projectRepository.findById(projectId)
				.orElseThrow(() -> new ProjectException("Project not found"));
	}

	// ✅ DELETE
	@Override
	public String deleteProject(Long projectId, Long userId) throws UserException {
		projectRepository.deleteById(projectId);
		return "Project deleted successfully";
	}

	// ✅ UPDATE
	@Override
	public Project updateProject(Project updatedProject, Long id) throws ProjectException {
		Project existing = projectRepository.findById(id)
				.orElseThrow(() -> new ProjectException("Project not found"));

		existing.setName(updatedProject.getName());
		existing.setDescription(updatedProject.getDescription());
		existing.setCategory(updatedProject.getCategory());
		existing.setTags(updatedProject.getTags());

		return projectRepository.save(existing);
	}

	// ✅ SEARCH
	@Override
	public List<Project> searchProjects(String keyword, User user) throws ProjectException {
		return projectRepository.findByNameContainingAndTeamContaining(keyword, user);
	}

	// ✅ ADD USER
	@Override
	public void addUserToProject(Long projectId, Long userId) throws UserException, ProjectException {

		Project project = projectRepository.findById(projectId)
				.orElseThrow(() -> new ProjectException("Project not found"));

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserException("User not found"));

		if (!project.getTeam().contains(user)) {
			project.getTeam().add(user);
		}

		projectRepository.save(project);
	}

	// ✅ REMOVE USER
	@Override
	public void removeUserFromProject(Long projectId, Long userId) throws UserException, ProjectException {

		Project project = projectRepository.findById(projectId)
				.orElseThrow(() -> new ProjectException("Project not found"));

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserException("User not found"));

		project.getTeam().remove(user);
		projectRepository.save(project);
	}

	// ✅ CHAT (still empty)
	@Override
	public com.zosh.model.Chat getChatByProjectId(Long projectId) throws ProjectException {
		return null;
	}
}